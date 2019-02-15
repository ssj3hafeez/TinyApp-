var express = require("express");
var app = express();
// default port 8080
var PORT = 8080; 
app.set("view engine", "ejs");

const urlDatabase = { 
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"

};

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

// function to create unique short URL of 6 alphanumeric char
function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i = 0; i < 6; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
  }

// app.get("/", (req, res) => {
 // res.send("Hello!");
// });

/* checks for user
function currentUser (req) {
  return req.session.user_id;
}

*/ 

//Home page
app.get("/", (req, res) => {
  res.redirect('/urls');
});
 
// sends user to homepage URL 
app.get("/urls", (req, res) => {
    let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
  });

  /* app.get("/hello", (req, res) => {
    let templateVars = { greeting: 'Hello World!' };
    res.render("hello_world", templateVars);
  }); */

  
  // new page 

  app.get("/urls/new", (req, res) => {
    res.render('urls_new');
  });



//redirect with short URL 
  app.get("/urls/:shortURL", (req, res) => {
    let templateVars = { shortURL: req.params.id };
    res.render("urls_show" ,templateVars);
  });

//create a ID
app.post("/urls", (req, res) => {
 const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect((`/urls/${shortURL}`));
});
    //Delete URL

    app.post("/urls/:shortURL/delete", (req, res) => {
      delete urlDatabase[req.params.shortURL];
      res.redirect("/urls");
    });

   //Listening
  app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}!`); 
  });