<template>
  <div>
    <section class="hero" :class="`is-${color}`">
      <div class="hero-body">
        <h1 class="title">{{ title }}</h1>
        <h2 class="subtitle" v-if="subTitle">{{ subTitle }}</h2>
      </div>
    </section>
    <div class="header-actions">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderElement',
    props: {
      title: { type: String, required: true },
      subTitle: { type: String },
      color: { type: String, default: () => 'primary' },
    },
  };
</script>

<style>
  .header-actions {
    margin: 5px;
  }
</style>
