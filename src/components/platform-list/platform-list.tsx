import { get } from '@/net'
import {
  Component,
  For,
  createEffect,
  createResource,
  createSignal,
} from 'solid-js'
import './index.less'

interface Platform {
  title: string
  tag: string
}

interface Props {
  onPlatformChange: (platform: string) => void
}

const PlatformList: Component<Props> = (props) => {
  const [platformsData] = createResource(() =>
    get<Array<Platform>>('/data/console.json'),
  )
  const [selectedIndex, setSelectedIndex] = createSignal(0)

  createEffect(() => {
    const first = platformsData()?.at(0)
    if (first) {
      props.onPlatformChange(first.tag)
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
                props.onPlatformChange(platform.tag)
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
