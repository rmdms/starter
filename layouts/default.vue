<template>
  <div>
    <nuxt id="page" />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default
  {
      methods:
      {
          ...mapMutations([
            'controlDevice',
            'controlNavigator',
            'controlAspect',
            'controlLayout'
          ]),
          _initControls() 
          {
            this.controlDevice();
            this.controlNavigator();
            this.controlAspect();
            this.controlLayout();
          },
          _initEvents() 
          {
              window.addEventListener('resize', this._onResize);
              window.addEventListener('scroll', this._onScroll);
          },
          _initUpdate()
          {
              this._onUpdate();
          },
          _removeEvents()
          {
              window.removeEventListener('resize', this._onResize);
              window.removeEventListener('scroll', this._onScroll);
          },
          _removeUpdate()
          {
              window.cancelAnimationFrame(this._onUpdate);
          },
          _onResize() 
          {
              this.$eventBus.$emit('resize');
              this.controlAspect();
              this.controlLayout();
          },
          _onScroll()
          {
              this.$eventBus.$emit('scroll');
          },
          _onUpdate()
          {
              window.requestAnimationFrame(this._onUpdate);
              this.$eventBus.$emit('update');
          }
      },
      mounted()
      {
        this._initControls();
        this._initEvents();
        this._initUpdate();
      },
      destroyed()
      {
        this._removeEvents();
        this._removeUpdate();
      }
  }
</script>

<style lang="scss">
  html {
    font-family: sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  html, body {
    min-height: 100vh;
    overflow-x: hidden;
  }

  .is-loading {
    opacity: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  // - - - - - -

</style>
