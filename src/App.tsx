import './App.scss'

function App() {
  return (
    <>
      <Header />
      <div class="app">
        <ConsoleTabsAndGameList />
        <EmulatorCard />
      </div>
      <Footer />
    </>
  )
}

const Header = () => {
  return (
    <>
      <div class="header">
        <p>Kirby Assistant</p>
      </div>
    </>
  )
}

const Footer = () => {
  return (
    <>
      <footer>
        <p>
          ©2017-2022 <span>炎忍</span>
        </p>
      </footer>
    </>
  )
}

const ConsoleTabsAndGameList = () => {
  type Console = {
    title: string
    tag: string
  }

  const [consoleData, setConsoleData] = createSignal<Array<Console>>([])
  const [selectedConsole, setSelectedConsole] = createSignal('')

  createEffect(async () => {
    const data = await fetch('/data/console.json')
    setConsoleData(await data.json())
    setSelectedConsole(consoleData()[0].tag)
  })

  const getVersionName = (version: string) => {
    switch (version) {
      case 'jp':
        return '日版'
      case 'us':
        return '美版'
      case 'cn':
        return '汉化版'
      default:
        return version
    }
  }

  const Tabs = () => {
    return (
      <>
        <div class="tabs">
          <For each={consoleData()}>
            {(console) => (
              <p
                onClick={() => setSelectedConsole(console.tag)}
                class="tab"
                classList={{ select: selectedConsole() === console.tag }}
              >
                {console.title}
              </p>
            )}
          </For>
        </div>
      </>
    )
  }

  const Games = () => {
    type Game = {
      title: string
      image: string
      tag: string
      download_link: any
    }
    const [gameData, setGameData] = createSignal<Array<Game>>([])
    createEffect(async () => {
      const data = await fetch(`/data/console/${selectedConsole()}.json`)
      setGameData(await data.json())
    })

    return (
      <>
        <div class="games">
          <For each={gameData()}>
            {(game) => (
              <div class="game">
                <p class="title">{game.title}</p>
                <img src={game.image} alt={game.title} />
                <div class="versions">
                  {Object.keys(game.download_link).map((version, index) => {
                    return (
                      <>
                        <a
                          href={
                            Object.values(game.download_link)[index] as string
                          }
                          target="_blank"
                          class="version"
                        >
                          {getVersionName(version)}
                        </a>
                      </>
                    )
                  })}
                </div>
              </div>
            )}
          </For>
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        <Tabs />
        <Games />
      </div>
    </>
  )
}

const EmulatorCard = () => {
  type Emulator = {
    type: string
    title: string
    link: string
  }

  const [hide, setHide] = createSignal(false)
  const [emuData, setEmuData] = createSignal<Array<Emulator>>([])

  createEffect(async () => {
    const data = await fetch('/data/emulator.json')
    const dataJson = await data.json()
    setEmuData(dataJson.slice(0, 2))
  })

  return (
    <>
      <div class="emulator-card" classList={{ hide: hide() }}>
        <div class="content">
          <p class="title">
            提取密码均为 <b>kirby</b>
          </p>
          <For each={emuData()}>
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
              <i class="fa-solid fa-xmark"></i>
            </Match>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default App
