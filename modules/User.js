// models/User.js

const mongoose = require('mongoose');
const UserSchema = require('./schema/User.schema');

const User = mongoose.model('User', UserSchema);

module.exports = User;
