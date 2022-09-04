<script setup>
import { useCharactersList } from "../stores/characters.js";
import { mapState, mapActions, mapWritableState } from "pinia";
</script>

<script>
export default {
  computed: {
    ...mapState(useCharactersList, {
      favouriteCharactersList: "favouriteCharactersList",
      favouriteCharactersArray: "favouriteCharactersArray"
    }),
    ...mapWritableState(useCharactersList, {
      modal: "modal",
      selectedCharacter: "selectedCharacter",
    }),
  },

  methods: {
    ...mapActions(useCharactersList, ["manageFavouriteList", "fetchCharacterData"]),
  
  /**
   * Opens character modal
   * @param {Number} id - ID of selected character
   */
    async openCharacterModal(id) {
      this.selectedCharacter = id;
      await this.fetchCharacterData();
      this.modal = true;
    },
  },
};
</script>

<template>
  <h2>My favourite characters</h2>
  <ul v-if="this.favouriteCharactersArray.length > 0" class="characters-list">
    <li v-for="character in this.favouriteCharactersList" :key="character">
      <a @click.prevent="openCharacterModal(character.id)">
        <img :src="character.image" alt="{{ character.name }}"><br />
        {{ character.name }}
      </a>
      <button type="button" @click.prevent="this.manageFavouriteList(character.id)">{{
      `${this.favouriteCharactersArray.includes(character.id) ? 'Remove from' : 'Add to'}`
      }} favourite list</button>
    </li>
  </ul>
  <p v-else>The list is empty</p>
</template>

<style lang="scss" scoped>
.characters-list {
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  gap: 1rem 2rem;

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
