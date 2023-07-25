const mongoose = require("mongoose");

// Creating Connection and Database(myTodo):
mongoose.connect("mongodb://localhost:27017/myTodo").then(() => {
    console.log('Connection is Successfull');
}).catch((err) => {
    console.log(err);
});

// Schema: defines the structure of document,default values and validators etc.
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ctype: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});

// Model: Wrapper on mongoose Schema and provide interface to dbs for CRUD.
// or in other words its the creation of collections.

const Playlist = new mongoose.model("Playlist", playlistSchema); // Playlist is a class.

// create or insert document:

const createDoc = async () => {
    try {
        const reactPlaylist = new Playlist({
            name: "React Playlist",
            ctype: "Fronend",
            videos: 80,
            author: "Thapa Bhai",
            active: true
        });

        // reactPlaylist.save(); // This return promise so we can await here.
        const result = await reactPlaylist.save();
        console.log(result);
    } catch (e) {
        console.log(e.message);
    }

};

createDoc();