const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
UserSchema = new Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    creatAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'user'
});

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;