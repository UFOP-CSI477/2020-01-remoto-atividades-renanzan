const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const CellSchema = mongoose.Schema({
    x: Number,
    y: Number,
    z: Number,
    village: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Village"
    },
    type: String
});

const WorldSchema = mongoose.Schema({
    info: {
        status:{
            type: String,
            enum: ['OPEN', 'CLOSE', 'HIDDEN'],
            default: 'OPEN',
            required: true
        },
        center: {
            x: Number,
            y: Number,
            z: Number
        }
    },
    grid: [[CellSchema]]
}, {
    timestamps: true
});

WorldSchema.plugin(AutoIncrement, { inc_field: 'info.world' });

module.exports = mongoose.model("World", WorldSchema);