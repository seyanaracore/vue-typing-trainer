<template>
  <div class="controlButtonsContainer">
    <Button @onClick="newTextHandler">Новый текст</Button>
    <Button @onClick="resetProgressHandler" colorType="btn-warning">Сброс</Button>
  </div>
</template>

<script>
import Button from './UI/UiButton.vue'

export default {
  components: { Button },

  methods: {
    newTextHandler() {
      this.$emit('newText')
    },
    resetProgressHandler() {
      this.$emit('resetProgress')
    },
  },
}
</script>

<style scoped>
.controlButtonsContainer *:not(:first-child) {
  margin-left: 20px;
}
</style>
