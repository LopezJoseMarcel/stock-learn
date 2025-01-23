import mongoose from "mongoose";

interface UserModelInterface {
    userName : string;
    email: string;
    password: string
    movements: mongoose.Schema.Types.ObjectId[];
}