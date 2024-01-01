import { Component, For, createEffect, createSignal } from 'solid-js'
import './index.less'
import { usePlatform } from '@/platform'
import { platformList } from '@/api'

const PlatformList: Component = () => {
  const [platformsData] = platformList()

  const [selectedIndex, setSelectedIndex] = createSignal(0)
  const { setPlatform } = usePlatform()

  createEffect(() => {
    const first = platformsData()?.at(0)
    if (first) {
      setPlatform(first.tag)
    }
  })

  return (
    <>
      <div class="platform-list">
        <For each={platformsData()}>
          {(platform, index) => (
            <p
              class="platform"
              classList={{ select: index() === selectedIndex() }}
              onClick={() => {
                setSelectedIndex(index())
                setPlatform(platform.tag)
              }}
            >
              {platform.title}
            </p>
          )}
        </For>
      </div>
    </>
  )
}

export default PlatformList
