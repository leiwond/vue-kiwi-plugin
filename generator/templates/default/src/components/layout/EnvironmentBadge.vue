<template>
    <div>
        <template v-if="env !== ''">
            <div :class="className">
                {{ env }}
            </div>
        </template>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    .environmentBadge {
        font-weight: bold;
        text-align: center;
        padding: 5px;
        text-transform: uppercase;
    }

    .environmentBadge-development {
        color: #000000;
        background-color: $color-green2;
    }

    .environmentBadge-staging {
        color: #000000;
        background-color: $color-yellow2;
    }
</style>

<script>
export default {
  computed: {
    env() {
      return process.env.VUE_APP_ENVIRONMENT_NAME;
    },
    className() {
      return `environmentBadge environmentBadge-${this.env.toString().toLowerCase()}`;
    },
  },
};
</script>
