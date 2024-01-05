import { Schema, model, Types } from "mongoose";

let collection = 'invitados';

let invitadoSchema = new Schema({
   fullName: {type: String, required: true},
   assist: {type: Boolean, required: true, default: false},
   assistChurch: {type: Boolean, required: true, default: false},
   partner: {type: Boolean, required: true, default: false},
   partnersName: {type: String, default: ''},
   // drinkPreferences: {type: {} , required: true, default: {
   //    ['fernet_🥤']: false,
   //    ['gin_tonic_🍸']: false,
   //    ['campari_🍹']: false,
   //    ['vino_🍷']: false,
   //    ['cerveza_🍺']: false,
   //    ['no_tomo_alcohol_💧']: false,
   //    ['otro_🥂']: '',
   // }},
   foodPreferences: {type: {} , required: true, default: {
      ['ninguna_🥩🥗']: false,
      ['como_sin_tac_❌🌾']: false,
      ['soy_vegano/a_❌🥩']: false,
      ['soy_vegetariano/a_💗🥑']: false,
      ['otra_🍤🍧']: false,
   }},
   contact: {type: String, default: ''},
   message: {type: String, default: ''},
}, {
   timestamps: true
});

let Guest = model(collection, invitadoSchema);

export default Guest;