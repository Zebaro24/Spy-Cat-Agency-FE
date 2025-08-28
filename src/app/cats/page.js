import Head from "next/head";
import CatList from "../../components/CatList";

export default function CatsPage() {
    return (
        <>
            <Head>
                <title>Spy Cats Dashboard</title>
            </Head>
            <main className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-6">
                <h1 className="text-3xl font-bold text-white text-center mb-6">Spy Cats Management</h1>
                <CatList/>
            </main>
        </>
    );
}
