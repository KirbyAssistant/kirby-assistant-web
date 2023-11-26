import {
  ParentComponent,
  createContext,
  createSignal,
  useContext,
} from 'solid-js'

const usePlatformValue = () => {
  const [platform, setPlatform] = createSignal('')
  return {
    platform,
    setPlatform,
  }
}

export type ContextType = ReturnType<typeof usePlatformValue>

const PlatformContext = createContext<ContextType>()

export const PlatformProvider: ParentComponent = (props) => {
  const value = usePlatformValue()

  return (
    <PlatformContext.Provider value={value}>
      {props.children}
    </PlatformContext.Provider>
  )
}
export const usePlatform = () => {
  const context = useContext(PlatformContext)
  if (context === undefined) {
    throw new Error(`usePlatform must be used within a PlatformProvider`)
  }
  return context
}
