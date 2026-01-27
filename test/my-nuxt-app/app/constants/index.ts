/**
 * 应用常量定义
 */

// API 端点
export const API_ENDPOINTS = {
  LOGIN: "/api/user/login",
  LOGOUT: "/api/user/logout",
  USER_INFO: "/api/user/info",
} as const;

// 存储键名
export const STORAGE_KEYS = {
  THEME: "theme",
  TOKEN: "token",
  USER_INFO: "userInfo",
} as const;

// 路由名称
export const ROUTE_NAMES = {
  HOME: "index",
  ABOUT: "about",
  LOGIN: "login",
  DEMO: "demo",
} as const;

// 主题模式
export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;


// 分页配置
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;
