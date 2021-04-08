import { defineStore } from 'pinia'

export const useDropdownStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'dropdown',
  state: () => ({
    commandName: '',
    uid: 0
  }),
  getters: {},
  actions: {
    setCommand(name: string): void {
      this.commandName = name
    },
    setUid(): number {
      this.uid = Date.now()
      return this.uid
    }
  }
})
