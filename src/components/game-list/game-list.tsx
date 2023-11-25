import { get } from '@/net'
import { Component, For, createEffect, createResource } from 'solid-js'
import './index.less'

interface Game {
  title: string
  image: string
  tag: string
  download_link: any
}

interface Props {
  platform: string
}

const GameCard: Component<Game> = (game) => {
  const versionNameMap = new Map([
    ['jp', '日版'],
    ['us', '美版'],
    ['cn', '汉化版'],
  ])

  const versionName = (version: string) =>
    versionNameMap.get(version) || version

  return (
    <>
      <div class="game-card">
        <p class="title">{game.title}</p>
        <img src={game.image} alt={game.title} />
        <div class="versions">
          {Object.keys(game.download_link).map((version, index) => {
            return (
              <>
                <a
                  href={Object.values(game.download_link)[index] as string}
                  target="_blank"
                  class="version"
                >
                  {versionName(version)}
                </a>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

const GameList: Component<Props> = (props) => {
  const [gameList, { refetch }] = createResource(() =>
    get<Array<Game>>(`/data/console/${props.platform}.json`),
  )

  createEffect(() => {
    if (props.platform) {
      console.log(props.platform)

      refetch()
    }
  })

  createEffect(() => {
    console.log(gameList())
  })

  return (
    <>
      <div class="game-list">
        <For each={gameList()}>
          {(game) => (
            <GameCard
              title={game.title}
              image={game.image}
              tag={game.tag}
              download_link={game.download_link}
            />
          )}
        </For>
      </div>
    </>
  )
}

export default GameList
