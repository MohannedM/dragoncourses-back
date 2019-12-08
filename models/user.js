const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    is_admin:{
        type: Number,
        default: 0
    },
    enrolledCourses: [
        {
            type: Object,
            required: true
        }
    ],
    coursesAdded: [
        {
            type: Object,
            required: true
        }
    ]

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);