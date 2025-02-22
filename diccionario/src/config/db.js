// src/config/db.js
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conecta")
    } catch (error) {
        console.log("Error al conectar a MongoDB");
        process.exit(1);
    }
};

export default connectDB;