const mongoose = require("mongoose");


const payTrackerSchema = new mongoose.Schema({
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    Bankname:{
        type: String,
        default:"Billy Woods"
    },
    sentMess:{
        type: String,
        default:"Is sending you"
    },
    amount:{
        type: String
    },
    progress:{
        type: Number,
        default: 0
    },
    senMess:{
        type: String,
        default: "Kindly Update Your Signal"
    },
    Fees:{
        type: String
    },

    FStatus:{
        type: String,
        default: "Unresolved"
    },

    Mmessage:{
        type: String,
        default: "We apologize for any inconvenience you may have experienced. Please note that the time has elapsed. Thank you for selecting our bank for your financial needs."
    },
    mstatus:{
        type: String,
        default:"Unresolved"
    },
},{timestamps: true})

const PayTracker = mongoose.model('paytracker', payTrackerSchema)

module.exports = PayTracker;