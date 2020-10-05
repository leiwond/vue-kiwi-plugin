<template>
    <v-list dense>
      <v-list-item-group
        v-model="item"
        color="primary"
      >
        <v-divider/>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>

    </v-list>
</template>

<script>
import AccessRightsMixin from '../util/mixins/AccessRightsMixin';

export default {
  data: () => ({
    item: 1,
    items: [
      { text: 'Jobs', to: 'jobs', icon: 'mdi-account-multiple' },
      { text: 'Firmen', to: 'companies', icon: 'mdi-flag' },
    ],
  }),
  /*
        computed: {
            items() {
                return [
                    {
                        icon: 'icon-dashboard',
                        text: 'Dashboard',
                        to: '/',
                        userGroups: this.allUserGroups
                    }
                ];
            }
        }, */

  mixins: [
    AccessRightsMixin,
  ],
};
</script>
