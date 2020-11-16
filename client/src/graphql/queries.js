import gql from 'graphql-tag'

export const MOVIE_LIST = gql`
	query MOVIE_LIST {
		movies {
			id
			name
			genre
			director {
				id
				name
			}
		}
	}
`

export const DIRECTOR_LIST = gql`
	query DIRECTOR_LIST {
		directors {
			id
			name
			age
		}
	}
`

export const ADD_MOVIE = gql`
	mutation ADD_MOVIE($name: String!, $genre: String!, $directorId: ID!) {
		addMovie(name: $name, genre: $genre, directorId: $directorId) {
			id
			name
			genre
			director {
				id
				name
			}
		}
	}
`