<template>
    <v-navigation-drawer right fixed app :value="show" width="450" class="rightSideBar">
        <div
            class="rightSideBar-handle"
            :class="{ 'rightSideBar-handle--open': show }"
            @click="toggleSideBar"
            data-qa="right sidebar handle">
            <v-icon class="rightSideBar-icon">icon-chevron-left</v-icon>
        </div>
        <div class="rightSideBar-content">
            <slot />
        </div>
    </v-navigation-drawer>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    .rightSideBar {
        overflow: visible;

        &-handle {
            background: $color-background;
            cursor: pointer;
            position: absolute;
            width: 48px;
            height: 48px;
            left: -48px;
            top: $padding-list;
            display: flex;
            align-items: center;
            justify-content: center;

            &--open {
                .rightSideBar-icon {
                    transform: rotate(180deg);
                }
            }
        }

        &-icon {
            transition: transform 0.5s;
        }

        &-content {
            border-left: $padding-4 solid $color-background;
            overflow-x: hidden;
            overflow-y: auto;
            width: 100%;
            height: 100%;
        }
    }
</style>

<script>
export default {

  methods: {

    toggleSideBar() {
      // show / hide
    },
  },
};
</script>
