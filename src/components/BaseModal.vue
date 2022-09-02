<script setup>
import {useCharactersList} from "../stores/characters.js";
import {useRoute, useRouter} from "vue-router";
import {mapState, mapActions, mapWritableState} from 'pinia';
</script>

<script>
export default {
  computed: {
    ...mapState(useCharactersList, {
      charactersList: 'results',
      info: 'info',
      selectedCharacterData: 'selectedCharacterData'
    }),
    ...mapWritableState(useCharactersList, {
      is_visible: 'modal'
    })
  },

  methods: {
    closeModal() {
      this.is_visible = false;
    }
  },

  created() {
    // when the template is created, we call this action
    console.log(this.selectedCharacterData);
  }
};
</script>

<template>
  <transition name="fade">
    <div
        class="modal"
        v-if="this.is_visible"
        v-bind="$attrs"
    >
      <!-- backdrop -->
      <div class="backdrop"></div>

      <div class="content">
        <!-- icona di chiusura -->
        <button class="close" @click.prevent="closeModal">chiudi</button>

        <!-- body della modale -->
        <div class="body">
          <h4></h4>
        </div>
        body
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>


.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: all .50s ease-in-out;

  height: 100%;
  width: 100%;

  .backdrop {
    position: fixed;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;

  }

  .content {
    position: relative;
    background-color: #FFF;
    width: 90%;
    margin-top: 1rem;
    z-index: 1000;
    max-height:96vh;
    overflow-y: auto;
    padding: 1rem;
    border-radius: 0.25rem;

    @media (min-width: 1024px) {
      width: 66.6666666%;
    }

    @media (min-width: 1280px) {
        width: 33.333333%;
    }

    .close {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #bbb;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
}
</style>



