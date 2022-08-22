<template>
  <button class="btn" type="button" :class="colorType" @click="clickHandler">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'button-ui',

  props: {
    colorType: {
      type: String,
      default: 'btn-primary',
    },
  },

  methods: {
    clickHandler() {
      this.$emit('onClick')
    },
  },
}
</script>
