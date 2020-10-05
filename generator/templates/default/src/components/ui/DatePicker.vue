<template>
    <div>
        <v-menu
            v-model="pickerMenu"
            :disabled="disabled"
            ref="pickerMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="pickerDate"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px">
            <v-text-field
                :value="visibleDate"
                :disabled="disabled"
                slot="activator"
                :label="label"
                prepend-icon="icon-calendar"
                reactive
                readonly
                :clearable="clearable"
                @click:clear="clearValue"
                :error-messages="errorMessages"/>
            <v-date-picker
                v-model="pickerDate"
                @input="input"
                first-day-of-week="1"
                locale="de-de"
                :min="convertDate(min)"
                :max="convertDate(max)"
                v-bind="$attrs"/>
        </v-menu>
    </div>
</template>

<script>
import moment from 'moment';

export default {
  inheritAttrs: false,

  props: {
    label: { type: String, default: '' },
    value: { type: Date, default: () => new Date() },
    min: { type: Date, default: undefined },
    max: { type: Date, default: undefined },
    disabled: { type: Boolean, default: false },
    errorMessages: { type: String, default: null },
    clearable: { type: Boolean, default: false },
  },

  data() {
    return {
      pickerDate: this.convertDate(this.value),
      pickerMenu: false,
    };
  },

  computed: {
    visibleDate() {
      return this.value ? moment(this.value).format('DD.MM.YYYY') : '';
    },
  },

  watch: {
    value() {
      this.pickerDate = this.convertDate(this.value);
    },
  },

  methods: {
    convertDate(date) {
      if (!date) return null;
      return moment(date).format('YYYY-MM-DD');
    },

    input() {
      this.$refs.pickerMenu.save(this.pickerDate);
      this.$emit('input', moment(this.pickerDate).toDate());
    },

    clearValue() {
      this.pickerDate = null;
      this.$emit('input', null);
    },
  },
};
</script>
