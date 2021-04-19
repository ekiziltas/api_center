let mongoose = require('mongoose');

let RecordSchema = new mongoose.Schema({
        key: {
            type: String,
            required: true
        },
        counts: [Number],
        value: String
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Record', RecordSchema);