const API_URL = "https://mays-ai-backend.onrender.com/api/chat";

async function askAI() {
    const question = document.getElementById("question").value;
    if (!question) {
        alert("Please enter a question!");
        return;
    }

    const responseBox = document.getElementById("response");
    responseBox.innerText = "Thinking...";

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });

        const data = await res.json();

        if (data.error) {
            responseBox.innerText = "Error: " + data.error;
        } else {
            responseBox.innerText = data.answer;
        }
    } catch (err) {
        responseBox.innerText = "Network Error: " + err.message;
    }
}
