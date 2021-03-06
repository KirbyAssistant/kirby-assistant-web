<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutFooter,
  NTag,
  NIcon,
  NPopover,
  NScrollbar,
} from 'naive-ui'
import Menu from '@/components/menu.vue'
import GameCard from '@/components/game-card.vue'
import emitter from '@/utils/emitter'
import { Api } from '@/utils/net'
import { GameResponse } from '@/types/game-response'
import { Menu as MenuIcon } from '@vicons/ionicons5'

let gameListData = ref(Array<GameResponse>())
let hide = ref(false)
let liteMenu = ref(false)

let pop = ref<any>(null)

emitter.on('menuItem', async (val) => {
  gameListData.value = await getGameData(val)
})

async function getGameData(type: string) {
  return Api.getGameData(type)
}

onMounted(() => {
  size()
  window.onresize = () => {
    size()
  }
  document.onclick = (e) => {
    if (e!.target != document.getElementById('bar-menu')) {
      liteMenu.value = false
      console.log('hide')
    }
  }
})

function size() {
  if (document.body.clientWidth < 768) {
    emitter.emit('hideSidebar', true)
  } else {
    emitter.emit('hideSidebar', false)
  }
}

emitter.on('hideSidebar', (val) => {
  hide.value = val
})
</script>

<template>
  <div style="height: 100vh; position: relative">
    <n-layout position="absolute">
      <n-layout-header bordered style="height: 64px; padding: 24px">
        <div id="title_div">
          <n-tag id="title" checkable>Kirby Assistant</n-tag>
          <n-popover
            v-if="hide"
            ref="pop"
            placement="bottom"
            trigger="click"
            :show="liteMenu"
            :width="240"
          >
            <template #trigger>
              <i
                id="bar-menu"
                class="fa-solid fa-bars"
                @click="liteMenu = !liteMenu"
              ></i>
            </template>
            <n-scrollbar style="max-height: 60vh">
              <Menu />
            </n-scrollbar>
          </n-popover>
        </div>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
        <n-layout-sider
          v-if="!hide"
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
        >
          <Menu />
        </n-layout-sider>
        <n-layout bordered content-style="padding: 24px;">
          <div id="games">
            <game-card
              v-for="(item, index) in gameListData"
              :key="index"
              :title="item.title"
              :imageUrl="item.image"
              :download-link="item.download_link"
            />
          </div>
        </n-layout>
      </n-layout>
      <n-layout-footer
        bordered
        position="absolute"
        style="height: 64px; padding: 24px"
      >
        Copyright © 2022 <a href="https://imyan.ren">炎忍</a>
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<style scoped>
#title {
  font-size: 2rem;
  font-weight: bold;
}

#title_div {
  display: flex;
  justify-content: center;
}

#games {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
  #title_div {
    justify-content: space-between;
  }
  #games {
    justify-content: center;
  }
}
a {
  color: inherit;
  text-decoration: underline wavy;
}
</style>
