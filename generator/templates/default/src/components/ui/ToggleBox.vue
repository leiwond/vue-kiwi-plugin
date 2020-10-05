<template>
    <div class="toggle-box">
        <div class="toggle-box--content">
            <div class="toggle-box--title">
                <slot name="title"/>
            </div>
            <div class="toggle-box--text">
                <slot name="text"/>
            </div>
        </div>
        <v-switch v-model="val" data-qa="togglebox switch"/>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    .toggle-box {
        border: solid 1px $color-gray3;
        padding: 20px;
        display: flex;
        justify-content: space-between;

        &--content {
            flex-grow: 1;
        }

        &--title {
            font-size: 16px;
        }

        &--text {
            font-size: 14px;
            color: $color-gray2;
        }

        .v-input {
            flex: none;
        }
    }
</style>

<script>
export default {
  props: {
    value: { type: Boolean, required: true },
  },

  data() {
    return {
      val: this.value,
    };
  },

  watch: {
    val(val) {
      this.$emit('input', val);
    },

    value(val) {
      this.val = val;
    },
  },
};
</script>
