<template>
    <div v-if="val" class="loadingScreen">
        <v-progress-linear :indeterminate="true" :height="2"/>
        <div class="loadingScreen-container"/>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    .loadingScreen {
        position: fixed;
        width: 100%;
        z-index: 10;

        .v-progress-linear {
            margin-top: 0;
            position: fixed;
        }
    }
</style>

<script>
export default {
  data() {
    return {
      val: false,
    };
  },

  methods: {
    show() {
      this.val = true;
    },

    hide() {
      this.val = false;
    },
  },
};
</script>
