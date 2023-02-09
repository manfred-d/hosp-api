const mongoose = require('mongoose');
// mongoose.set('setQuery', true);

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.log(`Error: ${error.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDatabase
