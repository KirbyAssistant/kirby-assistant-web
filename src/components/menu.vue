<script lang="ts" setup>
import { ref, onMounted, watch, Component, h } from 'vue'
import { Api } from '@/utils/net'
import { MenuOption, NIcon, NMenu } from 'naive-ui'
import emitter from '@/utils/emitter'
import { EmulatorResponse } from '@/types/emulator-response'
import { GameControllerOutline as Game, Apps as Emus } from '@vicons/ionicons5'
import global from '@/global'

let menuList = ref(Array<any>())

let currItem = ref(global.menuItem)
let lastItem = ref('gba')

let originalConsoleList = ref(Array<EmulatorResponse>())

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

onMounted(async () => {
  menuList.value.push(...(await getGameMenu()))
  menuList.value.push(...(await getEmuMenu()))
})

function getGameMenu(): Promise<MenuOption[]> {
  return new Promise(async (resolve) => {
    let temp = Array<MenuOption>()

    let consoleList: { label: string; key: string }[] = []
    let originalConsoleList = await Api.getConsoleList()
    originalConsoleList.forEach((item) => {
      consoleList.push({
        label: item.title,
        key: item.tag,
      })
    })

    temp.push({
      label: '游戏',
      key: 'game',
      children: consoleList,
      icon: renderIcon(Game),
    })
    emitter.emit('menuItem', global.menuItem)
    resolve(temp)
  })
}

function getEmuMenu(): Promise<MenuOption[]> {
  return new Promise(async (resolve) => {
    let temp = Array<MenuOption>()

    let emuList: { label: string; key: string; disabled: boolean }[] = []
    originalConsoleList.value.push(...(await Api.getEmuList()))

    originalConsoleList.value.forEach((item) => {
      emuList.push({
        label: item.title,
        key: item.type,
        disabled: false,
      })
    })

    emuList[2].disabled = true
    temp.push({
      label: '模拟器',
      key: 'emu',
      children: emuList,
      icon: renderIcon(Emus),
    })
    resolve(temp)
  })
}

watch(currItem, (val) => {
  global.menuItem = val
  emitter.emit('closeMenu', true)
  emitter.emit('menuItem', val)
})

emitter.on('menuItem', (val) => {
  switch (val) {
    case 'phone':
      currItem.value = lastItem.value
      window.open(originalConsoleList.value[0].link, '_blank')
      break
    case 'windows':
      currItem.value = lastItem.value
      window.open(originalConsoleList.value[1].link, '_blank')
    default:
      lastItem.value = val
  }
})
</script>

<template>
  <n-menu
    :default-expanded-keys="['game']"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuList"
    v-model:value="currItem"
  />
</template>
