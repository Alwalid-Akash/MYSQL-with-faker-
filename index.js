// ESM
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

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


try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result)
  })
} catch (err) {
  console.log(err);
}
connection.end();


// console.log(getRandomUser());