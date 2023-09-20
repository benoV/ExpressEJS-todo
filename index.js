import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Using a more structured approach to handle the task and its completion state
let workToDoList = [];
let musicToDoList = [];

app.get("/", (req, res) => {   
    res.render("index.ejs", { workToDoList });
});

app.get("/music", (req, res) => {   
    res.render("music.ejs", { musicToDoList });
});

app.post("/submit", (req, res) => {
    const { newToDo } = req.body;
    if(newToDo) {
        workToDoList.push({ task: newToDo, completed: false });
    }
    res.render('index.ejs', { workToDoList });
});

app.post("/submitMusic", (req, res) => {
    const { newToDo } = req.body;
    if(newToDo) {
        musicToDoList.push({ task: newToDo, completed: false });
    }
    res.render('music.ejs', { musicToDoList });
});

app.post("/toggle-completion", (req, res) => {
    const { index } = req.body; // Retrieve the task's index from the request
    if (workToDoList[index]) {
        workToDoList[index].completed = !workToDoList[index].completed;
    }
    res.redirect('/');
});

app.post("/toggle-completion-music", (req, res) => {
    const { index } = req.body; // Retrieve the task's index from the request
    if (musicToDoList[index]) {
        musicToDoList[index].completed = !musicToDoList[index].completed;
    }
    res.redirect('/music');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});