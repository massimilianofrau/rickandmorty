import {createRouter} from 'vue-router'
import Homepage from './home/Home.vue';
import Characters from './characters/Characters.vue';

const routes = [
  {
    path: '/',
    component: Homepage
  },

  {
    path: '/characters/',
    component: Characters
  },
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}