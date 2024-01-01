import { Component, createSignal } from 'solid-js'
import './App.less'
import EmulatorCard from './components/emulator-card/emulator-card'
import PlatformList from './components/platform-list/platform-list'
import GameList from './components/game-list/game-list'
import { PlatformProvider } from './platform'

const App: Component = () => {
  return (
    <>
      <div class="app">
        <p class="header">Kirby Assistant</p>
        <PlatformProvider>
          <PlatformList />
          <GameList />
        </PlatformProvider>
        <EmulatorCard />
        <footer>
          <p>
            ©2017-2023 <span>炎忍</span>
          </p>
        </footer>
      </div>
    </>
  )
}

export default App
