const AuthController = require("./controllers/auth")
const CatalogController = require("./controllers/catalog")
const SoundController = require("./controllers/sound")
require("./services/passport")
const passport = require("passport")
const requireToken = passport.authenticate("jwt", { session: false})
const requireValidCredentials = passport.authenticate("local", { session: false })

module.exports = (expressServer) => {
    expressServer.post("/signup", AuthController.signup)
    expressServer.get("/ressourceSecrete",  function(req, res) {
        res.send({ test: 666 })
    })
    expressServer.get("/ressourceSecret/:id", (req,res,next) => {
        res.send('result :' + req.params.id)
    })
    expressServer.post("/signin", requireValidCredentials, AuthController.signin )
    expressServer.get("/accounts", AuthController.accounts)
   
    expressServer.get('/account/:id', (req, res) => {
        res.send({ result: 'result' + req.params.id})
      });
    expressServer.get("/users", AuthController.users)
    expressServer.post("/sound", CatalogController.create )
    expressServer.get("/sounds/:id", CatalogController.readAll)
    expressServer.get("/sound/:id", CatalogController.read)
    expressServer.put("/sound/:id", CatalogController.update)
    expressServer.delete("/sound/:id", CatalogController.delete)
    expressServer.post("/sound-upload", SoundController.create)
}