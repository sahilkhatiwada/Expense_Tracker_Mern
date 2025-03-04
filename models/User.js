import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
        },
    email: {
        type: String,   
        required: true,
        unique: true,   
        lowercase: true,
        },
    password: {
        type: String,   
        required: true,
        },
        profileImageUrl: {
            type: String,
            default: null,
        
        },
  },{
    timestamps: true,
  });


//   hashing password before saving it to the database
    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
        next();
        }
        try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
        } catch (error) {
        next(error);
        }
    });

    //   comparing password
    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };



const User = mongoose.model("User", userSchema);

export default User;