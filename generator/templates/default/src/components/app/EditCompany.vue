<template>

  <default-layout>
    <v-text-field v-model="company['full-name']" label="Firmenname"></v-text-field>
    <v-btn @click="save">Speichern</v-btn>
  </default-layout>
</template>

<script>

import Company from '@/models/Company';
import DefaultLayout from '@/components/layout/DefaultLayout.vue';

export default {
  name: 'EditCompany',
  components: { DefaultLayout },
  data() {
    return {
      company: {
        'full-name': '',
      },
    };
  },
  watch: {
    options: {
      handler() {
        this.loadCompanies();
      },
      deep: true,
    },
  },
  methods: {
    async save() {
      try {
        const company = new Company(
          {
            data: {
              type: 'company',
              attributes: this.company,
            },
          },
        );
        await company.save();
      } catch (error) {
        // TODO
      }
    },
  },
};
</script>
