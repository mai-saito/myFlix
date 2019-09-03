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
  director : 'Matthew Vaughn'
},
{
  title : 'The Greatest Showman',
  genre : 'Musical',
  director : 'Michael Gracey'
},
{
  title : 'Night at the Museum',
  genre : 'Action Comedy',
  director : 'Shawn Levy'
},
{
  title : 'Now You See Me',
  genre : 'Action',
  director : 'Louis Leterrier'
},
{
  title : 'Harry Potter and the Sorcerer\'s Stone',
  genre : 'Fantasy',
  director : 'Chris Columbus'
},
{
  title : 'Baby Driver',
  genre : 'Action',
  director : 'Edgar Wright'
},
{
  title : 'Hairspray',
  genre : 'Musical',
  director : 'Adam Shankman'
},
{
  title : 'The Hitman\'s Bodyguard',
  genre : 'Action Comedy',
  director : 'Patrick Hughes'
},
{
  title : 'The Lord of the Rings: The Fellowship of the Ring',
  genre : 'Fantasy',
  director : 'Peter Jackson'
},
{
  title : 'The Hobbit: An Unexpected Journey',
  genre : 'Fantasy',
  director : 'Peter Jackson'
}];

let Users = [
  {
    id: 1,
    username: 'test1',
    name: 'Test Name',
    email: 'test1@example.com'
  },
  {
    id: 2,
    username: 'test2',
    name: 'Test Name2',
    email: 'test2@example.com'
  }
];

let Directors = [
  {
    id: 1,
    name: "Matthew Vaughn",
    birthdate: "March 7, 1971",
    bio: "Matthew Vaughn is an English film producer and director. He is known for producing such films as Lock, Stock and Two Smoking Barrels (1998) and Snatch (2000) "
  },
  {
    id: 2,
    name: "Michael Gracey",
    birthdate: "N/A",
    bio: "Michael Gracey is known for his work on The Greatest Showman (2017), Rocketman (2019) and Naruto."
  },
  {
    id: 3,
    name: "Shawn Levy",
    birthdate: "July 23, 1968",
    bio: "Shawn Levy was born on July 23, 1968 in Montreal, Quebec, Canada. He is a producer and director, known for Stranger Things (2016), Real Steel (2011)"
  }
];

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
  res.json(Movies.filter((movie) =>
  { return movie.genre.toLowerCase().includes(req.params.genre.toLowerCase())}));
});

// Get data about a director by name
app.get('/movies/directors/:name', (req, res) => {
  //const name = req.params.name;
  //const director = Directors.find(director => director.name.toLowerCase() === name.toLowerCase());
  //console.log(name)
  //res.status(200).json(director);
 res.json(Directors.find((movie) =>
 { return movie.name === req.params.name}));
});

// Get all movies by a director
app.get('/directors/:name', (req, res) => {
  const name = req.params.name;
  const director = Directors.find(director => director.name.toLowerCase() === name.toLowerCase());
  const movies = Movies.filter(movie => movie.director.id === director.id);
  console.log(name)
  res.status(200).send(movies);
});

// Add new users
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name){
    res.status(400).send('Missing name in request body');
  }else{
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(201).send(users)
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
