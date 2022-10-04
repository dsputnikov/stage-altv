import alt from 'alt-client'

class Cursor {
  static state = false

  static show(state) {
    if (Cursor.state === state) return
    alt.showCursor(state)
    Cursor.state = state
  }

  static get() {
    return Cursor.state
  }
}

export default Cursor