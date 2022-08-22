<template>
  <div>
    <p v-show="isInvalidLayout">Неверная раскладка</p>
    <typing-field
      :textForTyping="textForTyping"
      @inputHandler="handleFieldInput"
      :isInputError="isInputError"
      :expectedCharIndex="expectedCharIndex"
    />
    <aside class="d-flex justify-content-between align-items-center m-2">
      <typing-info
        :errorsCount="errorsCount"
        :accuracy="accuracy"
        :charsPerMinute="charsPerMinute"
      />
      <control-buttons @resetProgress="resetProgress" @newText="newText" />
    </aside>
  </div>
</template>

<script>
import layoutValidator from '@/utils/layoutValidator'
import { EXCEPTIONS_KEYS } from '@/constants'
import TypingField from './TypingField.vue'
import TypingInfo from './TypingInfo.vue'
import ControlButtons from './ControlButtons.vue'

const initialState = {
  errorsCount: 0,
  charsPerSecond: 0,
  charsCountsListPerSecond: [],
  isInputStarted: false,
  isInvalidLayout: false,
  expectedCharIndex: 0,
  isInputError: false,
  cpmInterval: null,
}

export default {
  components: { TypingField, TypingInfo, ControlButtons },

  props: {
    textForTyping: {
      type: String,
      required: true,
      default: '',
    },
  },

  data() {
    return {
      ...initialState,
    }
  },

  computed: {
    charsPerMinute() {
      const keysSummary = this.charsCountsListPerSecond.reduce((a, b) => a + b, 0)

      return Math.floor(keysSummary / this.charsCountsListPerSecond.length) * 60 || 0
    },
    accuracy() {
      const errorsPercent = +((this.errorsCount / this.textForTyping.length) * 100).toFixed(1)

      return 100 - errorsPercent || 100
    },
  },

  methods: {
    newText() {
      this.$emit('newText')
    },
    stopCharsWatcher() {
      clearInterval(this.cpmInterval)
    },
    resetProgress() {
      this.stopCharsWatcher()

      Object.keys(initialState).forEach((key) => {
        this[key] = initialState[key]
      })
    },
    startCharsWatcher() {
      this.cpmInterval = setInterval(() => {
        this.charsCountsListPerSecond = [
          ...this.charsCountsListPerSecond.slice(-59),
          this.charsPerSecond,
        ]
        this.charsPerSecond = 0
      }, 1000)
    },

    handleFieldInput(e) {
      const pressedKey = e.key
      const isExceptionKey = EXCEPTIONS_KEYS.some((avaidingKey) => avaidingKey === pressedKey)

      if (isExceptionKey) return
      if (!this.isInputStarted) this.isInputStarted = true

      if (layoutValidator(pressedKey)) this.isInvalidLayout = false
      else this.isInvalidLayout = true

      const exceptedKey = this.textForTyping[this.expectedCharIndex]

      if (pressedKey === exceptedKey) {
        this.expectedCharIndex += 1
        this.isInputError = false
        this.charsPerSecond += 1
      } else {
        if (this.isInputError) return
        this.errorsCount += 1
        this.isInputError = true
      }
    },
  },

  watch: {
    isInputStarted: {
      handler() {
        if (this.isInputStarted) this.startCharsWatcher()
        else this.stopCharsWatcher()
      },
    },
    expectedCharIndex: {
      handler() {
        if (this.textForTyping.length && this.expectedCharIndex === this.textForTyping.length) {
          const typingResult = {
            text: this.textForTyping,
            accuracy: this.accuracy,
            errorsCount: this.errorsCount,
            charsPerMinute: this.charsPerMinute,
          }

          this.$emit('handleFinishTyping', typingResult)
        }
      },
    },
  },

  beforeUnmount() {
    this.stopCharsWatcher()
  },
}
</script>
