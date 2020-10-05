<template>
  <v-app-bar app scroll-off-screen>
    <v-toolbar
        color="white"
        :tabs="hasTabs"
        :extension-height="extensionHeight"
        flat
        light
        prominent
        extended
        data-qa="topbar">
        <v-toolbar-title class="pl-2">
            {{ pageTitle }} <span>{{ pageSubtitle }}</span>
        </v-toolbar-title>

        <v-tabs
            v-if="hasTabs"
            slot="extension"
            color="transparent"
            slider-color="primary"
            v-model="currentTab">
            <v-tab
                v-for="tab in tabs"
                :key="tab.id"
                :to="{ name: tab.to, params: { id: $route.params.id } }"
                :disabled="!tabsActive">
                {{ tab.title }}
            </v-tab>
        </v-tabs>
    </v-toolbar>
  </v-app-bar>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/styles/config';

    .v-toolbar__title {
        padding-top: $padding-2;

        span {
            color: $color-gray1!important;
            opacity: .7;
        }
    }
</style>

<script>

export default {
  props: {
    pageTitle: { type: String, default: '' },
    pageSubtitle: { type: String, default: '' },
    tabs: { type: Array, default: () => [] },
  },

  computed: {
    hasTabs() {
      return !!this.tabs.length;
    },

    /**
             * Extension height should only be set when there are no tabs
             * in order to fix height problems with modules without tabs.
             */
    extensionHeight() {
      return this.hasTabs ? undefined : 20;
    },
  },
};
</script>
