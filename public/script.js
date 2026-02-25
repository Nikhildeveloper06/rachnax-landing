const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async(e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        successMsg.classList.remove("hidden");
        form.reset();
    }
});