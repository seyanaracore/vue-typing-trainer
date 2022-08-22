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
    saveTypingResult(typeResult) {
      const typeResultWithId = {
        ...typeResult,
        id: this.typingTextsHistoryList.at(-1)?.id + 1 || 1,
      }

      LocalStorageUtil.set(
        [...this.typingTextsHistoryList, typeResultWithId],
        LOCAL_TYPING_RESULTS_KEY
      )
      this.getTypingsHistory()
    },
    getTypingsHistory() {
      const historyList = LocalStorageUtil.get(LOCAL_TYPING_RESULTS_KEY) || []
      this.typingTextsHistoryList = historyList
    },
    removeTypingHistory(record) {
      if (!record) return

      if (record === 'all') {
        LocalStorageUtil.delete(LOCAL_TYPING_RESULTS_KEY)
      } else {
        const filteredHistory = this.typingTextsHistoryList.filter((text) => text.id !== record.id)
        this.typingTextsHistoryList = filteredHistory

        LocalStorageUtil.set(filteredHistory, LOCAL_TYPING_RESULTS_KEY)
      }

      this.getTypingsHistory()
    },
    handleFinishTyping(typingResult) {
      this.saveTypingResult(typingResult)
      this.fetchText()
    },
  },
  created() {
    this.fetchText()
    this.getTypingsHistory()
  },
}
</script>

<style></style>
