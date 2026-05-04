// ESM
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'my_app',
  password: '12345678',
});
//insert new data
let q = "INSERT INTO user (id ,username,email,password) VALUES ?";
// let user = ["123", "123@newuser", "abc@gamil.com", "abc"];


let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),

  ];
}
//inser 100 data at a time using loop where i can enter my new data and for this i used faker 
let data = [];
for (let i = 0; i <= 100; i++) {
  data.push(getRandomUser());
}
//home route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = (result[0]["count(*)"])
      res.render("home.ejs", { count });
    })
  } catch (err) {
    console.log(err);
    res.send("error in db");
  }
})
// show route
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;

  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("error in db");
    }

    console.log(result);
    res.send(result);
  });
});




//  server should be OUTSIDE all routes
app.listen(8080, () => {
  console.log("server is on port 8080");
});