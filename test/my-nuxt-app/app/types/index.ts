/**
 * 全局类型定义
 */

// 用户信息类型
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

// API 响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 分页参数类型
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// 分页响应类型
export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 主题类型
export type ThemeMode = "light" | "dark" | "system";

// 语言类型
export type LocaleCode = "zh" | "en";
