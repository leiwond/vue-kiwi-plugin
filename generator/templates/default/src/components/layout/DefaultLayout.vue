<template>
  <v-app>
    <left-side-bar v-if="hasLeftSideBar"/>

    <right-side-bar v-if="hasRightSideBar">
      <slot name="right-side-bar"/>
    </right-side-bar>

    <v-main>
      <v-container fluid grid-list-xl>
        <slot/>
      </v-container>
    </v-main>

    <ui-confirm ref="confirm"/>

    <ui-alert ref="alert"/>

    <ui-snackbar ref="snackbar"/>

    <ui-loading-screen ref="loadingScreen"/>
  </v-app>
</template>

<script>
import LeftSideBar from './LeftSideBar.vue';
import RightSideBar from './RightSideBar.vue';

export default {
  name: 'DefaultLayout',

  computed: {
    hasRightSideBar() {
      return !!this.$slots['right-side-bar'];
    },
    hasLeftSideBar() {
      return true;
    },
  },

  mounted() {
    this.$root.$alert = this.$refs.alert;
    this.$root.$confirm = this.$refs.confirm;
    this.$root.$snackbar = this.$refs.snackbar;
    this.$root.$loadingScreen = this.$refs.loadingScreen;
  },

  components: {
    LeftSideBar,
    RightSideBar,
  },
};
</script>
