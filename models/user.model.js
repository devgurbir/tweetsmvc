const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true}
}, {
    timestamps: true
})

userSchema.pre('save', function(next) {
    if(!this.isModified('password')) return next();
    bcrypt.hash(this.password, 8, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next()
    })
})

const User = mongoose.model("User", userSchema, "users")

module.exports = User