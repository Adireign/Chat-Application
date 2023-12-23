import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(chalk.red.bold(`Successfully connected to database: ${conn.connection.host}`))
    } catch (error) {
        console.log(chalk.blue.bold(`Error is: ${error.message}`))
    }
}

export default connectDB