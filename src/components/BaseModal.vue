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
      selectedCharacterData: "selectedCharacterData",
      favouriteCharactersList: "favouriteCharactersList",
      favouriteCharactersArray: "favouriteCharactersArray"
    }),
    ...mapWritableState(useCharactersList, {
      selectedCharacter: "selectedCharacter",
      is_visible: "modal",
    }),
  },

  methods: {
    ...mapActions(useCharactersList, ["manageFavouriteList"]),
    
  /**
   * Closes character modal
   */
    closeModal() {
      this.is_visible = false;
      this.selectedCharacter = null;
    },

  },
};
</script>

<template>
  <transition name="fade">
    <div class="modal" v-if="this.is_visible" v-bind="$attrs">
      <!-- backdrop -->
      <div class="backdrop"></div>

      <div class="content">
        <!-- icona di chiusura -->
        <button class="close" @click.prevent="closeModal">chiudi</button>

        <!-- body della modale -->
        <div class="body">
          <img :src="this.selectedCharacterData.image" :alt="this.selectedCharacterData.name" />
          <div>
            <h3>{{ this.selectedCharacterData.name }}</h3>
            <dl>
              <dt>status:</dt>
              <dd>{{ this.selectedCharacterData.status }}</dd>
              <dt>gender:</dt>
              <dd>{{ this.selectedCharacterData.gender }}</dd>
              <dt>origin:</dt>
              <dd>{{ this.selectedCharacterData.origin.name }}</dd>
              <dt>location:</dt>
              <dd>{{ this.selectedCharacterData.location.name }}</dd>
              <dt>episode:</dt>
              <dd>
                <ul class="episode">
                  <li v-for="episode in this.selectedCharacterData.episode" :key="episode">{{
                  `${episode.name} (${episode.episode})`}} <small><em>{{`${episode.air_date}`}}</em></small>
                  </li>
                </ul>
              </dd>
            </dl>
            <button type="button" @click.prevent="this.manageFavouriteList()">{{
            `${this.favouriteCharactersArray.includes(this.selectedCharacter) ? 'Remove from' : 'Add to'}`
            }} favourite list</button>
          </div>
        </div>
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
  transition: all 0.5s ease-in-out;
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
    background-color: #fff;
    width: 95%;
    margin-top: 1rem;
    z-index: 1000;
    max-height: 96vh;
    overflow-y: auto;
    padding: 1rem;
    border-radius: 0.25rem;

    @media (min-width: 1024px) {
      width: 66.6666666%;
    }

    @media (min-width: 1280px) {
      width: 50%;
    }

    .close {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }

    .body {
      margin-top: 2rem;

      @media (min-width: 600px) {
        display: flex;
        align-items: flex-start;
      }

      &>div {
        margin-left: 1rem;
      }

      .episode {
        margin: 0
      }
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
