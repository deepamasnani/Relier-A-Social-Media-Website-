const express = require('express');
const router = require('./routes');
const homeController = require("./controllers/home_controller");
const port = 4000;
const app = express();

// use express router
app.use('/',require('./routes'));
router.get('/',homeController.home);

app.listen(port,function(err){
    if(err){
        console.log("Error aagaya bhai ",err);
        // console.log(`interpolation vala error dekh bro: ${err}`);
    }
    else{
        console.log(`Server is running on port: ${port}`);
    }
})
