import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000,
    },
    status: {
        type: String,
        enum: ['new', 'pending', 'in progress', 'completed'],
        default: 'pending',
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
},
 {
    timestamps: true,
    versionKey: false,  // disable version key for mongoose 5.x+
 }
);

export default mongoose.model("tasks", TaskSchema);