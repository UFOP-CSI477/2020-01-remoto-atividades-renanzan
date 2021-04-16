const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const sintomaType = {
    type: Boolean,
    required: true
}

const sintomasScheme = mongoose.Schema({
    fadiga: sintomaType,
    coriza: sintomaType,
    dor_cabeca: sintomaType
})

const FormSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    sintomas: sintomasScheme
}, {
    timestamps: true
});

module.exports = mongoose.model("TesteForm", FormSchema);