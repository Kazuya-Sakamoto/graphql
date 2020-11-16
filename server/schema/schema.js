const graphql = require('graphql')
const Movie = require('../models/movie')
const Director = require('../models/director')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt } = graphql

// ! 型宣言
const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: () => ({ //* 取得したいデータ & 型
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
})

const DirectorType = new GraphQLObjectType({
	name: 'Director',
	fields: () => ({ 
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt }
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		movie: {
			type: MovieType,
			args: { id: { type: GraphQLID }},
			resolve(parents, args) {
				return Movie.findById(args.id)
			}
		},
		director: {
			type: DirectorType,
			args: { id: { type: GraphQLID }},

			resolve(parents, args) {
				return Director.findById(args.id)
			}
		}
	}
})

// ! Mutation
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// * 映画の追加
		addMovie: {
			type: MovieType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString }
			},
			resolve(parents, args) {
				let movie = new Movie({
					name: args.name,
					genre: args.genre
				})

				return movie.save()
			}
		},

		// * 監督の追加
		addDirector: {
			type: DirectorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt }
			},
			resolve(parents, args) {
				let director = new Director({
					name: args.name,
					age: args.age
				})

				return director.save()
			}
		}
	}
})


module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})