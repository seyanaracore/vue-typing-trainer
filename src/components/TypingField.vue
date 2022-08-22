<template>
  <div
    class="inputFieldContainer py-1"
    role="textbox"
    tabIndex="-1"
    @keydown="handleKeyDown"
    ref="inputField"
  >
    <span
      v-for="(char, idx) in textForTyping.split('')"
      :key="idx"
      :class="{
        aviableChar: idx === expectedCharIndex,
        wrongChar: isInputError && idx === expectedCharIndex,
        enteredChar: idx < expectedCharIndex,
      }"
      >{{ char }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    textForTyping: {
      type: String,
      required: true,
    },
    expectedCharIndex: {
      type: Number,
      required: true,
    },
    isInputError: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    handleKeyDown(e) {
      this.$emit('inputHandler', e)
    },
    focusInput() {
      this.$refs.inputField.focus()
    },
  },

  mounted() {
    this.focusInput()
  },
}
</script>

<style lang="scss" scoped>
$error-color: #f36747;

.inputFieldContainer {
  font-size: 20px;
  line-height: 28px;

  &:focus {
    outline: none;
  }
}

.enteredChar {
  color: green;
}

.aviableChar {
  color: white;

  background-color: green;
}

.wrongChar {
  color: white;

  background-color: $error-color;
}
</style>
