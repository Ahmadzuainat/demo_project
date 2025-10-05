import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        toJSON: {
      transform: function (doc, ret) {
        delete ret.password; // 🛑 امسح الباسورد من الـ response
        return ret;}
    }
    
    }
);

const User = mongoose.model("User", userSchema);

export default User;