import { AuroraDia, DiaConfig } from '@/utils/aurora-dia'
import { defineStore } from 'pinia'

export const useDiaStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'diaStore',
  state: () => ({
    dia: new AuroraDia()
  }),
  getters: {},
  actions: {
    initializeBot(configs: DiaConfig): void {
      this.dia.installSoftware(configs)
      this.dia.on()
    }
  }
})
