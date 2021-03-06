const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;
// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},function(email,password,done){
//  find a user and estabilish the identity
User.findOne({email: email},function(err,user){
    if(err){
        console.log("Error in finding user");
        return done(err);
    }
    if(!user || user.password != password){
        console.log("Invalid pass ");
        return done(null, false);
    }
    
    return done(null,user);
});
}));

// Serializing rhe user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// deserializing the user from the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Invalid");
            return done(err);
        }
        return done(null,user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in pass on the request to the next function
    if(req.isAuthenticated()){
        return next();
    }
    //  if the user is not signed in

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //  req.user contains the current user from the session cookie and we are just sending this to the loacals 
        // for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;