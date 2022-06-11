import mongoose from 'mongoose';
const dbConnection = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/notesDb', { useNewUrlParser: true }).then((db) => {
        console.log("Connected to data server")
        return db
    }).catch((error) => {
        console.log(error.message);
    })
}

export default dbConnection;