import mongoose from "mongoose"
const listschema=new mongoose.Schema({
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"drivers"
    },
    date:{
        type:Date,
        required:true
    },
    form:{
        type:String,
        required:true
    },
    to:{
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
        date:{
            type:Date
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
    },
    contactnumber:{
        type:Number,
        required:true
    }
},{timestamps:true})
export const list = mongoose.models.lists||mongoose.model("lists",listschema)