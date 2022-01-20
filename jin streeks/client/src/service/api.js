import axios from 'axios';

const url='http://localhost:3005/streeks';

export const getStreek = async (id)=>{
    try{
        id = id || "";
        return await axios.get(`${url}/${id}`);
    }
    catch(error){
        console.log("error in getting streeks is "+error);
    }
}

export const postStreek = async (streek)=>{
    try{
        return await axios.post(`${url}/add`,streek);
    }
    catch(error){
        console.log("error in posting streeks is "+error);
    }
}

export const editStreek = async (data,id)=>{
    try {
        return await axios.put(`${url}/${id}`,data);
    } 
    catch (error) {
        console.log("error in editing streeks is "+error);
    }
}

export const deleteStreek = async (id)=>{
    try {
        return await axios.delete(`${url}/${id}`);
    } 
    catch (error) {
        console.log("error in deleting streeks is "+error);
    }
}