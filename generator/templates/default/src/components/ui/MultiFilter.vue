<template>
  <div>
    <div class="chips pb-2 mb-3">
      <v-layout class="filter-headline" @click="toggleOptions">
        <v-flex xl11>Filter</v-flex>
        <v-flex xs1>
          <v-icon>icon-arrow-down</v-icon>
        </v-flex>
      </v-layout>
      <div v-for="optionGroup in options" :key="optionGroup">
        <v-chip
          v-for="(option, index) in optionGroup.options.filter(option => option.checked)"
          :key="(optionGroup.group + '|' + index)"
          v-model="option.checked"
          close>
          {{ option.label }}
        </v-chip>
      </div>
      <v-btn v-if="hasCheckedOptions" @click="removeAll" depressed flat>Alle entfernen</v-btn>
    </div>
    <div v-if="open">
      <div v-for="optionGroup in options" :key="optionGroup">
        <h3>{{ optionGroup.label }}</h3>
        <div v-for="option in optionGroup.options" :key="option">
          <v-checkbox
            v-model="option.checked"
            :label="option.label"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../assets/styles/config';

  .chips {
    border-bottom: 1px solid $color-gray4;
  }

  .filter-headline {
    cursor: pointer;
  }
</style>

<script>
export default {
  props: {
    options: { type: Array, required: true },
  },

  data() {
    return {
      open: false,
    };
  },

  computed: {
    hasCheckedOptions() {
      let hasCheckedOptions = false;

      this.options.forEach((optionGroup) => {
        if (optionGroup.options.find((option) => option.checked)) {
          hasCheckedOptions = true;
        }
      });

      return hasCheckedOptions;
    },
  },

  methods: {
    toggleOptions() {
      this.open = !this.open;
    },

    removeAll() {
      this.options.forEach((optionGroup) => {
        optionGroup.options.forEach((option) => {
          option.checked = false;
        });
      });
    },
  },
};
</script>
