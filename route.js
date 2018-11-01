const AuthController = require("./controllers/auth")
module.exports = (expressServer) => {
    expressServer.post("/signup", AuthController)
}