<template>
  <div id="app">
    <div class="appContainer">
      <header>
        <h1>Тренажёр печати</h1>
      </header>
      <div v-if="isLoading" class="loaderContainer">
        <loader />
      </div>
      <div v-else-if="fetchError">
        <h3 class="text-danger py-2">Произошла ошибка...</h3>
        <Button @onClick="fetchText">Попробовать снова</Button>
      </div>
      <typing-trainer-container
        v-else
        :textForTyping="textForTyping"
        @handleFinishTyping="handleFinishTyping"
        @newText="fetchText"
        @removeTypingHistory="removeTypingHistory"
      />
      <texts-history :historyList="typingTextsHistoryList" @deleteRecords="removeTypingHistory" />
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import LocalStorageUtil from './utils/localStorageUtil'
import getText from './api/getText'
import Loader from './components/UI/UiLoader.vue'
import TypingTrainerContainer from './components/TypingTrainerContainer.vue'
import TextsHistory from './components/TextsHistory.vue'
import Button from './components/UI/UiButton.vue'
import { LOCAL_TYPING_RESULTS_KEY } from './constants'

export default {
  name: 'App',
  components: { Loader, TypingTrainerContainer, TextsHistory, Button },

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
        // eslint-disable-next-line no-unsafe-optional-chaining
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

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;

  min-width: 800px;
  min-height: 100vh;
  padding: 0 12px;

  background: rgb(180 180 182);
  background: linear-gradient(
    90deg,
    rgb(180 180 182 / 100%) 0%,
    rgb(22 129 122 / 100%) 56%,
    rgb(60 133 99 / 100%) 100%
  );
}

.appContainer {
  width: 100%;
  max-width: 1200px;
  margin: 100px auto 12px;
  padding: 24px;

  background-color: white;
  border: 1px solid #73ccfb;
  border-radius: 25px;
  box-shadow: rgb(60 64 67 / 30%) 0 1px 2px 0, rgb(60 64 67 / 15%) 0 2px 6px 2px;
}

.loaderContainer {
  width: 100%;

  text-align: center;
}
</style>
