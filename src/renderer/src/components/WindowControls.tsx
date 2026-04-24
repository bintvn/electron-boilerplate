export default function WindowControls() {
    return (
        <div className="flex">
            <button
                onClick={() => window.api.minimize()}
                tabIndex={-1}
                className="w-12 h-8 flex items-center justify-center hover:bg-zinc-800 transition no-drag"
            >
                <svg width="10" height="10">
                    <rect x="1" y="5" width="8" height="1" fill="white" />
                </svg>
            </button>

            <button
                onClick={() => window.api.close()}
                tabIndex={-1}
                className="w-12 h-8 flex items-center justify-center hover:bg-red-600 transition no-drag"
            >
                <svg width="10" height="10">
                    <line x1="1" y1="1" x2="9" y2="9" stroke="white" strokeWidth="1.5" />
                    <line x1="9" y1="1" x2="1" y2="9" stroke="white" strokeWidth="1.5" />
                </svg>
            </button>
        </div>
    )
}