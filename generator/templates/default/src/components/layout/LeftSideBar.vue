<template>

    <v-navigation-drawer dark fixed app>
        <v-layout column>
            <div class="navigation-header px-3 py-2">
                <div class="navigation-text">
                    <img src="../../assets/images/karriereat_white.svg" alt="karriere.at">
                    <p class="font-weight-thin">Internal Web Interface</p>
                </div>
            </div>
            <environment-badge/>

            <navigation/>

            <v-spacer/>

            <account-info/>
        </v-layout>
    </v-navigation-drawer>
</template>

<script>
import AccountInfo from './AccountInfo.vue';
import Navigation from './Navigation.vue';
import EnvironmentBadge from './EnvironmentBadge.vue';

export default {
  components: {
    AccountInfo,
    Navigation,
    EnvironmentBadge,
  },
};
</script>
