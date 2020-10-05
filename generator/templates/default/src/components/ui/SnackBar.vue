<template>
    <v-snackbar v-model="show" :color="color" top data-qa="snackbar">
        {{ message }}
        <v-btn icon small @click="close">
            <v-icon>icon-close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    .v-snack {
        font-size: $font-size-default;
    }
</style>

<script>
export default {
  data: () => ({
    show: false,
    message: '',
    color: '',
  }),

  methods: {
    success(message) {
      this.show = true;
      this.message = message;
      this.color = 'success';
    },

    error(message) {
      this.show = true;
      this.message = message;
      this.color = 'error';
    },

    info(message) {
      this.show = true;
      this.message = message;
      this.color = 'info';
    },

    close() {
      this.show = false;
    },
  },
};
</script>
