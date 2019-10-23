import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component{
	constructor(){
			super();
			this.state={};
	}
	render(){
			const {movie, onBack} = this.props;
			if(!movie) return null;

			return(
					<div className="movie-view">
							<div className="movie-title">
									<div className="label">Title</div>
									<div className="value">{movie.Title}</div>
							</div>
							<div className="movie-description">
									<div className="label">Description</div>
									<div className="value">{movie.Description}</div>
							</div>
							<img className="movie-poster" src={movie.ImagePath} />
							<div className="movie-genre">
									<div className="label">Genre</div>
									<div className="value">{movie.Genre.Name}</div>
							</div>
							<div className="movie-director">
									<div className="label">Direcrtor</div>
									<div className="value">{movie.Director.Name}</div>
							</div>
							<button onClick={onBack} className="back-button">Back</button>
					</div>
			);
	}
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
		Director: PropTypes.shape({
			Name: PropTypes.string
		}),
		Gernre: PropTypes.shape({
			Name: PropTypes.string,
			Description: PropTypes.string
		}),
	}).isRequired
};