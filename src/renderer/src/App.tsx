import { useEffect } from "react"
import TitleBar from "./components/TitleBar"

export default function App() {
  return (
    <div className="w-100 h-150 bg-[#121314] text-white flex flex-col overflow-hidden">
      <TitleBar />

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900 rounded-xl p-3">
            <p className="text-xs text-zinc-400">Active</p>
            <p className="text-xl font-bold mt-1">12</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-3">
            <p className="text-xs text-zinc-400">Offline</p>
            <p className="text-xl font-bold mt-1">3</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm text-zinc-400 mb-2">Recent Activity</h2>

          <div className="space-y-2">
            {["Server A restarted", "New login detected", "Backup completed"].map((item, i) => (
              <div key={i} className="bg-zinc-900 rounded-xl p-3 flex justify-between items-center">
                <p className="text-sm">{item}</p>
                <span className="text-xs text-zinc-500">Now</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="p-3 border-t border-zinc-800">
        <button className="w-full bg-white text-black rounded-xl py-2 font-medium hover:bg-zinc-200 transition cursor-pointer">
          Run Action
        </button>
      </div>

    </div>
  )
}
