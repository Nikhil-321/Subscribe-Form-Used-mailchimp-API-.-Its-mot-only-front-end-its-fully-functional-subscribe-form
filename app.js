const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.Email;

    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }


    }



        ]
    };
    
    
    const JSONdata = JSON.stringify(data);
    const url = " https://us10.api.mailchimp.com/3.0/lists/75f807f5e7";
    const options = {
        method : "POST",
        auth : "nikhil1:fdb66d02151028ba2c7231c0aa9a0319-us10"

    }
   const request =   https.request(url, options, function(response){
        if(response.statusCode === 200){
         res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }

        response.on("data" , function(data){
            
            console.log(JSON.parse(data));
        })
    })
   
   request.write(JSONdata);
    request.end();
    
    
   
    
});


app.post("/failure" , function(req , res){
   
    res.redirect("/");
})







    
   


app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
})




