export type UpdateEvent = "available" | "downloading" | "downloaded"

export type ElectronAPI = {
  ping: () => string
  minimize: () => void
  close: () => void
}
