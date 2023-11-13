import { Schema, model, Types } from "mongoose";

let collection = 'invitados';

let invitadoSchema = new Schema({
   name: {type: String, required: true},
   last_name: {type: String, required: true},
   answer: {type: Boolean, required: true}
}, {
   timestamps: true
});

let Guest = model(collection, invitadoSchema);

export default Guest;