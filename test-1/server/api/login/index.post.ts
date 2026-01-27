export default  defineEventHandler(async (event) => {
  const {name, password} = await readBody(event)

  if(name === 'admin' && password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: '1234567890'
      }
    }
  }
  setResponseStatus(event, 401)
  return {
    code: 401,
    message: '账号或密码错误',
    data: null
  }
})
