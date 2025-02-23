import mongoose from "mongoose";
import TaskModel from "../model/TaskModel.js";

export const CreateTask = async (req, res) => {
    try {
        let user_id = req.headers['user_id']; // Retrieve headers from the req object
        let reqBody = req.body;
        reqBody.user_id = user_id;
        await TaskModel.create(reqBody);
        return res.json({status: 'success', message: "Task created successfully"});
    } catch (err) {
        return res.json({status: 'error', message: err.toString()});
    }
};


export const UpdateTaskStatus = async (req, res) => {
    try {
        let id = req.params.id;
        let status = req.params.status;
        let user_id = req.headers['user_id'];
        await TaskModel.updateOne({"_id":id, "user_id": user_id},{status: status})
        return res.json({status: 'success', message: "Task status updated successfully"});
    } catch (err) {
        return res.json({status: 'error', message: err.toString()});
    }
};

export const TaskListByStatus = async (req, res) => {
    try{
        let status = req.params.status;
        let user_id = req.headers['user_id'];
        let Task = await TaskModel.find({user_id: user_id, status: status});
        return res.json({status:'success', "message": "Task List by Status successfully", data: Task});
    } catch (err) {
        return res.json({status: 'error', message: err.toString()});
    }
};

export const DeleteTask = async (req, res) => {
    try{
        let id = req.params.id;
    let user_id = req.headers['user_id'];
    await TaskModel.deleteOne({"_id": id, "user_id": user_id});  // Delete task with given id and user_id
    return res.json({status:'success', "message": "Task Delete successfully"})
    } catch (err) {
        return res.json({status: 'error', message: err.toString()});
    }
};

export const CountTask = async (req, res) => {

    let ObjectID = mongoose.Types.ObjectId;
    let user_id = req.headers['user_id'];
    let user_id_object = new ObjectID(user_id);

    let data = await TaskModel.aggregate([
        {
            $match: {
                user_id: user_id_object,
            },
        },
        {
            $group: {
                _id: "$status",
                sum: {$count:{}}
            },
        }
    ])
    return res.json({status:'success',"data":data, "message": "Task Count successfully"})
};