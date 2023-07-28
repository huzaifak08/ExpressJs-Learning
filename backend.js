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
    ctype: {
        type: String,
        enum: ["Backend", "Fronend", "Database"] // Build in Validations
    },
    videos: {
        type: String,
        validate(value) {
            if (value < 0) {
                throw Error('Videos count cannot be negative');
            };
        }
    },
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
            name: "Flutter UI",
            ctype: "Fronend",
            videos: -5,
            author: "Thapa Bhai",
            active: true
        });

        // reactPlaylist.save(); // This return promise so we can await here.
        const result = await flutterPlaylist.save(); // Save One Documnet.

        // const result = await Playlist.insertMany([nodePlaylist, flutterPlaylist]);
        console.log(result);
    } catch (e) {
        console.log(e.message);
    }

};

// createDoc();

// Read Data:
const getDocument = async () => {
    try {
        const result = await Playlist.find(); // Read all documents
        const result1 = await Playlist.find({ ctype: "Fronend" }); // Only Read docs where ctype: "Fronend"

        const result2 = await Playlist
            .find({ ctype: "Fronend" })
            .select({ name: 1 }) // with only name.
            .limit(1); // Only 1 document.

        // Comparison operators:
        // Show the documents with videos greater than 10
        const result3 = await Playlist
            .find({ videos: { $gt: 10 } })
            .select({ name: 1 });

        // Show all documents with "ctype":"Fronend" and "Backend"
        const result4 = await Playlist
            .find({ ctype: { $in: ["Backend", "Fronend"] } })
            .select({ name: 1 });

        // Show all documents without "ctype":"Fronend" and "Backend"
        const result5 = await Playlist
            .find({ ctype: { $nin: ["Backend", "Fronend"] } })
            .select({ name: 1 });

        // Logical Operators:
        // OR Operator:
        const result6 = await Playlist
            .find({ $or: [{ ctype: 'Backend' }, { videos: 80 }] })
            .select({ name: 1 });

        // AND Operator:
        const result7 = await Playlist
            .find({ $and: [{ ctype: 'Backend' }, { videos: 80 }] })
            .select({ name: 1 });

        // Count:
        const result8 = await Playlist
            .find({ $and: [{ ctype: 'Fronend' }, { videos: 80 }] })
            .select({ name: 1 })
            // .count(); if incase it don't work use:
            .countDocuments();

        // Sort:
        const result9 = await Playlist
            .find()
            .select({ name: 1 })
            .sort("name : 1"); // Ascending: -->(Spacing*)

        const result10 = await Playlist
            .find()
            .select({ name: 1 })
            .sort({ name: -1 }); // Descending: -->(Braces*)

        console.log(result10);

    } catch (e) {
        console.log(e.message);
    }
}

// getDocument();

// Update Document:
const updateDocument = async (_id) => {
    try {

        // Update but only show message in modified or not:
        const result = await Playlist.updateOne({ _id }, {
            $set: {
                ctype: "Frontend"
            }
        });

        // Update and also print the document:
        const result2 = await Playlist.findByIdAndUpdate({ _id }, {
            $set: {
                ctype: "Frontend"
            }
        });

        // If the above show deprecated error then do this:
        const result3 = await Playlist.findByIdAndUpdate({ _id }, {
            $set: {
                ctype: "Frontend"
            }
        }, {
            new: true,
            useFindAndModify: false
        });

        console.log(result3);

    } catch (err) {
        console.log(err.message);
    }
}

// updateDocument("64bfff1862afc8bfacc19ac5");

// Delete Document:
const deleteDocument = async (_id) => {
    try {

        // Delete Document and only return true or false:
        const result = await Playlist.deleteOne({ _id: _id });

        // Delete Document but also print the whole document:
        const result2 = await Playlist.findByIdAndDelete({ _id: _id });

        console.log(result2);

    } catch (err) {
        console.log(err.message);
    }
}

// deleteDocument("64c02194fc90c676d04865ca");

