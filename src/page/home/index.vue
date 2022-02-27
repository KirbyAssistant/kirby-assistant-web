<template>
  <h1 @click="getConsoleList">123</h1>
  {{ consoleList[0].tag }}
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Api } from '@/utils/net'
import { useMessage } from 'naive-ui'
import { ConsoleResponse } from '@/types/console-response'

export default defineComponent({
  setup() {
    onMounted(() => {
      Api.getConsoleList().then((res) => {
        consoleList.value = res
      })
    })

    let message = useMessage()

    let consoleList = ref(Array<ConsoleResponse>())

    function getConsoleList() {}

    return {
      consoleList,
      getConsoleList,
    }
  },
})
</script>
