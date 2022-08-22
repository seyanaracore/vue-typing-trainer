<template>
  <div>
    <hr />
    <h4>Предыдущие результаты:</h4>
    <div v-if="historyList.length">
      <table class="table">
        <thead>
          <tr>
            <td class="textCol">Текст</td>
            <td>Точность</td>
            <td>Знаков в минуту</td>
            <td>Ошибок</td>
            <td />
          </tr>
        </thead>
        <tbody>
          <tr v-for="textItem in historyList" :key="textItem.id">
            <td class="textCol">{{ textItem.text }}</td>
            <td>{{ textItem.accuracy }}%</td>
            <td>{{ textItem.charsPerMinute }}</td>
            <td>{{ textItem.errorsCount }}</td>
            <td>
              <Button
                colorType="btn-danger"
                class="removeBtn"
                @onClick="() => deleteHistoryRecord(textItem)"
              >
                X
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <Button @onClick="clearHistory" colorType="btn-danger">Удалить всё</Button>
    </div>
    <h4 v-else class="text-center">Список пуст...</h4>
  </div>
</template>

<script>
import Button from './UI/UiButton.vue'

export default {
  components: { Button },
  props: {
    historyList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    deleteHistoryRecord(item) {
      this.$emit('deleteRecords', item)
    },
    clearHistory() {
      this.$emit('deleteRecords', 'all')
    },
  },
}
</script>

<style lang="scss" scoped>
.textCol {
  width: 600px;
}
.removeBtn {
  padding: 5px 10px !important;

  font-size: 10px !important;
}
</style>
