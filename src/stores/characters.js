import {defineStore} from 'pinia'

export const useCharactersList = defineStore('characters', {
  state: () => {
    return {
      charactersList   : {},
      listInfo         : {},
      fetching         : false,
      selectedCharacter: null,
      modal            : false
    }
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

    selectedCharacterData(state) {
      if (state.selectedCharacter === null || state.charactersList === {}) {
        return null;
      }

      console.log(state.charactersList.find(character => character.id === state.selectedCharacter))
      return state.charactersList.find(character => character.id === state.selectedCharacter);
    }
  },

  actions: {
    async fetchCharactersList(url = 'https://rickandmortyapi.com/api/character') {
      this.fetching  = true;
      const response = await fetch(url);
      try {
        const result        = await response.json();
        this.charactersList = result.results;
        this.listInfo       = result.info;
      } catch (err) {
        this.charactersList = [];
        console.error('Error loading characters:', err);
        return err;
      }

      this.fetching = false;
    },
  }
})