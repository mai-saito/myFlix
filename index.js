const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

let Movies = [{
  title : 'Kingsman: The Secret Service',
  genre : 'Action',
  name : 'Matthew Vaughn'
},
{
  title : 'The Greatest Showman',
  genre : 'Musical',
  name : 'Michael Gracey'
},
{
  title : 'Night at the Museum',
  genre : 'Action Comedy',
  name : 'Shawn Levy'
},
{
  title : 'Now You See Me',
  genre : 'Action',
  name : 'Louis Leterrier'
},
{
  title : 'Harry Potter and the Sorcerer\'s Stone',
  genre : 'Fantasy',
  name : 'Chris Columbus'
},
{
  title : 'Baby Driver',
  genre : 'Action',
  name : 'Edgar Wright'
},
{
  title : 'Hairspray',
  genre : 'Musical',
  name : 'Adam Shankman'
},
{
  title : 'The Hitman\'s Bodyguard',
  genre : 'Action Comedy',
  name : 'Patrick Hughes'
},
{
  title : 'The Lord of the Rings: The Fellowship of the Ring',
  genre : 'Fantasy',
  name : 'Peter Jackson'
},
{
  title : 'The Hobbit: An Unexpected Journey',
  genre : 'Fantasy',
  name : 'Peter Jackson'
}]

// GET requests
app.get('/movies', function(req, res){
  res.json(Movies);
});

app.get('/', function(req, res){
  res.send('Welcome to myFlix!')
});

// Get a list of ALL movies
app.get('/movies', (req, res) => {
  res.json(Movies);
  res.send('Successful GET request returning a list of all movies')
});

// Get data about a single movie by title
app.get('/movies/:title', (req, res) => {
  res.json(Movies.find((movie) =>
  { return movie.title === req.params.title}));
  res.send('Successful GET request returning data about a single movie')
});

// Get data about a genre by name/title
app.get('/movies/genres/:genre', (req, res) => {
  res.json(Movies.find((movie) =>
  { return movie.genre === req.params.genre}));
  const message = 'Successful GET request returning data about a genre'
  res.status(201).send(message);
});

// Get data about a director by name
app.get('/movies/directors/:name', (res, req) => {
  res.json(Movies.find((movie) =>
  { return movie.name === req.params.name}));
  res.status(201).send('Successful GET request returning data about a director')
});

// Add new users
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name){
    res.status(400).send('Missing name in request body');
  }else{
    newUser.id = uuid.v4();
    res.status(201).send('Successful POST request adding a new user')
  }
});

// Update user info
app.put('/users/info', (req,res) => {
  res.status(201).send('Successful PUT request updating user info');
});

// Add a movie to their list of favorites
app.post('/users/favorite', (req, res) => {
  let newFavoriteMovie = req.body;

  if(!newFavoriteMovie){
    res.status(400).send('Missing title in request body');
  }else{
    newFavoriteMovie.id = uuid.v4();
    res.status(201).send('Successful POST request adding a movie to the list of favorites');
  }
});

// Remove a movie from their list of favorites
app.delete('/users/favorite', (req, res) => {
  res.status(201).send('Successful DELETE request removing a movie from the list of favorites');
});

// Remove existing users
app.delete('/users', (req, res) => {
  res.status(201).send('Successful DELETE request removing a user');
});

// error handling
app.use(function (err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
