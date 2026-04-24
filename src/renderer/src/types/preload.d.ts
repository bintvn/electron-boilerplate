import type { ElectronAPI } from "../../../electron/types"

export {}

declare global {
  interface Window {
    api: ElectronAPI
  }
}