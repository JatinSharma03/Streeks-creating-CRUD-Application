import streeks from "../model/dataSchema.js";

export const getStreeks = async(req,res)=>{
    try{
        const data = await streeks.find({});
        res.json(data);
        // await streeks.deleteMany({});
    }
    catch(error){
        res.json({message:error.message});
    }   
}

export const postStreeks = async (req,res)=>{
    const data = req.body;
    const newData = new streeks(data)
    try{
        await newData.save();
        res.json(newData);
    }
    catch(error){
        res.json({message:error.message});
    }   
}

export const getStreekById = async (req,res)=>{
    const id = req.params.id;
    try{
        const data = await streeks.findById(id);
        res.json(data);
    }
    catch(error){
        res.json({message:error.message});
    }
}

export const editStreeks = async (req,res)=>{
    const data = req.body;
    const newData = new streeks(data);
    try{
        await streeks.updateOne({_id:req.params.id}, newData);
        res.json(newData);
    }
    catch(error){
        res.json({message:error.message});
    }
}

export const deleteStreek = async (req,res)=>{
    try{
        await streeks.deleteOne({_id:req.params.id});
        res.json("streek deleted successfully");
    }
    catch(error){
        res.json({message:error.message});
    }
}