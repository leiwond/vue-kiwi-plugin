<template>
    <div>
        <ve-line
            v-if="show"
            :data="data"
            :settings="settings"
            :legend-visible="showLegend"/>
    </div>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: true },
    data: { type: Object, default: () => [] },
    labels: { type: Object, default: () => { /**/ } },
    showLegend: { type: Boolean, default: true },
  },

  data() {
    return {
      settings: {
        lineStyle: {
          color: '#8bc72a',
          width: 3,
        },
        itemStyle: {
          color: '#5e9f06',
        },
        labelMap: this.labels,
      },
    };
  },
};
</script>
