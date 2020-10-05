<template>
    <div class="autocomplete">
        <v-combobox
            v-if="show && !strict"
            v-model="val"
            :items="items"
            :loading="loading"
            :search-input.sync="search"
            hide-no-data
            item-text="label"
            item-value="value"
            return-object
            v-bind="$attrs"
            @keyup.enter="submit"
            :name="name">
            <template slot="item" slot-scope="props">
                <v-list-tile-content>
                    <v-list-tile-title
                        :class="{ 'font-weight-black' : props.item.highlighted }">
                        {{ props.item.label }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </template>
        </v-combobox>
        <v-autocomplete
            v-if="show && strict"
            v-model="val"
            :items="items"
            :loading="loading"
            :search-input.sync="search"
            hide-no-data
            item-text="label"
            item-value="value"
            :messages="infoMessage"
            return-object
            v-bind="$attrs"
            @keyup.enter="submit"
            @change="change"
            :name="name"/>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    .v-autocomplete__content .v-list .v-list__tile:hover {
        background-color: $color-gray5 !important;

        .v-list__tile__title {
            color: $color-gray1;
        }
    }
</style>

<script>
import Vue from 'vue';
import debounce from 'lodash/debounce';
// TODO
// import AutocompleteService from 'services/AutocompleteService';

export default {
  inheritAttrs: false,

  props: {
    strict: { type: Boolean, default: false },
    name: { type: String, default: 'autocomplete-input' },
    clearOnSelect: { type: Boolean, default: false },
    defaultItems: { type: Array, default: () => [] }, // will be displayed until input is entered
    minInputLength: { type: Number, default: 3 },
    resource: { type: String, required: true }, // 'companies', 'locations'
    validator: { type: Object, default: null },
    value: { type: String, default: '' },
    noResultsInfo: { type: Boolean, default: true },
  },

  data() {
    return {
      descriptionLimit: 60,
      entries: this.defaultItems,
      loading: false,
      search: this.value,
      val: this.value,
      show: true,
    };
  },

  computed: {
    items() {
      return this.entries.map((entry) => {
        const label = entry.label.length > this.descriptionLimit
          ? `${entry.label.slice(0, this.descriptionLimit)}...`
          : entry.label;

        return { ...entry, label };
      });
    },

    infoMessage() {
      return this.hasNoResults ? 'Keine Einträge gefunden' : '';
    },

    hasNoResults() {
      return this.noResultsInfo && this.search && this.entries.length === 0;
    },
  },

  watch: {
    value(value) {
      if (value) {
        this.val = value;
      } else {
        this.entries = this.defaultItems;
      }
    },

    search(val, oldVal) {
      if (val) {
        this.autocomplete();
      }

      if ((val !== null && oldVal !== '')) {
        this.$emit('input', val);
      }
    },

    defaultItems(val) {
      this.entries = val;
    },

    val(val) {
      if (val && typeof val === 'object') {
        if (this.clearOnSelect) {
          this.reset();
        }

        this.$nextTick(() => {
          this.$emit('select', val);
        });
      }
    },
  },

  methods: {
    autocomplete: debounce(async function () {
      if (!this.search || this.search.length < this.minInputLength) {
        return;
      }

      this.loading = true;

      const filter = {
        term: this.search,
      };

      // TODO
      // this.entries = await AutocompleteService.search(this.resource, filter);

      this.loading = false;
    }, 300),

    submit() {
      this.$emit('submit', this.search);
    },

    change(val) {
      this.$emit('change', val);
      this.reset();
    },

    reset() {
      this.val = '';
      this.search = '';
      this.entries = this.defaultItems;

      // this is a dirty hack to reset the v-combobox component by destroying/re-creating it
      this.show = false;
      Vue.nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
