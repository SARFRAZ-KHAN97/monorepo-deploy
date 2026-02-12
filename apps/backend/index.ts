import express from "express";
import { prismaClient } from "db/client";


const app= express();

app.use(express.json());



app.get("/users", async (req, res) => {
    try {
        const users= await prismaClient.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
})


app.post("/users", async (req, res) => {
    const { username, password }= req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    prismaClient.user.create({
        data: {
            username,
            password
        }
    })
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: "Failed to create user" });
    })
})




app.listen(8080, () => {
    console.log("Server is running on port 8080");
})