const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImageUrl: { type: String, default: null },
    },
    { timestamps: true }
);

// Hash password before saving to database
// Using promise-based middleware (no next callback needed in modern Mongoose)
UserSchema.pre("save", async function () {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        // Throw the error to be caught by Mongoose
        throw new Error(`Error hashing password: ${error.message}`);
    }
});

// Compare password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(`Error comparing passwords: ${error.message}`);
    }
};

module.exports = mongoose.model("User", UserSchema);