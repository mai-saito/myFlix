const express = require('express');
const morgan = require('morgan');
const app = express();

let topMovies = [{
  title : 'Kingsman: The Secret Service'
},
{
  title : 'The Greatest Showman'
},
{
  title : 'Night at the Museum'
},
{
  title : 'Now You See Me'
},
{
  title : 'Harry Potter and the Sorcerer\'s Stone'
},
{
  title : 'Baby Driver'
},
{
  title : 'Hairspray'
},
{
  title : 'The Hitman\'s Bodyguard'
},
{
  title : 'The Lord of the Rings: The Fellowship of the Ring'
},
{
  title : 'The Hobbit: An Unexpected Journey'
}]

// GET requests

app.use(morgan('common'));

app.get('/movies', function(req, res){
  res.json(topMovies)
});

app.get('/', function(req, res){
  res.send('Welcome to myFlix!')
});

app.use(express.static('public'));

// error handling

app.use(function (err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

// listen for requests

app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
