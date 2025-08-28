const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/cats";

const readJsonSafe = async (res) => {
    try {
        return await res.json();
    } catch {
        return null;
    }
};

const ensureOk = async (res) => {
    if (res.ok) return;
    const data = await readJsonSafe(res);
    let message;
    if (data) {
        if (Array.isArray(data.detail)) {
            message = data.detail
                .map((d) => {
                    const field = Array.isArray(d.loc)
                        ? d.loc[d.loc.length - 1]
                        : d.loc || "field";
                    return `${field}: ${d.msg}`;
                })
                .join("\n");
        } else if (typeof data.detail === "string") {
            message = data.detail;
        } else {
            message = data.message || data.error;
        }
    }
    message = message || res.statusText || `Request failed with status ${res.status}`;
    throw new Error(message);
};

export const getCats = async () => {
    const res = await fetch(API_URL);
    await ensureOk(res);
    const data = await res.json();
    return data.map((cat) => ({
        ...cat,
        years: cat.years_of_experience,
    }));
};

export const createCat = async (cat) => {
    const payload = {
        ...cat,
        years_of_experience: cat.years,
    };
    delete payload.years;

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });
    await ensureOk(res);
    return readJsonSafe(res);
};

export const updateCat = async (id, cat) => {
    const payload = {};
    if (Object.prototype.hasOwnProperty.call(cat, "name")) {
        payload.name = cat.name;
    }
    if (Object.prototype.hasOwnProperty.call(cat, "breed")) {
        payload.breed = cat.breed;
    }
    if (Object.prototype.hasOwnProperty.call(cat, "years")) {
        payload.years_of_experience = cat.years;
    }
    if (Object.prototype.hasOwnProperty.call(cat, "salary")) {
        payload.salary = cat.salary;
    }

    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });
    await ensureOk(res);
    return readJsonSafe(res);
};

export const deleteCat = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {method: "DELETE"});
    await ensureOk(res);
    return readJsonSafe(res);
};
