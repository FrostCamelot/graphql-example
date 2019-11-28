<template>
  <div id="app">
    <div>
      <h3>Example 0</h3>
      <div v-if="language">
        <span>{{language.name}}</span> - <span>{{language.age}}</span>
      </div>
      <button @click="getLanguage">Get Language</button>
      <hr>
    </div>

    <div>
      <h3>Example 1</h3>
      <div>
        <ul>
          <li v-for="(item, key) in languages" :key="key">
            <span>{{item.name}}</span> - <span>{{item.age}}</span>
          </li>
        </ul>
      </div>
      <button @click="getLanguages">Get Languages</button>
      <hr>
    </div>

    <div>
      <h3>Example 2</h3>
      <div>
        <ul>
          <li v-for="(item, key) in champions" :key="key">
            <span>{{item.name}}</span> - <span>{{item.attackDamage}}</span>
          </li>
        </ul>
      </div>
      <button @click="getChampions">Get Champions</button>
      <hr>
    </div>

    <div>
      <h3>Example 3</h3>
      <div v-if="champion">
        <span>{{champion.name}}</span> - <span>{{champion.attackDamage}}</span>
      </div>
      <button @click="getChampionByName">Get Champion</button>
      <hr>
    </div>

    <div>
      <h3>Example 4</h3>
      Name: <input v-model="name">
      Attack Damage: <input v-model.number="attack">
      <div>
        <div v-if="updatedChampion">
          <span>{{updatedChampion.name}}</span> - <span>{{updatedChampion.attackDamage}}</span>
        </div>
      </div>
      <button @click="updateAttackDamage">Update Champion</button>
    </div>

  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      language: '',
      languages: [],
      champions: [],
      champion: '',
      name: '',
      attack: null,
      updatedChampion: null
    }
  },
  methods: {
    async getLanguage () {
      const res = await axios.post('http://localhost:4000/graphql', {
        query: `
          query Language($name: String!) {
            language(name: $name) {
              name
              age
            }
          }
        `,
        variables: {
          name: 'JavaScript'
        }
      })
      this.language = res.data.data.language
    },

    async getLanguages () {
      try {
        const res = await axios.post(
          'http://localhost:4000/graphql', {
            query: `{
              languages {
                name
                age
              }
            }`
          })
        this.languages = res.data.data.languages
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('err', e)
      }
    },

    async getChampions () {
      try {
        const res = await axios.post(
          'http://localhost:4000/graphql', {
            query: `{
              getChampions {
                name
                attackDamage
              }
            }`
          })
        this.champions = res.data.data.getChampions
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('err', e)
      }
    },

    async getChampionByName () {
      const res = await axios.post('http://localhost:4000/graphql', {
        query: `
          query GetChampionByName($championName: String!) {
            getChampionByName(name: $championName) {
              name
              attackDamage
            }
          }
        `,
        variables: {
          championName: 'Ashe'
        }
      })
      this.champion = res.data.data.getChampionByName
    },

    async updateAttackDamage () {
      const res = await axios.post('http://localhost:4000/graphql', {
        query: `
        mutation UpdateAttackDamage($championName: String!,  $attackDamage: Float) {
          updateAttackDamage(name: $championName, attackDamage: $attackDamage) {
            name
            attackDamage
          }
        }`,
        variables: {
          championName: this.name,
          attackDamage: this.attack
        }
      })
      this.updatedChampion = res.data.data.updateAttackDamage
    }
  }
}
</script>
