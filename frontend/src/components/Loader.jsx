export default function Loader({ fullscreen = true }) {
    return (
        <div
            className={
                fullscreen
                    ? "fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
                    : "flex items-center justify-center w-full h-full"
            }
        >
            <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
        </div>
    );
}
