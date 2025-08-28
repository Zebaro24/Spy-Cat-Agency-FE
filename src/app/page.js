import Link from "next/link";

export default function Home() {
    return (
        <main
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 p-6">
            <h1 className="text-5xl font-extrabold text-white mb-8 text-center">
                Spy Cat Agency Dashboard
            </h1>
            <div className="flex flex-col md:flex-row gap-6">
                <Link
                    href="/cats"
                    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
                >
                    Manage Spy Cats
                </Link>
            </div>
        </main>
    );
}
