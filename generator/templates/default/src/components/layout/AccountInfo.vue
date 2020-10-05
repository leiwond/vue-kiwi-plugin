<template>
  <v-list data-qa="account info" class="bottom">
    <v-list-item-group
      color="primary"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar size="24">
            <img
              v-if="loggedInUser.thumbnail"
              :src="loggedInUser.thumbnail"
              :title="loggedInUser.fullName"
            >
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title @click="logoutUser" class="logout" data-qa="logout button">
            Logout
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  .logout:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(
      ['loggedInUser'],
    ),
  },

  methods: {
    ...mapActions(
      ['logout'],
    ),

    logoutUser() {
      this.logout();
      this.$router.push('login');
    },
  },
};
</script>
