import {
  Component,
  For,
  Match,
  Switch,
  createResource,
  createSignal,
} from 'solid-js'

import './index.less'
import { get } from '@/net'

const EmulatorCard: Component = () => {
  type Emulator = {
    type: string
    title: string
    link: string
  }

  const [hide, setHide] = createSignal(true)
  const [emuData] = createResource(() =>
    get<Array<Emulator>>('/data/emulator.json'),
  )

  return (
    <>
      <div class="emulator-card" classList={{ hide: hide() }}>
        <div class="content">
          <p class="title">
            提取密码均为 <b>kirby</b>
          </p>
          <For each={emuData()?.slice(0, 2)}>
            {(emu) => (
              <>
                <a href={emu.link}>{emu.title}</a>
              </>
            )}
          </For>
        </div>
        <div
          class="switcher"
          classList={{ close: !hide() }}
          onClick={() => setHide(!hide())}
        >
          <Switch>
            <Match when={hide()}>
              <p>
                需要模拟器？
                <br />
                点我
              </p>
            </Match>
            <Match when={!hide()}>
              <i class="i-material-symbols:close"></i>
            </Match>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default EmulatorCard
