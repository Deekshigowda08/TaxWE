import mongoose from "mongoose"
const listschema=new mongoose.Schema({
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"drivers"
    },
    form:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    avaliblity:{
        type:Number
    },
    clients: [{
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users" 
        },
        seats: {
          type: Number
        },
        pickuplocation: {
          type: String
        },
        approved: {
          type: Boolean,
          default: false
        }
      }],
    cost:{
        type:Number,
        required:true
    },
    vehicle:{
        type:String,
        required:true
    },
    vechiclenumber:{
        type:String,
        required:true
    }

    
},{timestamps:true})
export const list = mongoose.models.lists||mongoose.model("lists",listschema)