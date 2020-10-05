<template>
    <div class="kiwi">
        <template v-if="type === 'empty'">
            <img :src="require('../../assets/kiwi-empty.svg')" data-qa="sad kiwi">
            <p>{{ text }}</p>
        </template>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    .kiwi {
        margin: 0 auto;
        max-width: 100%;
        width: 500px;

        p {
            text-align: center;
            font-size: $font-size-heading3;
        }
    }
</style>

<script>
export default {
  props: {
    type: { type: String, default: 'empty' },
    text: { type: String, default: '' },
  },
};
</script>
