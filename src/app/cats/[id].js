import {useRouter} from "next/router";
import CatForm from "../../components/CatForm";

export default function EditCatPage() {
    const router = useRouter();
    const {id} = router.query;

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Spy Cat</h1>
            {id && <CatForm catId={id}/>}
        </main>
    );
}
