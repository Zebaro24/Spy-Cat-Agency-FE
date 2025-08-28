"use client";

import React, {useState} from "react";
import {createCat, updateCat} from "@/services/catService";

export default function CatForm({cat, onSuccess, onError}) {
    const [name, setName] = useState(cat ? cat.name : "");
    const [breed, setBreed] = useState(cat ? cat.breed : "");
    const [years, setYears] = useState(cat ? cat.years : 1);
    const [salary, setSalary] = useState(cat ? cat.salary : 1000);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (cat) {
                await updateCat(cat.id, {salary: Number(salary)});
            } else {
                await createCat({name, breed, years, salary});
            }
            onSuccess && onSuccess();
        } catch (err) {
            const message = err?.message || "Something went wrong";
            setError(message);
            onError && onError(message);
        }
    };

    const isEdit = Boolean(cat);

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white rounded shadow space-y-3"
        >
            {error && <p className="text-red-500 whitespace-pre-line break-words">{error}</p>}

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
                disabled={isEdit}
            />

            <input
                type="text"
                placeholder="Breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full p-2 border rounded"
                required
                disabled={isEdit}
            />

            <input
                type="number"
                placeholder="Years of Experience"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full p-2 border rounded"
                required
                disabled={isEdit}
            />

            <input
                type="number"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />

            <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                {isEdit ? "Update Salary" : "Add Cat"}
            </button>
        </form>
    );
}
