const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const Champion = require('./champion')
const Languages = require('./languages')

const schema = buildSchema(`
  type Query {
    languages: [Languages]
    language(name: String!): Language
    getChampions: [Champion]
    getChampionByName(name: String!): Champion
  }
  type Mutation {
    updateAttackDamage(name: String!, attackDamage: Float): Champion
  }
  type Champion {
     name: String
     attackDamage: Float
   }
  type Language {
     name: String
     age: Int
   }
  type Languages {
     name: String
     age: Int
   }
`)

const champions = [
  new Champion('Ashe', 100),
  new Champion('Vayne', 200)
]

const languages = [
  new Languages('JavaScript', 20),
  new Languages('Java', 25),
  new Languages('PHP', 22),
  new Languages('Go', 10)
]

const rootValue = {
  languages: () => languages,
  language: ({name}) => {
    return languages.find(el => el.name === name)
  },
  getChampions: () => champions,
  getChampionByName: ({name}) => {
    return champions.find( el => el.name === name)
  },
  updateAttackDamage: ({ name, attackDamage = 150 }) => {
    const champion = champions.find(x => x.name === name)
    champion.attackDamage = attackDamage
    return champion
  }
}

const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))
// eslint-disable-next-line no-console
app.listen(4000, () => console.log('Listening on 4000'))
