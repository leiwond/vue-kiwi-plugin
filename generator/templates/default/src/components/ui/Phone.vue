<template>
    <div class="phone">
        <template v-if="prefix">
            {{ prefix }} &nbsp;
        </template>
        <a :href="'tel:' + sanitizedNumber">
            <slot>{{ number }}</slot>
        </a>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    a {
        color: inherit;
    }
</style>

<script>
export default {
  props: {
    number: { type: String, required: true },
    prefix: { type: String, default: '' },
  },

  computed: {
    sanitizedNumber() {
      return this.number
        .replace('(0)', '')
        .replace(/[^0-9+\- /]/g, '')
        .replace(/^[+]/g, '00')
        .replace(/[\s+-]/g, '');
    },
  },
};
</script>
