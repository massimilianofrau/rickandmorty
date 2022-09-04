import { defineStore } from "pinia";

export const useCharactersList = defineStore("characters", {
  state: () => {
    return {
      charactersList: [],
      favouriteCharactersArray: [],
      favouriteCharactersList: [],
      listInfo: {},
      fetching: false,
      selectedCharacter: null,
      selectedCharacterData: {},
      modal: false,
    };
  },

  getters: {
    results(state) {
      return state.charactersList;
    },

    info(state) {
      return state.listInfo;
    },

    isFetching(state) {
      return state.fetching;
    },

    isModal(state) {
      return state.modal;
    },
  },

  actions: {
    async fetchCharactersList(
      url = "https://rickandmortyapi.com/api/character"
    ) {
      this.fetching = true;
      const response = await fetch(url);
      try {
        const result = await response.json();

        if (Array.isArray(result)) {
          this.favouriteCharactersList = result;
        } else if (result.error) {
          this.charactersList = [];
          this.listInfo = [];
        } else if (result.results && result.info) {
          this.charactersList = result.results;
          this.listInfo = result.info;
        } else {
          this.favouriteCharactersList = [result];
        }
      } catch (err) {
        this.charactersList = [];
        this.favouriteCharactersList = [];
        this.listInfo = [];
        console.error("Error loading characters:", err);
        return err;
      }

      this.fetching = false;
    },
    async fetchCharacterData(id = this.selectedCharacter) {
      if (!id) {
        console.error("Error loading character: Missing ID");
        return;
      }

      this.fetching = true;
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      try {
        const result = await response.json();
        if (
          this.selectedCharacterData.episode &&
          this.selectedCharacterData.episode.length > 0
        ) {
          this.selectedCharacterData.episode.forEach(async (singleEpisode, index) => {
            this.fetching = true;
            const response = await fetch(singleEpisode);
            try {
              const episodeResult = await response.json();
              this.selectedCharacterData.episode[index] = episodeResult;
            } catch (err) {
              console.error("Error loading episode:", err);
              return err;
            }
          });
        }
        this.selectedCharacterData = result;
      } catch (err) {
        console.error("Error loading character's data:", err);
        return {};
      }

      this.fetching = false;
    },
    manageFavouriteList(id = this.selectedCharacter) {
      if (!id) {
        console.error("Error managing favourite list.");
        return;
      }
      let newFavouriteList = [];
      if (this.favouriteCharactersArray.includes(id)) {
        newFavouriteList = this.favouriteCharactersArray.filter(
          (character) => character !== id
        );
        this.favouriteCharactersArray = newFavouriteList;
      } else {
        this.favouriteCharactersArray.push(id);
      }
      this.fetchCharactersList(
        `https://rickandmortyapi.com/api/character/${this.favouriteCharactersArray.join(
          ","
        )}`
      );
    },
  },
});
