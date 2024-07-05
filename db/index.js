const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    todos:[{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
});

// Todo Schema
const TodoSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
  User,
  Todo
};