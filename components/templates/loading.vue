<template lang="html">
  <div v-if="loading" class="loading-page">
    <p>Loading...</p>
  </div>
</template>

<script>  
import { mapMutations } from 'vuex'
export default {
  data: () => ({
    loading: false
  }),
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 3000)
    })
  },
  methods: {
    ...mapMutations([
      'setLoading'
    ]),
    start() {
      this.setLoading(true);
      this.loading = true
    },
    finish() {
      this.setLoading(false);
      setTimeout(() => this.loading = false, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  z-index: 99;
  &.remove {
    opacity: 0;
    transition: opacity 1s linear;
    p {
      display: none;
    }
  }
}
</style>
