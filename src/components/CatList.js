"use client";

import React, {useEffect, useState} from "react";
import {getCats, deleteCat} from "@/services/catService";
import CatForm from "./CatForm";
import Notification from "./Notification";

export default function CatList() {
    const [cats, setCats] = useState([]);
    const [editingCat, setEditingCat] = useState(null);
    const [notice, setNotice] = useState(null); // {type, message}

    const fetchCats = async () => {
        try {
            const data = await getCats();
            setCats(data);
        } catch (e) {
            setNotice({type: "error", message: e.message || "Failed to load cats"});
        }
    };

    useEffect(() => {
        fetchCats();
    }, []);

    useEffect(() => {
        if (!notice) return;
        const t = setTimeout(() => setNotice(null), 4000);
        return () => clearTimeout(t);
    }, [notice]);

    const handleDelete = async (id) => {
        if (!confirm("Delete this cat?")) return;
        try {
            await deleteCat(id);
            fetchCats();
        } catch (e) {
            setNotice({type: "error", message: e.message || "Delete failed"});
        }
    };

    return (
        <div className="p-4">
            {notice?.message && (
                <Notification
                    type={notice.type}
                    message={notice.message}
                    onClose={() => setNotice(null)}
                />
            )}

            <CatForm
                key={editingCat ? editingCat.id : "new"}
                cat={editingCat}
                onSuccess={() => {
                    setEditingCat(null);
                    fetchCats();
                }}
                onError={(msg) => setNotice({type: "error", message: msg})}
            />

            <ul className="mt-6 space-y-2">
                {cats.map((cat) => (
                    <li
                        key={cat.id}
                        className="flex justify-between p-3 bg-gray-100 rounded"
                    >
                        <div>
                            <p>
                                <strong>{cat.name}</strong> - {cat.breed} - {cat.years} yrs
                            </p>
                            <p>Salary: ${cat.salary}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => setEditingCat(cat)}
                                className="px-2 py-1 bg-blue-500 text-white rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(cat.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
