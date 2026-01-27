// server/error.ts
import { getRequestURL, setHeader } from "h3";
import type { H3Error, H3Event } from "h3";

export default (error: H3Error, event?: H3Event) => {
  // 获取请求上下文（做非空判断，避免极端场景报错）
  // 生成唯一错误追踪ID（前后端日志联动排查）
  const traceId =
    Date.now().toString() + Math.random().toString(36).slice(2, 8);

  // 构建最终错误响应体（可根据业务无限扩展字段）
  const errorRes = {
    httpCode: error.statusCode || 500, // HTTP标准状态码（必配）
    bizCode: (error as any).code || 1000, // 自定义业务错误码（必配，1xxx系统/2xxx业务）
    msg: error.statusMessage || "服务端内部错误", // 用户友好提示（必配）
    detail: process.env.NODE_ENV === "development" ? error.message : undefined, // 详细错误（仅开发环境返回，防敏感信息泄露）
    traceId, // 错误追踪ID（推荐，方便日志排查）
    path: event ? getRequestURL(event).pathname : "/", // 出错接口路径（推荐）
    method: event?.method || "UNKNOWN", // 请求方法（推荐）
    timestamp: Date.now(), // 错误时间戳（推荐，前端可格式化）
  };

  // 1. 服务端标准化日志打印（生产环境排查必备，日志可对接ELK等系统）
  console.error(
    `[${new Date().toISOString()}] [ERROR] [TRACE:${traceId}]`,
    `[${errorRes.method}] ${errorRes.path}`,
    `HTTP:${errorRes.httpCode} | BIZ:${errorRes.bizCode}`,
    `MSG:${errorRes.msg} | DETAIL:${error.message || "无详细信息"}`,
  );

  // 2. 设置自定义响应头（方便前端/网关快速识别错误，可选）
  if (event) {
    setHeader(event, "X-Trace-Id", traceId); // 响应头携带追踪ID
    setHeader(event, "X-Biz-Code", errorRes.bizCode.toString()); // 响应头携带业务错误码
    setHeader(event, "X-Error-Msg", encodeURIComponent(errorRes.msg)); // 响应头携带错误提示（转码防乱码）
  }

  // 3. 可选扩展：生产环境异常上报（Sentry/监控平台，需提前集成依赖）
  // if (process.env.NODE_ENV === 'production' && event) {
  //   Sentry.captureException(error, { tags: { traceId, path: errorRes.path } });
  // }

  // 返回最终格式化的错误响应
  return errorRes;
};
