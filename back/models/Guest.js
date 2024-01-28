import { Schema, model, Types } from "mongoose";

let collection = 'invitados';

let invitadoSchema = new Schema({
   fullName: {type: String, required: true, default: ''},
   phone: {type: String, required: true, default: ''},
   assist: {type: Boolean, required: true, default: false},
   partner: {type: Boolean, required: true, default: false},
   partnersName: { type: [String], default: [] },
   childrens: {type: Boolean, required: true, default: false},
   childrensQuantity: {type: Number, default: 0},
   assistChurch: {type: Boolean, required: true, default: false},
   dietaryRestrictions: {type: Boolean, default: false},
   dietaryRestrictionsIndications: {type: String, default: ''},
   message: {type: String, default: ''},
}, {
   timestamps: true
});

let Guest = model(collection, invitadoSchema);

export default Guest;