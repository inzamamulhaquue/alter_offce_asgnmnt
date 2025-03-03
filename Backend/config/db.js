// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI, {
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error(err));

// module.exports = mongoose;

const mongoose = require('mongoose');

const MONGO_URI = "mongodb://localhost:27017/analytics"; // Change this to your DB

mongoose.connect(MONGO_URI, {
}).then(() => {
    console.log("MongoDB Connected Successfully");
}).catch((err) => {
    console.error("MongoDB Connection Failed:", err);
});
