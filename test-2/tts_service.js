import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import { SpeechSynthesizer } from "alibabacloud-nls";
import Core from "@alicloud/pop-core";
import { encode } from "silk-wasm";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the current directory
dotenv.config({ path: path.join(__dirname, ".env") });

// Set ffmpeg path
if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

// Configuration
const REGION = process.env.ALI_REGION || "cn-shanghai";
const CONFIG = {
  akId: process.env.ALI_AK_ID,
  akSecret: process.env.ALI_AK_SECRET,
  appKey: process.env.ALI_APP_KEY,
  endpoint: `https://nls-meta.${REGION}.aliyuncs.com`,
  apiVersion: "2019-02-28",
  // TTS Config
  url: `wss://nls-gateway.${REGION}.aliyuncs.com/ws/v1`,
  voice: "xiaoyun", // default voice
  format: "wav",
  sampleRate: 16000,
};

// Cache token
let cachedToken = null;
let tokenExpire = 0;

/**
 * Get NLS Token
 */
async function getToken() {
  const now = Date.now() / 1000;
  if (cachedToken && now < tokenExpire - 60) {
    return cachedToken;
  }

  if (!CONFIG.akId || !CONFIG.akSecret) {
    throw new Error("Missing ALI_AK_ID or ALI_AK_SECRET in .env");
  }

  const client = new Core({
    accessKeyId: CONFIG.akId,
    accessKeySecret: CONFIG.akSecret,
    endpoint: CONFIG.endpoint,
    apiVersion: CONFIG.apiVersion,
  });

  const params = {
    RegionId: "cn-shanghai",
  };

  try {
    const result = await client.request("CreateToken", params);
    if (result.Token && result.Token.Id) {
      cachedToken = result.Token.Id;
      tokenExpire = result.Token.ExpireTime;
      console.log(
        "[TTS] Token refreshed, expires at:",
        new Date(tokenExpire * 1000).toLocaleString(),
      );
      return cachedToken;
    } else {
      throw new Error("Invalid token response");
    }
  } catch (err) {
    console.error("[TTS] Token generation failed:", err);
    throw err;
  }
}

/**
 * Text to WAV using Alibaba Cloud NLS
 */
async function textToWav(text, outputPath) {
  const token = await getToken();

  return new Promise((resolve, reject) => {
    const dumpFile = fs.createWriteStream(outputPath, { flags: "w" });
    const synthesizer = new SpeechSynthesizer({
      url: CONFIG.url,
      appkey: CONFIG.appKey,
      token: token,
    });

    synthesizer.on("meta", (msg) => {
      // console.log('Client recv meta:', msg);
    });

    synthesizer.on("data", (msg) => {
      dumpFile.write(msg, "binary");
    });

    synthesizer.on("completed", (msg) => {
      // console.log('Client recv completed:', msg);
      dumpFile.end();
      resolve();
    });

    synthesizer.on("closed", () => {
      // console.log('Client recv closed');
    });

    synthesizer.on("failed", (msg) => {
      console.error("[TTS] Client recv failed:", JSON.stringify(msg));
      dumpFile.end();
      // Create a structured error object
      const error = new Error(
        `TTS Failed: ${msg.status_text || "Unknown Error"}`,
      );
      error.details = msg;
      reject(error);
    });

    const param = {
      speech_rate: 0,
      format: CONFIG.format,
      sample_rate: CONFIG.sampleRate,
      voice: CONFIG.voice,
      volume: 50,
      text: text,
    };

    synthesizer.start(param, true, 2000);
  });
}

/**
 * WAV to PCM
 */
async function wavToPcm(wavPath, pcmPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(wavPath)
      .audioCodec("pcm_s16le")
      .audioFrequency(CONFIG.sampleRate)
      .audioChannels(1)
      .format("s16le")
      .save(pcmPath)
      .on("end", resolve)
      .on("error", reject);
  });
}

/**
 * PCM to Silk
 */
async function pcmToSilk(pcmPath, silkPath) {
  const pcmData = await fs.readFile(pcmPath);
  const silkResult = await encode(pcmData, CONFIG.sampleRate);
  await fs.writeFile(silkPath, silkResult.data);
}

/**
 * Main: Text -> Silk Path
 */
export async function textToQQSilk(text) {
  if (!text) return null;

  const tempDir = path.join(__dirname, "temp_audio");
  await fs.ensureDir(tempDir);

  const timestamp = Date.now();
  const wavPath = path.join(tempDir, `${timestamp}.wav`);
  const pcmPath = path.join(tempDir, `${timestamp}.pcm`);
  const silkPath = path.join(tempDir, `${timestamp}.silk`);

  try {
    console.log(`[TTS] Synthesizing: "${text.substring(0, 20)}..."`);
    await textToWav(text, wavPath);
    await wavToPcm(wavPath, pcmPath);
    await pcmToSilk(pcmPath, silkPath);

    // Cleanup intermediate files
    await fs.remove(wavPath);
    await fs.remove(pcmPath);

    return silkPath;
  } catch (err) {
    console.error("[TTS] Error:", err);
    return null; // Return null on failure to allow fallback or error handling
  }
}
