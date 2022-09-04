<script setup>
  import BasePagination from "./BasePagination.vue";
import { useCharactersList } from "../stores/characters.js";
import { mapState, mapActions, mapWritableState } from "pinia";
import { ref } from "vue";

let search = ref("");

</script>

<script>
export default {
  computed: {
    ...mapState(useCharactersList, {
      charactersList: "results",
      favouriteCharactersArray: "favouriteCharactersArray",
      info: "info",
    }),
    ...mapWritableState(useCharactersList, {
      modal: "modal",
      selectedCharacter: "selectedCharacter",
    }),
  },

  watch: {
    search(newValue, oldValue) {
      this.filterResults(newValue);
    },
  },

  methods: {
    ...mapActions(useCharactersList, ["fetchCharactersList","fetchCharacterData","manageFavouriteList"]),
      
  /**
   * Opens character modal
   * @param {Number} id - ID of selected character
   */
    async openCharacterModal(id) {
      this.selectedCharacter = id;
      await this.fetchCharacterData();
      this.modal = true;
    },
      
  /**
   * Filter search results
   * @param {String} search - String to search
   */
    async filterResults(search) {
      let url;
      if (search.length > 0) {
        url = `https://rickandmortyapi.com/api/character/?name=${search}`;
      }
      await this.fetchCharactersList(url);
    },
  },

  async created() {
    await this.fetchCharactersList();
  },
};
</script>

<template>
  <h2>Characters</h2>
  <input type="text" v-model="search" placeholder="Search character name" />
  <BasePagination v-if="this.charactersList.length > 0 && this.info.count > 20" />
  <ul v-if="this.charactersList.length > 0" class="characters-list">
    <li v-for="character in this.charactersList" :key="character">
      <a @click.prevent="openCharacterModal(character.id)">
        <img :src="character.image" alt="{{ character.name }}"><br />
        {{ character.name }}
      </a>
      <button type="button" @click.prevent="this.manageFavouriteList(character.id)">{{
      `${this.favouriteCharactersArray.includes(character.id) ? 'Remove from' : 'Add to'}`
      }} favourite list</button>
    </li>
  </ul>
  <p v-else>No results found.</p>
  <BasePagination v-if="this.charactersList.length > 0 && this.info.count > 20" />
</template>

<style lang="scss" scoped>
.characters-list {
  margin: 1rem auto;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  gap: 1rem 2rem;
  justify-content: space-around;


  li {
    a {
      display: block;
      text-decoration: underline;
      color: blue;
      cursor: pointer;
      max-width: 200px;

      img {
        width: 100%;
      }
    }
  }
}
</style>
