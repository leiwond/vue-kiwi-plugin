<template>
    <v-tooltip bottom>
        <v-icon
            :color="companyStateColor"
            small
            slot="activator">icon-state</v-icon>
        <span>{{ companyStateLabel }}</span>
    </v-tooltip>
</template>

<script>
export default {
  props: {
    salesState: { type: String, required: true },
  },

  computed: {
    companyStateColor() {
      switch (this.salesState) {
        case 'active':
        case 'active-new-customer':
        case 'active-existing-customer':
          return 'primary';
        case 'passive':
        case 'not':
          return 'grey lighten-1';
        case 'ex':
          return 'error';
        default:
          return 'grey lighten-1';
      }
    },

    companyStateLabel() {
      switch (this.salesState) {
        case 'active':
          return 'Aktiv';
        case 'active-new-customer':
          return 'Aktiv (Neukunde)';
        case 'active-existing-customer':
          return 'Aktiv (Bestandskunde)';
        case 'passive':
          return 'Passiv';
        case 'ex':
          return 'Ex-Kunde';
        case 'not':
          return 'Nicht Kunde';
        default:
          return 'Noch kein Status festgelegt';
      }
    },
  },
};
</script>
