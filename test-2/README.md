# NapCatQQ 自动回复机器人 (QuickStart 版)

## 🚨 重要说明
由于腾讯官方 QQ 升级了安全校验，**Shell 版 (注入模式)** 可能会报“文件已损坏”。
本项目现在切换为 **QuickStart 版 (快速启动版)**，它自带 QQ 核心，无需安装官方 QQ 即可运行，稳定且不报错。

## 🛠️ 搭建步骤

### 第一步：下载文件
1. 请前往 [NapCatQQ Releases](https://github.com/NapNeko/NapCatQQ/releases) 页面。
2. 下载名称为 **`NapCat.Shell.Windows.Node.zip`** 的压缩包（约 109MB）。
   > **注意**：这个版本内置了运行环境，最稳定。

### 第二步：解压文件
1. 将下载的压缩包解压到当前目录 `d:\nuxt4\test-2\NapCatQQ` 中。
2. 解压后，你应该能看到 `Launcher.bat` 和 `NapCat.exe` 等文件。

### 第三步：启动机器人
1. 双击运行文件夹里的 **`Launcher.bat`** (或者 `launcher.bat`)。
2. 按照提示操作，它会自动检测并启动 QQ。

## ⚙️ 配置自动回复
自动回复的配置文件已经为您准备好了：
- **配置文件**: `NapCatQQ/data/config/autoReply.json`
- **脚本文件**: `NapCatQQ/data/config/autoReply.js`

您可以随时修改 `autoReply.json` 中的关键词和回复内容，修改后**重启 NapCatQQ** 即可生效。

## ❓ 常见问题
- **Q: 启动时提示防火墙？**
  - A: 请允许访问网络。
- **Q: 扫码后无法登录？**
  - A: 尝试关闭窗口重新运行，或者检查网络连接。
