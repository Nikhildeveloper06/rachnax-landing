require("dotenv").config();
const express = require("express");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

// CONTACT API
app.post("/api/contact", async(req, res) => {
    try {
        const { name, email, message } = req.body;

        const { error } = await supabase
            .from("contacts")
            .insert([{ name, email, message }]);

        if (error) throw error;

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(3000, () => {
    console.log("🚀 RachnaX running on http://localhost:3000");
});