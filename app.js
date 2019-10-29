var http = require('http');
var path = require('path');

const express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ encoded: true }));

app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');




app.get('/', function(req, res) {
    var request = require('request');
    request("https://xkcd.com/info.0.json", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var object = JSON.parse(body);
            res.render("index", { img_url: object.img, title: object.title, year: object.year });
        } else {
            res.render("index", { title: "error cannot find title of the comic", year: "Sorry no year found" });
        }
    });
});

app.get('/homeComic', function(req, res) {
    var random_number = Math.floor(Math.random() * 1129) + 1;
    getComic(random_number, res, "homeComic");
});


app.get('/displayComic', function(req, res) {
    var random_number = Math.floor(Math.random() * 1129) + 1;
    getComic(random_number, res, "displayComic");
});



/**
 * This function is used for getting comic by passing a random number between 1 to 1129
 * @param random_number : a random number from 1 to 1129
 * @param res : the response page
 * @param page : the page that you want to render
 */
function getComic(random_number, res, page){
    var request = require('request');
    request("https://xkcd.com/" + random_number + "/info.0.json", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var object = JSON.parse(body);

            res.render(page, { img_url: object.img, title: object.title, year: object.year });
        } else {
            res.render(page, { img_url: "", title: "Failed to get title", year: "Failed to get year" });
        }
    });
}

http.createServer(app).listen(port, function() {

});

