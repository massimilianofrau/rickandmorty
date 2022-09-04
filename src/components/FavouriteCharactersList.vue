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
    async openCharacterModal(id) {
      this.selectedCharacter = id;
      await this.fetchCharacterData();
      this.modal = true;
    },
  },
};
</script>

<template>
  <h1>Rick and Morty: my favourite characters</h1>
  <ul v-if="this.favouriteCharactersArray.length > 0" class="characters-list">
    <li v-for="character in this.favouriteCharactersList" :key="character">
      <a @click.prevent="openCharacterModal(character.id)">{{ character.name }}</a>
    </li>
  </ul>
  <p v-else>No favourite characters found.</p>
</template>

<style lang="scss" scoped>
.characters-list {
  li {
    a {
      text-decoration: underline;
      color: blue;
      cursor: pointer;
    }
  }
}
</style>
