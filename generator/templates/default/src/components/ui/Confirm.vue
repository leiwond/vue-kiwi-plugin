<template>
    <v-dialog v-model="dialog" :max-width="options.width" persistent @keydown.esc="cancel">
        <v-card data-qa="ui confirm card">
            <v-toolbar dense flat>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
            </v-toolbar>

            <v-card-text class="px-4" v-show="!!message">{{ message }}</v-card-text>

            <v-card-actions class="px-4 pb-4">
                <v-spacer />
                <v-btn
                    flat
                    @click.native="cancel"
                    color="accent"
                    :disabled="pending"
                    data-qa="ui cancel button">
                    {{ options.cancelBtn }}
                </v-btn>
                <v-btn
                    color="primary"
                    @click.native="agree"
                    :loading="pending"
                    :disabled="pending"
                    depressed
                    data-qa="ui confirm button">
                    {{ options.agreeBtn }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .v-dialog .v-toolbar {
        border-bottom: 0;
    }
</style>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      width: 290,
      closeOnAgree: true,
      agreeBtn: 'Ja',
      cancelBtn: 'Nein',
    },
    pending: false,
  }),

  methods: {
    open(title, message, options = {}) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      this.options.width = this.setWidth(options.size);

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    close() {
      // reset all dialog vars to prevent mixed up states
      this.pending = false;
      this.dialog = false;
      this.message = null;
      this.title = null;
      this.options = {
        width: 290,
        closeOnAgree: true,
        agreeBtn: 'Ja',
        cancelBtn: 'Nein',
      };
    },

    agree() {
      this.resolve(true);
      this.pending = true;

      if (this.options.closeOnAgree) {
        this.close();
      }
    },

    cancel() {
      this.resolve(false);
      this.close();
    },

    setWidth(size) {
      switch (size) {
        case 'large':
          return 800;
        case 'medium':
          return 500;
        case 'small':
        default:
          return 290;
      }
    },
  },
};
</script>
