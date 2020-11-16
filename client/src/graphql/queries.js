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