var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function(){
    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '1345805c7e61d5b4ea82',
        clientSecret: 'd07b6cb5bd66f3ba3516e29a64e26041799d0138',
        callbackUrl: 'http://localhost:3000/auth/github/callback'
    }, function(accessToken, refreshToken, profile, done){
        Usuario.findOrCreate(
            {"login": profile.username},
            {"nome": profile.username},
            function(erro, usuario) {
                if(erro){
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }));

    /* Chamado apenas UMA vez e recebe o usu�rio do nosso
       banco disponibilizado pelo callback da estrat�gia de
       autentica��o. Realizar� a serializa��o apenas do
       ObjectId do usu�rio na sess�o.
    */
    passport.serializeUser(function(usuario, done){
        done(null, usuario._id);
    });

    /* Recebe o ObjectId do usu�rio armazenado na sess�o.
       Chamado a CADA requisi��o.
    */
    passport.deserializeUser(function(id, done){
        Usuario.findById(id).exec()
        .then(function(usuario){
            done(null, usuario);
        });
    });
};