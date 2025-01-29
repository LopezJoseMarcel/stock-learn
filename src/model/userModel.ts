import mongoose from "mongoose";
import { UserModelInterface } from "../types/interfacesModel";

const UserSchema = new mongoose.Schema<UserModelInterface>({
  userName: {type: String, required:true},
  email: {type: String, required: true},
  password: {type: String, required:true},
  movements: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  buyingPower: {type: Number},
})


export default mongoose.models.User || mongoose.model("User", UserSchema,"User");