<template>
    <div v-if="loading">
        <div v-if="title">{{ title }}</div>
        <v-progress-linear color="primary" height="2" indeterminate/>
    </div>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, required: true },
    title: { type: String, default: '' },
  },
};
</script>
