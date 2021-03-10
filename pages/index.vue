<template>
  <main class="p-home">
  </main>
</template>

<script>

  export default 
  {
    async asyncData(context) 
    {
      return await context.$api.get(context.route.name);
    },
    async mounted() {
      if(this.$root.$options.context.isStatic
      && typeof this.$root.$options.context.from == 'undefined'
      && typeof this.$options.asyncData == "function") {
          this.$data.api = await this.$options.asyncData(this.$root.$options.context);
          this.$data.api = this.$data.api.api;
      }
    }
  }
</script>

<style lang="scss">
  .p-home 
  {
  }
</style>
