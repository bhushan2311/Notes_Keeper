const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
    // Similar as foreign key in SQL. We have to associate/link notes with its respective user
    user:{                                              // stores object id of another Model 
        type: mongoose.Schema.Types.ObjectId,         
        ref:'user'                                    // reference of 'user' Model
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('note',NoteSchema);