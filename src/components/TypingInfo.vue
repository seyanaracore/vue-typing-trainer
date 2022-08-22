<template>
  <div class="infoBlock">
    <p>
      Ошибок: <span>{{ errorsCount }}</span>
    </p>
    <p>
      Точность: <span>{{ accuracy }}%</span>
    </p>
    <p>
      Знаков в минуту: <span>{{ charsPerMinute }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    errorsCount: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    charsPerMinute: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.infoBlock {
  display: flex;

  & > p {
    margin-bottom: 0;
  }

  & > p:not(:last-child) {
    margin-right: 1rem;
  }
}
</style>
