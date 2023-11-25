import { Component, createSignal } from 'solid-js'
import './App.less'
import EmulatorCard from './components/emulator-card/emulator-card'
import PlatformList from './components/platform-list/platform-list'
import GameList from './components/game-list/game-list'

const App: Component = () => {
  const [platform, setPlatform] = createSignal('')

  return (
    <>
      <p class="header">Kirby Assistant</p>
      <PlatformList onPlatformChange={setPlatform} />
      <GameList platform={platform()} />
      <EmulatorCard />
      <footer>
        <p>
          ©2017-2023 <span>炎忍</span>
        </p>
      </footer>
    </>
  )
}

export default App
