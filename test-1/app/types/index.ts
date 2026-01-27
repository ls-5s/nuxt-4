export interface LoginResponse {
  code: number
  message: string
  data: {
    token: string
  } | null
}
export interface UserInfo {
  code: number
  message: string
  data: {
    token: string
    userInfo: {
      name: string
      password: string
    }
  } | null
}
