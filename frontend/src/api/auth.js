const API = "http://localhost:8000";

export async function login(username, password) {
    const res = await fetch(`${API}/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ username, password})
    });

    return res.json();
}

export async function register(username, email, password) {
    const res = await fetch(`${API}/register`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify({ username, email, password})
    });

    return res.JSON()
}