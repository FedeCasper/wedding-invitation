import { Schema, model, Types } from "mongoose";

let collection = 'invitados';

let invitadoSchema = new Schema({
   fullName: {type: String, required: true},
   assist: {type: Boolean, required: true, default: false},
   drinkPreferences: {type: {} , required: true, default: {
      ['fernet_🥤']: false,
      ['gin_tonic_🍸']: false,
      ['campari_🍹']: false,
      ['vino_🍷']: false,
      ['cerveza_🍺']: false,
      ['no_tomo_alcohol_💧']: false,
      ['otro_🥂']: '',
   }},
   partner: {type: Boolean, required: true, default: false},
   partnersName: {type: String, required: true, default: ''},
   assistChurch: {type: Boolean, required: true, default: false},
   contact: {type: String, required: true, default: ''},
   foodPreferences: {type: {} , required: true, default: {
      ['como_sin_tac_❌🌾']: false,
      ['soy_vegano_❌🥩']: false,
      ['soy_vegetariano_💗🥑']: false,
      ['otro_🍟🥩']: false,
   }},
   message: {type: String, required: true, default: ''},
}, {
   timestamps: true
});

let Guest = model(collection, invitadoSchema);

export default Guest;