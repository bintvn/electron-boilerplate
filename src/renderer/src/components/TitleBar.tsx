import WindowControls from "./WindowControls";
import { build as packageBuild } from '../../../../package.json'
import image from '../icon.png'

const { productName } = packageBuild

export default function TitleBar() {
    return (
        <div className="h-8 flex items-center justify-between bg-[#191a1b] border-b border-zinc-800 select-none drag">
            <div className="flex gap-2 px-3 text-sm text-zinc-400">
                <img src={image} className="w-4" />
                {productName}
            </div>

            <WindowControls />
        </div>
    )
}
