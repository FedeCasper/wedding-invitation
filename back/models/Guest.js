import { Schema, model, Types } from "mongoose";

let collection = 'invitados';

let invitadoSchema = new Schema({
   fullName: {type: String, required: true},
   assist: {type: Boolean, required: true},
   drinkPreferences: {type: {} , required: true},
   partner: {type: Boolean, required: true},
   partnersName: {type: String, required: true},
   assistChurch: {type: Boolean, required: true},
   contact: {type: String, required: true},
   foodPreferences: {type: {} , required: true},
   message: {type: String, required: true},
}, {
   timestamps: true
});

let Guest = model(collection, invitadoSchema);

export default Guest;