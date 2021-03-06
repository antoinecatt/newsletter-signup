const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const options = {
    url: 'https://us7.api.mailchimp.com/3.0/lists/096dccca1a',
    method: 'POST',
    headers: {
      Authorization: 'antoine1 e3555c4593bd5c328d6f8fae35749336-us7'
    }
    // body: jsonData
  };

  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + '/failure.html');
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html');
      } else if (response.statusCode !== 200) {
        res.sendFile(__dirname + '/failure.html');
      }
    }
  });
});

app.post('/failure', (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
