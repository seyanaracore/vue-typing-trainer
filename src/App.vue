<template>
  <div id="app"></div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'App',
  components: {},
  data() {
    return {
      textForTyping: '',
      fetchError: false,
      isLoading: false,
      typingTextsHistoryList: [],
    }
  },
  methods: {
    async fetchText() {
      this.isLoading = true
      try {
        const response = await getText()
        const [text] = response
        this.textForTyping = text
      } catch (e) {
        this.fetchError = true
      }
      this.isLoading = false
    },
  created() {
    this.fetchText()
  },
}
</script>

<style></style>
