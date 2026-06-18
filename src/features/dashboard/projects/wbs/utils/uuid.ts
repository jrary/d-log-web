export const generateUUID = (): number => {
  const timestamp = new Date().getTime()
  const randomNum = Math.floor(Math.random() * 10000)

  return Number(`${timestamp}${randomNum}`)
}
