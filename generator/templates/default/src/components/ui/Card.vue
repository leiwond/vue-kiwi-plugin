<template>
    <v-card flat data-qa="card">
        <v-toolbar v-if="showToolbar" color="white" class="pt-4" card>
            <v-toolbar-title class="pt-2" data-qa="toolbar title">
                <v-icon v-if="prependIcon" size="big">{{ prependIcon }}</v-icon>
                {{ cardTitle }}
                <span>{{ cardSubtitle }}</span>
            </v-toolbar-title>

            <v-spacer/>

            <slot name="toolbar-action" />
        </v-toolbar>

        <v-card-text class="px-4 py-0">
            <slot name="filters"/>
        </v-card-text>

        <v-card-text :class="cssClasses">
            <slot />
        </v-card-text>

        <v-card-actions v-if="hasActions" class="px-4 pb-4">
            <v-spacer/>
            <slot name="actions"/>
        </v-card-actions>
    </v-card>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    // draw upper edge of toolbar-title and toolbar-action to one level
    .v-toolbar__title {
        align-self: flex-start;
        overflow: visible;
    }
</style>

<script>
export default {
  props: {
    cardTitle: { type: String, default: '' },
    cardSubtitle: { type: String, default: '' },
    prependIcon: { type: String, default: '' },
    hasActions: { type: Boolean, default: false },
    hasNoPadding: { type: Boolean, default: false },
  },

  computed: {
    showToolbar() {
      return this.cardTitle || this.cardSubtitle || !!this.$slots['toolbar-action'];
    },

    cssClasses() {
      return this.hasNoPadding ? 'px-0' : 'px-4';
    },
  },
};
</script>
