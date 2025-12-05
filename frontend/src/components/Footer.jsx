export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-6 text-center border-t border-gray-700">
            <p className="text-sm">
                &copy;{new Date().getFullYear()} TakeANote! — All Rights Reserved
            </p>
        </footer>
    )
}
