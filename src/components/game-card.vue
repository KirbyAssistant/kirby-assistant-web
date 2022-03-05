<script lang="ts" setup>
import { ref } from '@vue/runtime-dom'
import { NCard, NImage, NModal, NButton, NSpace } from 'naive-ui'

defineProps({
  title: String,
  imageUrl: String,
  downloadLink: Map,
})

let showDownload = ref(false)
let bodyStyle = {
  width: '600px',
}
let segmented = {
  content: 'soft',
  footer: 'soft',
} as const

function getName(type: any) {
  switch (type) {
    case 'jp':
      return '日版'
    case 'us':
      return '美版'
    case 'cn':
      return '中文版'
    default:
      return type
  }
}

function openLink(link: any) {
  window.open(link, '_blank')
}
</script>

<template>
  <n-card hoverable @click="showDownload = true">
    {{ title }}
    <n-image :src="imageUrl" :width="180" preview-disabled></n-image>
  </n-card>
  <n-modal
    v-model:show="showDownload"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="请选项版本"
    size="huge"
    :bordered="false"
    :segmented="segmented"
  >
    <n-space>
      <n-button
        v-for="(value, name, index) in downloadLink"
        :key="index"
        @click="openLink(value)"
        type="primary"
        style="min-width: 50%"
        >{{ getName(name) }}</n-button
      >
    </n-space>
  </n-modal>
</template>

<style scoped>
.n-card {
  max-width: 15rem;
  margin: 2rem;
}
</style>
