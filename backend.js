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
        const nodePlaylist = new Playlist({
            name: "Node JS",
            ctype: "Backend",
            videos: 100,
            author: "Thapa Bhai",
            active: true
        });

        const flutterPlaylist = new Playlist({
            name: "Flutter",
            ctype: "Fronend",
            videos: 10,
            author: "Thapa Bhai",
            active: true
        });

        // reactPlaylist.save(); // This return promise so we can await here.
        // const result = await reactPlaylist.save(); // Save One Documnet.

        const result = await Playlist.insertMany([nodePlaylist, flutterPlaylist]);
        console.log(result);
    } catch (e) {
        console.log(e.message);
    }

};

// createDoc();

// Read Data:
const getDocument = async () => {
    try {
        // const result = await Playlist.find(); // Read all documents
        // const result = await Playlist.find({ ctype: "Fronend" }); // Only Read docs where ctype: "Fronend"
        const result = await Playlist.find({ ctype: "Fronend" }).select({ name: 1 }) // with only name.
        console.log(result);
    } catch (e) {
        console.log(e.message);
    }
}

getDocument();