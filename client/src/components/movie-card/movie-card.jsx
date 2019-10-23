import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component{
	render(){
		// This is given to the <MovieCard/> component by the outer world
		// which, in this case, is "MainView", as "MainView" is what is
		// connected to your database via the movies endpoint of your API
		const {movie, onClick} = this.props;
		
		return (
			<Card style={{width: '16rem'}}>
				<Card.Img variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title onClick={() => onClick(movie)} className="movie-card">{movie.Title}</Card.Title>
					<Card.Text>{movie.Description}</Card.Text>
					<Button onClick={() => onClick(movie)} className="movie-card">{movie.Title}</Button>
				</Card.Body>
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired
	}).isRequired,
	Director: PropTypes.shape({
		Name: PropTypes.string
	}),
	Gernre: PropTypes.shape({
		Name: PropTypes.string,
		Description: PropTypes.string
	}),
	onClick: PropTypes.func.isRequired
};