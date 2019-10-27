import React from 'react';
import axios from 'axios';
import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './main-view.scss'

export class MainView extends React.Component{
    constructor(){
        // Call the superclass constructor
        // so React can initialis{e it
        super();
        // Initialise the state to an empty object so we can destructure it later
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            newUser: null
        };
    }
    // This overrides the render()method of the superclass
    // No need to call super() though, as it does nothing by default

    // One of the "hooks" available in a React Component
    componentDidMount(){
        axios.get('https://myflix0201.herokuapp.com/movies')
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function(error){
                console.log(error);
            });
        }
        
        onMovieClick(movie){
            this.setState({
                selectedMovie: movie
            });
        }
        
        onBack = () => {
            this.setState({
                selectedMovie: null
            });
        }

        onLoggedIn(user){
            this.setState({
                user
            });
        }

        onRegistration(newUser){
            this.state({
                newUser
            });
        }

    render(){
        // If the state is not initialised, this will throw on runtime
        // before the data is initially loaded
        const {movies, selectedMovie, user, newUser} = this.state;

        if (!newUser) return <RegistrationView onLoggedIn={newUser => this.onLoggedIn(newUser)} />;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        
        // Before the movies have been loaded
        if (!movies) return <div className = "main-view"/>;
        return (
             <div className = "main-view">
              <Container> 
                <Row>
                  {selectedMovie
                    ? <MovieView movie={selectedMovie} onBack={this.onBack} />
                    : movies.map(movie => (
                      <Col xs={12} sm={6} md={4} lg={3}>
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                      </Col>
                    ))
                  }
                </Row> 
              </Container>  
            </div>
        );
    }
}