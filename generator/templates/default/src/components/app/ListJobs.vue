<template>

  <default-layout>
    <h1>Jobs</h1>

    <v-data-table
      :headers="headers"
      :items="jobs"
      :loading="loading"
      :server-items-length="totalItemLength"
      :options.sync="options"
      :footer-props="{'items-per-page-options': [10, 30, 100]}"
      loading-text="Lade Ergebnisse..."
      no-data-text="Keine Ergebnisse gefunden!
      >

      <template v-slot:item.attributes.dates.created="{ item }">
        {{ new Date(item.attributes.dates.created) }}
      </template>

    </v-data-table>
  </default-layout>
</template>

<script>

import Job from '@/models/Job';
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import moment from 'moment';

export default {
  name: 'ListCompanies',
  components: { DefaultLayout },
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Title', value: 'attributes.title' },
        { text: 'Created', value: 'attributes.dates.created' },
      ],
      jobs: [],
      loading: false,
      footerProps: { 'items-per-page-options': [10, 30, 100] },
      options: {},
      totalItemLength: 0,
      filters: {
        dates: [moment().subtract(2, 'weeks').toISOString(), moment().toISOString()],
      },
    };
  },
  watch: {
    options: {
      handler() {
        this.loadJobs();
      },
      deep: true,
    },
  },
  methods: {
    async loadJobs() {
      this.loading = true;
      try {
        const result = await Job
          .orderBy(this.options.sortBy)
          .page(this.options.page)
          .limit(this.options.itemsPerPage)
          .get();
        this.totalItemLength = result.meta.pagination.total;
        this.jobs = result.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
