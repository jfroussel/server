const AuthController = require("./controllers/auth")
const CatalogController = require("./controllers/catalog")
require("./services/passport")
const passport = require("passport")
const requireToken = passport.authenticate("jwt", { session: false})
const requireValidCredentials = passport.authenticate("local", { session: false })

module.exports = (expressServer) => {
    expressServer.post("/signup", AuthController.signup)
    expressServer.get("/ressourceSecrete", requireToken, function(req, res) {
        res.send({ test: 666 })
    })
    expressServer.post("/signin", requireValidCredentials, AuthController.signin )
    expressServer.get("/accounts", AuthController.accounts)
    expressServer.get("/users", AuthController.users)
    expressServer.post("/catalogCreate", CatalogController.create )
    expressServer.get("/catalog", CatalogController.readAll)
    
}