//import the controller folder (automatically calls the index.js file)
var controllers = require('./controllers'); 
var mid = require('./middleware');

var router = function(app) {

    app.get("/home", mid.requiresSecure, controllers.Account.homePage); 
    app.get("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage); 
    app.post("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.login); 
    app.get("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
    app.post("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
    app.get("/logout", mid.requiresLogin, controllers.Account.logout);
    app.get("/maker", mid.requiresLogin, controllers.Pet.makerPage);
    app.post("/maker", mid.requiresLogin, controllers.Pet.make);
    app.post("/remove", mid.requiresLogin, controllers.Pet.remove);
    app.get("/addInfo", mid.requiresSecure, controllers.Pet.addPage);
    app.post("/addInfo", mid.requiresLogin, controllers.Pet.add);
    app.get("/chat", mid.requiresSecure, controllers.Account.chatPage); 
    app.get("/help", mid.requiresSecure, controllers.Account.helpPage); 
    app.get("/contact", mid.requiresSecure, controllers.Account.contactPage); 
    app.get("/", mid.requiresSecure, controllers.Account.homePage);
};

module.exports = router; 
module.exports.contact = function(req,res){
    res.render("contact", {title: "Buddi Contact", page: "contact"})
};