var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res){
    console.log(req.query);
    console.log(req.query.search);
    var q = req.query.search;
    request('http://www.omdbapi.com/?s='+q+'&apikey=thewdb', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsed = JSON.parse(body);
            res.render("results", {data: parsed});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("movie app has started"); 
});