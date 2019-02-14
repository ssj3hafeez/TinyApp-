var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

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

app.get("/", (req, res) => {
  res.send("Hello!");
});


app.post("/urls", (req, res) => {
  var shortURL = generateRandomString();
  longURL = req.body.longURL;
  res.redirect("/urls/")
});
         // Respond with 'Ok' (we will replace this
 
// sends user to homepage URL 
app.get("/urls", (req, res) => {
    let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
  });

  /* app.get("/hello", (req, res) => {
    let templateVars = { greeting: 'Hello World!' };
    res.render("hello_world", templateVars);
  }); */

  // second URL route

  app.get("/urls/new", (req, res) => {
    let templateVars = { urls: urlDatabase };
    res.render('urls_new', templateVars);
  });

  app.post("/urls", (req, res) => {
    console.log(req.body.longURL);
    var shortURL = generateRandomString();
    urlDatabase[shortURL] = req.body.longURL;
    console.log(urlDatabase);
    res.redirect("/urls/");
  });
  

//redirect with long URL 
  app.get("/u/:shortURL", (req, res) => {
    let shortURL = req.params.shortURL;
    let longURL = urlDatabase[shortURL];
    let templateVars = { 
      code: shortURL,  
      longcode: longURL,
    };
    res.redirect(templateVars);
  });

  app.get("/urls/:id", (req, res) => {
    res.render("ID");
  });

  app.post("/urls/:shortURL/delete", (req, res) => {
    delete urlDatabase[req.params.shortURL];
    res.redirect("/urls");

  });

  function generateRandomString() {
    var result = Math.random().toString(36).slice(-6);
    return result;
  };

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });