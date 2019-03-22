import app from "./config/app"

export const BASE_URL = __dirname

const server = app.listen(7000, () => {
    console.log("Express is running in port 7000")
})

export default server;