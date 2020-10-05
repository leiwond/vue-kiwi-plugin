<template>
    <v-dialog
        v-if="!fullscreen"
        v-model="show"
        v-resize="resize"
        v-bind="$attrs"
        :max-width="width"
        scrollable
        lazy
        ref="dialog">
        <slot name="activator" slot="activator" />
        <v-card>
            <v-toolbar height="90" card tabs flat prominent>
                <v-toolbar-title>
                    <h1 class="text-truncate font-weight-regular">{{ title }}</h1>
                    <h2 v-if="subtitle" class="subheading">{{ subtitle }}</h2>
                </v-toolbar-title>

                <v-spacer />

                <v-btn v-if="isCloseable" @click="close" small icon>
                    <v-icon>icon-close</v-icon>
                </v-btn>

                <slot name="tabs" slot="extension"/>
            </v-toolbar>

            <v-card-text class="px-4">
                <slot />
            </v-card-text>

            <v-card-actions v-if="hasActions" class="px-4 pb-4">
                <v-spacer />
                <slot name="actions" />
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
        v-else
        v-model="show"
        v-bind="$attrs"
        scrollable
        lazy
        fullscreen
        persistent
        no-click-animation
        hide-overlay
        transition="dialog-bottom-transition"
        @keydown.esc="confirmClose">
        <v-card>
            <v-toolbar height="100" tabs flat prominent>
                <v-toolbar-title>
                    <div class="toolbar-title-wrapper">
                        <div class="toolbar-title">
                            <h1 class="text-truncate font-weight-regular">{{ title }}</h1>
                            <h2 v-if="subtitle" class="subheading pt-3">{{ subtitle }}</h2>
                        </div>
                        <h3 v-if="subtitleExtension" class="title font-weight-thin">
                          {{ subtitleExtension }}
                        </h3>
                    </div>
                </v-toolbar-title>

                <v-spacer />

                <v-btn v-if="isCloseable" @click="close" small icon>
                    <v-icon>icon-close</v-icon>
                </v-btn>

                <slot name="tabs" slot="extension"/>
            </v-toolbar>

            <v-card-text>
                <slot name="content"/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    $fullscreen-width: 1185px;

    .v-dialog {
        flex-direction: column;
        background-color: #ffffff;

        // override flex-direction in order to have multiline v-toolbar titles
        .toolbar-title-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;

            .toolbar-title {
                display: flex;
                flex-direction: row;
                align-items: baseline;
            }
        }

        .v-toolbar {
            flex-direction: row;
            border-bottom: 1px solid $color-border;
            background-color: #ffffff;
        }

        .v-toolbar__title {
            display: flex;
            align-items: baseline;
            width: 100%;
            margin-top: 0;

            h1 {
                max-width: 80%;
            }

            h2 {
                margin-left: 5px;
                font-size: 1rem;
                color: $color-gray2-2;
            }

            h3 {
                color: $color-gray2-2;
            }
        }

        .v-toolbar__content {
            padding: 24px;
        }

        .v-tabs__items {
            display: flex;
            height: 100%;
        }

        // make tab actions sticky and the rest of the tab content scrollable
        .v-tabs__content {
            .v-card {
                display: flex;
                flex-direction: column;
                height: 100%;

                > .v-card__text {
                    flex-grow: 1;
                    overflow-y: auto;
                    padding: $padding-4;
                }

                > .v-card__actions {
                    flex-shrink: 0;
                    padding: $padding-4;
                }

            }
        }

        &--fullscreen {
            overflow-y: hidden;

            .container {
                max-width: $fullscreen-width;
            }

            .v-toolbar__content,
            .v-toolbar__extension {
                margin: 0 auto;
                width: $fullscreen-width;
            }

            .v-card {
                min-height: auto;
                overflow: hidden;

                > .v-card__text {
                    flex-grow: 1;
                }

                > .v-card__actions {
                    margin: 0 auto;
                    padding: $padding-2;
                    width: $fullscreen-width;
                    flex-grow: 0;
                }
            }

            @media screen and (max-width: $fullscreen-width) {
                .v-toolbar__content,
                .v-card > .v-card__actions,
                .v-stepper__header {
                    width: 100%;
                }
            }
        }

        .v-stepper {
            display: flex;
            height: 100%;
            width: 100%;
            flex-direction: column;

            &__header {
                box-shadow: none;
                margin: 0 auto;
                width: $fullscreen-width;
            }

            &__items {
                height: 100%;
                overflow: hidden;
                position: relative;
            }

            &__content {
                padding: 0;
                height: 100%;
                flex: none;
            }

            &__wrapper {
                height: 100%;

                > .v-card {
                    display: flex;
                    flex-direction: column;
                    height: 100%;

                    > .v-card__text {
                        flex-grow: 1;
                        overflow-y: auto;
                        padding: 24px;
                    }

                    > .v-card__actions {
                        flex-shrink: 0;
                        padding: 24px;
                    }
                }
            }
        }

        .text-truncate{
            line-height: normal!important;
        }
    }
</style>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: { type: Boolean, default: false },
    width: { type: String, default: '900px' },
    title: { type: String, required: true },
    subtitle: { type: String, default: null },
    subtitleExtension: { type: String, default: null },
    tabs: { type: Array, default: () => [] },
    lockHeight: { type: Boolean, default: true },
    fullscreen: { type: Boolean, default: false },
    hasActions: { type: Boolean, default: false },
    isCloseable: { type: Boolean, default: true },
  },

  computed: {
    show: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      },
    },

    transition() {
      return this.fullscreen ? 'dialog-bottom-transition' : 'dialog-transition';
    },
  },

  watch: {
    show: {
      handler(val) {
        if (this.fullscreen && val) {
          document.querySelector('html').classList.add('overflow-y-hidden');
          this.setDialogFocus();
        } else {
          document.querySelector('html').classList.remove('overflow-y-hidden');
        }
      },
      immediate: true,
    },
    value: {
      handler(val) {
        if (!this.fullscreen && val && this.lockHeight) {
          this.lockToCurrentHeight();
        }
      },
      immediate: true,
    },
  },

  methods: {
    close() {
      if (this.$root.$confirm && this.$root.$confirm.dialog === true) {
        this.$root.$confirm.close();
      }
      this.show = false;
      this.$emit('closed');
    },

    confirmClose() {
      const title = 'Dialog schließen?';
      const message = 'Soll der Dialog wirklich geschlossen werden?';
      const options = { closeOnAgree: true };

      this.$root.$confirm.open(title, message, options).then((confirmed) => {
        if (confirmed) {
          this.close();
        } else {
          // set the focus back on the dialog so the key listener can be triggered again
          this.setDialogFocus();
        }
      });
    },

    setDialogFocus() {
      this.$nextTick(() => {
        document.getElementsByClassName('v-dialog__content--active')[0].focus();
      });
    },

    /**
             * detect current height and set it explicitly on the dialog element
             * so that the dialog won't jump when switching tabs
             */
    lockToCurrentHeight() {
      if (!this.lockHeight || this.fullscreen) {
        return;
      }

      const $dialog = this.$refs.dialog.$el.querySelector('.v-dialog__content .v-dialog--active');

      if ($dialog) {
        // wait until lazy loaded content is available (this may take more than one tick)
        setTimeout(() => {
          $dialog.style.height = 'auto';
          $dialog.style.height = `${$dialog.clientHeight}px`;
        }, 100);
      }
    },

    resize() {
      this.lockToCurrentHeight();
    },
  },
};
</script>
