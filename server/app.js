const express = require("express")
const graphqlHTTP = require('express-graphql').graphqlHTTP; //? https://stackoverflow.com/questions/62760975/graphqlhttp-is-not-a-function
// const { graphql } = require("graphql")
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const cors = require('cors')
const app = express()

mongoose.connect('mongodb+srv://sskazuya1130:sskazuya1130@cluster0.syonl.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
	console.log("DB connect")
})
app.use(cors())
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}))

app.listen(1111, () => {
	console.log('listening port 1111')
})