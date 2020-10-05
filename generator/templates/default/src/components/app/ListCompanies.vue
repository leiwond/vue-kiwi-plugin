<template>

  <default-layout>
    <h1>Firmen</h1>

    <v-data-table
      :headers="headers"
      :items="companies"
      :loading="companiesLoading"
      :server-items-length="totalItemLength"
      :options.sync="options"
      :footer-props="{'items-per-page-options': [10, 30, 100]}"
      loading-text="Lade Ergebnisse..."
      no-data-text="Keine Ergebnisse gefunden!">
    </v-data-table>
    <v-btn @click="$router.push('companies/new')">Neue Firma anlegen</v-btn>
  </default-layout>
</template>

<script>

import Company from '@/models/Company';
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import moment from 'moment';

export default {
  name: 'ListCompanies',
  components: { DefaultLayout },
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'attributes.fullName' },
        { text: 'Website', value: 'attributes.website' },
      ],
      companies: [],
      companiesLoading: false,
      footerProps: { 'items-per-page-options': [10, 30, 100] },
      options: {},
      totalItemLength: -1,
      filters: {
        internalUserId: null,
        dates: [moment().subtract(2, 'weeks').toISOString(), moment().toISOString()],
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
  mounted() {
    console.log('mounted', process.env);
  },
  methods: {
    async loadCompanies() {
      this.companiesLoading = true;
      try {
        const result = await Company
          .orderBy('-id')
          .page(this.options.page)
          .limit(this.options.itemsPerPage)
          .get();

        this.companies = result.data;
      } catch (error) {
        // TODO
      }

      this.companiesLoading = false;
    },
  },
};
</script>
