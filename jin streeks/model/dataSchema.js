import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    },
    current:{
        type:String,
        required:true
    },
    done:{
        type:Boolean,
        required:true
    },
    foreverDone:{
        type:Boolean,
        required:true
    },
    streekDay:{
        type:String,
        required:true
    },
    streekNextDay:{
        type:String,
        required:true
    }

});

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin,'streeks');

const streeks = mongoose.model('streeks',schema);

export default streeks;