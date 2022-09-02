<script setup>
import {useCharactersList} from "../stores/characters.js";
import {mapState, mapActions, mapWritableState} from 'pinia';
</script>

<script>
export default {
  computed: {
    ...mapState(useCharactersList, {
      charactersList: 'results',
      info: 'info',
    }),
    ...mapWritableState(useCharactersList, {
      modal: 'modal',
      selectedCharacter: 'selectedCharacter'
    })
  },

  mounted() {
    // console.log('results: ', this.charactersList)
  },

  methods: {
    ...mapActions(useCharactersList, ['fetchCharactersList']),
    openCharacterModal(id) {
      this.selectedCharacter = id;
      this.modal = true;
    }
  },

  created() {
    // when the template is created, we call this action
    this.fetchCharactersList();
  }
};
</script>


<template>
  <h1>Rick and Morty characters</h1>
  <div v-for="character in this.charactersList"><a @click.prevent="openCharacterModal(character.id)">{{
      character.name
    }}</a></div>
  <div>
    <button type="button" :disabled="!this.info.prev" :href="this.info.prev">prev</button>
    <button type="button" :disabled="!this.info.next" :href="this.info.next">next</button>
  </div>
</template>

<style scoped></style>