import {createRouter} from 'vue-router'
import Homepage from './home/Home.vue';
import FavouriteCharacters from './favourite-characters/FavouriteCharacters.vue';

const routes = [
  {
    path: '/',
    component: Homepage
  },

  {
    path: '/favourite-characters/',
    component: FavouriteCharacters
  },
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}