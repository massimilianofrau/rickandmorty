<script setup>
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
      info: "info",
    }),
    ...mapWritableState(useCharactersList, {
      modal: "modal",
      selectedCharacter: "selectedCharacter",
    }),
  },

  watch: {
    search(newValue, oldValue) {
      if (newValue.length > 0) {
        this.filterResults(newValue);
      }
    },
  },

  mounted() {
    // console.log('results: ', this.charactersList)
  },

  methods: {
    ...mapActions(useCharactersList, ["fetchCharactersList","fetchCharacterData"]),
    async openCharacterModal(id) {
      this.selectedCharacter = id;
      await this.fetchCharacterData();
      this.modal = true;
    },
    async filterResults(search) {
      const url = `https://rickandmortyapi.com/api/character/?name=${search}`;
      await this.fetchCharactersList(url);
    },
  },

  async created() {
    // when the template is created, we call this action
    await this.fetchCharactersList();
  },
};
</script>

<template>
  <h1>Rick and Morty characters</h1>
  <input type="text" v-model="search" placeholder="Search character name" />
  <ul v-if="this.charactersList.length > 0" class="characters-list">
    <li v-for="character in this.charactersList" :key="character">
      <a @click.prevent="openCharacterModal(character.id)">{{ character.name }}</a>
    </li>
  </ul>
  <p v-else>No results found.</p>
  <div class="navigation" v-if="this.charactersList.length > 0 && this.info.count > 20">
    <button
      type="button"
      :disabled="!this.info.prev"
      @click.prevent="this.fetchCharactersList(this.info.prev)"
    >
      prev
    </button>
    <button
      type="button"
      :disabled="!this.info.next"
      @click.prevent="this.fetchCharactersList(this.info.next)"
    >
      next
    </button>
  </div>
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
