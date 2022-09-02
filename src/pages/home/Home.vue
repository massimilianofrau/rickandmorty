<script setup>
import TopNavbar from '../../components/TopNavbar.vue';
import CharactersList from "../../components/CharactersList.vue";
import BaseModal from "../../components/BaseModal.vue"
</script>

<template>
  <TopNavbar />
  <CharactersList />
  <BaseModal />
</template>
<style></style>

<script>
export default {
  components: {
    TopNavbar,
    CharactersList
  },

  computed: {},

  mounted() {
  },

  data() {
    return {
    };
  },
};
</script>