import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Invalid name'],
        trim: true,
        minlength: 5,
        maxlength: [55, 'Length is too long']
    },
    lastname: {
        type: String,
        required: [true, 'Invalid lastname'],
        trim: true,
        minlength: 5,
        maxlength: [55, 'Length is too long']
    },
    age: {
        type: Number,
        required: [true, 'Invalid age'],
        min: [1, 'Must be over 1 year old'],
        max: [99, 'Must be maximum 99 years old'],
        trim: true,
    },
    family: { type: Array, default: [] }
},
{
    timestamps: true 
})

let userModel;

try {
    userModel = mongoose.model('User');
} catch (error) {
    userModel = mongoose.model('User', userSchema);
}

export default userModel;