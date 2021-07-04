const express = require('express');
const port = 4000;
const app = express();

app.listen(port,function(err){
    if(err){
        console.log("Error aagaya bhai ",err);
        // console.log(`interpolation vala error dekh bro: ${err}`);
    }
    else{
        console.log(`Server is running on port: ${port}`);
    }
})
