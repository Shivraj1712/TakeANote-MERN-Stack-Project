export default function Loader({ fullscreen = false }) {
    return (
        <div
            className={`
        ${fullscreen ? "fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50" : "inline-flex"}
      `}
        >
            <div className="relative w-14 h-14">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>

                {/* Spinning ring */}
                <div
                    className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
                ></div>
            </div>
        </div>
    );
}
