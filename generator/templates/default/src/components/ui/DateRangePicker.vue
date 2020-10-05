<template>
    <div>
        <v-menu
            v-model="showMenu"
            :close-on-content-click="false"
            :close-on-click="false">
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="selectedDates"
                    :label="label"
                    readonly
                    v-on="on" />
            </template>
            <v-card>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs6>
                            <v-subheader>Von</v-subheader>
                            <v-date-picker
                                v-model="value.start"
                                no-title
                                :max="value.end"
                            />
                        </v-flex>

                        <v-flex xs6>
                            <v-subheader>Bis</v-subheader>
                            <v-date-picker
                                v-model="value.end"
                                no-title
                                :min="value.start"
                            />
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn flat color="accent" @click="clearDatesFilter">Auswahl löschen</v-btn>
                    <v-btn depressed color="primary" @click="filter">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    label: { type: String, default: '' },
    value: { type: Object, required: true },
  },

  data: () => ({
    showMenu: false,
  }),

  computed: {
    selectedDates() {
      if (!this.value.start && !this.value.end) {
        return null;
      }

      const startDate = this.value.start ? moment(this.value.start).format('DD.MM.YYYY') : '~';
      const endDate = this.value.end ? moment(this.value.end).format('DD.MM.YYYY') : '~';

      return `${startDate} / ${endDate}`;
    },
  },

  methods: {
    clearDatesFilter() {
      this.value.start = null;
      this.value.end = null;
      this.filter();
    },

    show() {
      this.showMenu = true;
    },

    hide() {
      this.showMenu = false;
    },

    filter() {
      this.$emit('filter');
    },
  },
};
</script>
