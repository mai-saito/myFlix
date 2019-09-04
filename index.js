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
  director : {id: 1}
},
{
  title : 'The Greatest Showman',
  genre : 'Musical',
  director : {id: 2}
},
{
  title : 'Night at the Museum',
  genre : 'Action Comedy',
  director : {id: 3}
},
{
  title : 'Now You See Me',
  genre : 'Action',
  director : {id: 4}
},
{
  title : 'Harry Potter and the Sorcerer\'s Stone',
  genre : 'Fantasy',
  director : {id: 5}
},
{
  title : 'Baby Driver',
  genre : 'Action',
  director : {id: 6}
},
{
  title : 'Hairspray',
  genre : 'Musical',
  director : {id: 7}
},
{
  title : 'The Hitman\'s Bodyguard',
  genre : 'Action Comedy',
  director : {id: 8}
},
{
  title : 'The Lord of the Rings: The Fellowship of the Ring',
  genre : 'Fantasy',
  director : {id: 9}
},
{
  title : 'The Hobbit: An Unexpected Journey',
  genre : 'Fantasy',
  director : {id: 9}
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
  },
  {
    id: 4,
    name: "Louis Leterrier",
    birthdate: "June 17, 1973",
    bio: "Louis Leterrier is a French film director whose films include the first two Transporter films, Unleashed, The Incredible Hulk, Clash of the Titans, Now You See Me and The Dark Crystal: Age of Resistance."
  },
  {
    id: 5,
    name: "Chris Columbus",
    birthdate: "September 10, 1958",
    bio: "Chris Joseph Columbus is an American filmmaker. Columbus is known for directing films such as Home Alone (1990); its sequel, Home Alone 2: Lost in New York (1992); Mrs. Doubtfire (1993); Nine Months (1995); Stepmom (1998); Bicentennial Man (1999); Harry Potter and the Sorcerer's Stone (2001); its sequel, Harry Potter and the Chamber of Secrets (2002); Percy Jackson & the Olympians: The Lightning Thief (2010); and Pixels (2015). "
  },
  {
    id: 6,
    name: "Edgar Wright",
    birthdate: "April 18, 1974",
    bio: "Edgar Wright is an English director, screenwriter and producer. He began making independent short films before making his first feature film A Fistful of Fingers (1995). Wright created and directed the comedy series Asylum in 1996, written with David Walliams. "
  },
  {
    id: 7,
    name: "Adam Shankman",
    birthdate: "November 27, 1964",
    bio: "Adam Shankman is an American film director, producer, dancer, author, actor, and choreographer. He was a judge on seasons 3-10 of the television program So You Think You Can Dance He began his professional career in musical theater, and was a dancer in music videos for Paula Abdul and Janet Jackson.  "
  },
  {
    id: 8,
    name: "Patrick Hughes",
    birthdate: "N/A",
    bio: "Patrick Hughes is an Australian film director. "
  },
  {
    id: 9,
    name: "Peter Jackson",
    birthdate: "October 31, 1961",
    bio: "Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter, and film producer. He is best known as the director, writer, and producer of the Lord of the Rings trilogy (2001–03) and the Hobbit trilogy (2012–14), both of which are adapted from the novels of the same name by J. R. R. Tolkien. "
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
    res.status(201).send(Users)
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
