import mitt from 'mitt'

type Events = {
  menuItem: string
  hideSidebar: boolean
  closeMenu: boolean
}

const emitter = mitt<Events>()
export default emitter
