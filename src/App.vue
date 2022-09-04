<script setup>
  import TopNavbar from './components/TopNavbar.vue';
</script>

<template>
  <TopNavbar />
  <section class="content">
    <h1>Rick and Morty</h1>
    <router-view />
  </section>
</template>

<style lang="scss">
html,
body {
  background-color: #cde9f5 !important;
  margin: 0;
  padding: 0;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content {
  padding: 3rem 0.5rem;
  box-sizing: border-box;
  width: 100%;

  @media (min-width: 1024px) {
    max-width: 950px
  }

  @media (min-width: 1280px) {
    max-width: 1350px;
  }

}
</style>
