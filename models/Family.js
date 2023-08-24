import mongoose from 'mongoose';

export const familySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Invalid name'],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, 'Invalid lastname'],
        trim: true,
    },
    age: {
        type: Number,
        required: [true, 'Invalid age'],
        min: [1, 'Must be over 1 year old'],
        max: [99, 'Must be maximum 99 years old'],
        trim: true,
    },
    relationship: {
        type: String,
        enum: ['Father', 'Mother'],
        required: [true, 'Invalid relationship'],
    },
    family: { type: Array, default: [] }
},
{
    timestamps: true
})

let familyModel;

try {
    familyModel = mongoose.model('family');
} catch (error) {
    familyModel = mongoose.model('family', familySchema);  
}

export default familyModel;