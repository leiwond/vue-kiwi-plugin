<template>
    <v-app>
        <v-main>
            <v-container fluid align-center justify-center fill-height>
                <slot />
            </v-container>
        </v-main>

        <ui-snackbar ref="snackbar"/>
    </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',

  mounted() {
    this.$root.$snackbar = this.$refs.snackbar;
  },
};
</script>
