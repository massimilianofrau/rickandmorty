<script setup>
import { useCharactersList } from "../stores/characters.js";
import { useRoute, useRouter } from "vue-router";
import { mapState, mapActions, mapWritableState } from "pinia";
</script>

<script>
export default {
  computed: {
    ...mapState(useCharactersList, {
       charactersList: "results",
      info: "info",
    }),
  },

  methods: {
    ...mapActions(useCharactersList, ["fetchCharactersList","fetchCharacterData"]),
  },
};
</script>

<template>
  <div class="navigation">
    <button type="button" :disabled="!this.info.prev" @click.prevent="this.fetchCharactersList(this.info.prev)">
      prev
    </button>
    <button type="button" :disabled="!this.info.next" @click.prevent="this.fetchCharactersList(this.info.next)">
      next
    </button>
  </div>
</template>

<style lang="scss" scoped>
.navigation {
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
}
</style>
