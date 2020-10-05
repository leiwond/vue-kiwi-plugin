<template>
    <v-dialog v-model="dialog" :max-width="options.width" persistent @keydown.esc="cancel">
        <ui-card :card-title="title" has-actions>
            {{ message }}
            <template slot="actions">
                <v-btn color="primary" @click.native="submit">OK</v-btn>
            </template>
        </ui-card>
    </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      width: null,
    },
  }),

  methods: {
    open(title, message, size = 'small') {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options.width = this.setWidth(size);

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    submit() {
      this.resolve();
      this.dialog = false;
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
