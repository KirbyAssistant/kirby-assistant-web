import { Component, For, createEffect, createResource } from 'solid-js'
import './index.less'
import { usePlatform } from '@/platform'
import { gameList } from '@/api'

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

const GameList: Component = () => {
  const { platform } = usePlatform()
  const [gameListData, { refetch }] = gameList(platform)

  createEffect(() => {
    if (platform()) {
      console.log(platform())

      refetch(platform)
    }
  })

  return (
    <>
      <div class="game-list">
        <For each={gameListData()}>
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
