import mongoose from 'mongoose';

const URL = `mongodb://user:pass@jinstreeks-shard-00-00.hfszv.mongodb.net:27017,jinstreeks-shard-00-01.hfszv.mongodb.net:27017,jinstreeks-shard-00-02.hfszv.mongodb.net:27017/PROJECT-0?ssl=true&replicaSet=atlas-vk1jgb-shard-0&authSource=admin&retryWrites=true&w=majority`;

const connection = async ()=>{
    try{
        await mongoose.connect(URL ,{useNewUrlParser : true});
        console.log("succesfully connected to database");
    }
    catch(error){
        console.log(`error in connecting to database is : ${error}`);
    }
}

export default connection;