<template>
  <div style="height: 100vh; position: relative">
    <n-layout position="absolute">
      <n-layout-header bordered style="height: 64px; padding: 24px">
        Kirby Assistant</n-layout-header
      >
      <n-layout has-sider position="absolute">
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :show-collapsed-content="false"
          :collapsed-width="64"
          :width="240"
        >
          <n-menu
            v-if="!inverted"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuList"
          />
        </n-layout-sider>
        <n-layout bordered content-style="padding: 24px;"> 平山道 </n-layout>
      </n-layout>
      <n-layout-footer
        bordered
        position="absolute"
        style="height: 64px; padding: 24px"
      >
        城府路
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Api } from '@/utils/net'
import {
  useMessage,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutSider,
  NLayoutFooter,
  NMenu,
  MenuOption,
} from 'naive-ui'
import { ConsoleResponse } from '@/types/console-response'

export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutSider,
    NLayoutFooter,
    NMenu,
  },
  setup() {
    let menuList: MenuOption[] = []
    Api.getConsoleList().then((res) => {
      let consoleList: { label: string; key: string }[] = []

      res.forEach((item) => {
        consoleList.push({
          label: item.title,
          key: item.tag,
        })
      })
      menuList.push({
        label: '游戏',
        key: 'game',
        children: consoleList,
      })
    })

    let message = useMessage()

    // 侧边菜单
    // let menuList: MenuOption[] = [
    //   {
    //     label: '游戏',
    //     key: 'game',
    //     children: [
    //       {
    //         label: '游戏列表',
    //         key: 'game-list',
    //       },
    //       {
    //         label: '游戏详情',
    //         key: 'game-detail',
    //       },
    //     ],
    //   },
    // ]

    let consoleList = ref(Array<ConsoleResponse>())

    function getConsoleList() {}

    return {
      inverted: ref(false),
      consoleList,
      getConsoleList,
      menuList,
    }
  },
})
</script>
