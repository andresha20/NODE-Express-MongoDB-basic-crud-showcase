import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config';
import userModel from './models/User.js';
import familyModel from './models/Family.js';

const app = express()
app.use(express.json()); 

try {
    await mongoose.connect(process.env.CONNECTION).then(() => console.log('Connected'));
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
} catch (error) {
    console.log(error)
}

app.get('/api/users', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({ message: 'List of users: ', users });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Server error' })
    }
})

app.get('/api/users/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModel.findOne({ _id: userId });
        console.log(user)
        res.status(200).json({ message: 'User: ', user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Server error' })
    }
})

app.post('/api/newfamily/:userId', async (req, res) => {
    const { body } = req;
    const { userId } = req.params;
    try {
        console.log(body)
        const newUser = new familyModel({
            ...body
        })
        await newUser.validate();
        const updatedUser = await userModel.updateOne({ _id: userId }, { $push: { family: newUser } }, { new: true });
        res.status(200).json({ message: 'Family user saved satisfactorily', updatedUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message ?? 'Server error' })
    }
})

app.post('/api/newuser', async (req, res) => {
    const { body } = req;
    try {
        console.log(body)
        const newUser = await userModel.create({
            ...body
        })
        res.status(200).json({ message: 'User saved satisfactorily', newUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message ?? 'Server error' })
    }
})

app.put('/api/edituser', async (req, res) => {
    const { body } = req;
    const userId = body?._id;
    try {
        if (!userId) throw 'No ID given';
        if (!mongoose.Types.ObjectId.isValid(userId)) throw 'Invalid user ID';
        const updatedUser = await userModel.updateOne({ _id: userId }, { ...body }, { runValidators: true, upsert: true, new: true });
        res.status(200).json({ message: 'User saved satisfactorily', updatedUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message ?? 'Server error' })
    }
})

app.delete('/api/deleteuser/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        if (!userId) throw 'No ID given';
        if (!mongoose.Types.ObjectId.isValid(userId)) throw 'Invalid user ID';
        const updatedUser = await userModel.deleteOne({ _id: userId });
        res.status(200).json({ message: 'User saved satisfactorily', updatedUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Server error' })
    }
})

app.get('/', function (req, res) {
  res.send('Home page');
})

