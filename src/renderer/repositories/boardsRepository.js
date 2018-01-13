import db from '@/persistence'

import lodashId from 'lodash-id'

db._.mixin(lodashId)

db.defaults({
  activeBoard: 'default',
  boards: [{
    id: 'default',
    label: 'Default board',
    showDone: false,
    prependNewItem: false
  }]
}).write()

export default {
  get () {
    console.log(`${JSON.stringify(db.getState())}`)
  },
  saveNewBoard (boardName) {
    return db
      .get('boards')
      .insert({
        label: boardName,
        showDone: false,
        prependNewItem: false
      })
      .write()
  },
  setActiveBoard (boardId) {
    db.set('activeBoard', boardId)
      .write()
  },
  getActiveBoard () {
    return db.get('activeBoard')
      .value()
  },
  getBoard (boardId) {
    return db
      .get('boards')
      .getById(boardId)
      .value()
  },
  getList () {
    return db
      .get('boards')
      .value()
  }
}