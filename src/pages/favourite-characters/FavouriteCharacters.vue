<script setup>
import TopNavbar from '../../components/TopNavbar.vue';
import FavouriteCharactersList from '../../components/FavouriteCharactersList.vue';
import BaseModal from '../../components/BaseModal.vue';
</script>
  
  <template>
  <TopNavbar />
  <FavouriteCharactersList />
  <BaseModal />
</template>
  <style>
  </style>
  
  <script>
export default {
  components: {
    TopNavbar,
    FavouriteCharactersList,
    BaseModal
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