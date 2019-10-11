const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');
const {check, validationResult} = require('express-validator');

const passport = require('passport');
require('./passport');

const Movies = Models.Movie;
const Users = Models.User;

//mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://myFlixDBadmin:mai0201@myflixdb-m30cu.mongodb.net/myFlixDB?retryWrites=true&w=majority', {useNewUrlParser: true});


app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

var auth = require('./auth')(app);

const cors = require('cors');
app.use(cors());
// CORS codes
var allowedOrigins = ['http://localhost:8080', 'http://localhost:1234', 'https://testsite.com'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      // If a specific origin is not found on the list of allowed origins
      var message = 'The CORS policy for this application does not allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}))

// GET requests
app.get('/', function(req, res){
  res.send('Welcome to myFlix!')
});

// Get a list of ALL movies
app.get('/movies', (req, res) => {
  Movies.find()
  .then(function(movie){
    res.status(201).json(movie);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Get data about a single movie by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({Title: req.params.Title})
  .then(function(movie){
    if(movie){
      res.json(movie);
    }else{
      res.status(400).send(req.params.Title + "does not exist");
    }
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Get data about a genre by name/title
app.get('/movies/genres/:Title', (req, res) => {
  Movies.findOne({Title: req.params.Title})
  .then(function(movie){
    if(movie){
      res.status(201).json(movie.Genre);
    }else{
      res.status(400).send(req.params.Title + "does not exist");
    }
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Get data about a director by name
app.get('/movies/directors/:Name', (req, res) => {
  Movies.findOne({'Director.Name': req.params.Name})
  .then(function(movie){
    res.status(201).json(movie.Director);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  })
});

// Get all users
app.get('/users', passport.authenticate('jwt', {session: false}), function(req, res){
  Users.find()
    .then(function(users){
      res.status(201).json(users);
    })
    .catch(function(err){
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), function(req, res){
  Users.findOne({Username: req.params.Username})
    .then(function(user){
      if(user){
        res.json(user);
      }else{
        return res.status(400).send(req.params.Username + " does not exist")
      }
    })
    .catch(function(err){
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Add new users
/* We will expectJSON in this format
{
ID: Integer,
Username: String,
Password: String,
Email: String,
Birthday: Date
} */
app.post('/users', [
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
  var errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()});
  }
  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({Username: req.body.Username})
  .then(function(user){
    if(user){
      return res.status(400).send(req.body.Username + " already exists")
    }else{
      Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user){res.status(201).json(user)})
        .catch(function(error){
          console.error(error);
          res.status(500).send("Error: " + error);
        })
      }
    }).catch(function(error){
      console.error(error);
      res.status(500).send("Error: " + error);
    });
  });

// Update username
/* We will expect JSON in this format
{
  Username: String, (required)
  Password: String, (required)
  Email: String, (required)
  Birthday: Date
} */

app.put('/users/:Username', passport.authenticate('jwt', {session: false}), (req,res) => {
  Users.findOneAndUpdate({Username: req.params.Username}, {$set:
  {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  }},
  {new: true}, // This line will specify to return the new updated data.
  function(err, updatedUser){
    if(err){
      console.error(err);
      res.status(500).send("Error " + err);
    }else{
      res.json(updatedUser);
    }
  });
});

// Add a movie to their list of favorites
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username}, {
    $push: {Favorites: [req.params.MovieID]}
  },
  {new: true},
  function(err, updatedUser){
    if(err){
      console.error(err);
      res.status(500).send("Error: " + err);
    }else{
      res.json(updatedUser);
    }
  });
});

// Remove a movie from their list of favorites
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username}, {
    $pull: {Favorites: req.params.MovieID}
  },
  {new: true})
  .then(function(movie){
    if(movie){
      res.status(201).json(movie);
    }else{
      res.status(400).send("This movie does not exist in the favorite list")
    }
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Remove existing users by username
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndRemove({Username: req.params.Username})
  .then(function(user){
    if(!user){
      res.status(400).send(req.params.Username + " was not found");
    }else{
      res.status(200).send(req.params.Username + " was deleted");
    }
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// error handling
app.use(function (err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

// listen for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function(){
  console.log('Listening on Port 3000.')
});
