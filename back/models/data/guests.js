import 'dotenv/config.js';
import '../../config/database.js';
import Guest from '../Guest.js';

let guests = [
   {
      name: 'Ignacio',
      last_name: 'Lillo',
      answer: true
   },
   {
      name: 'Santiago',
      last_name: 'Maradona',
      answer: true
   }
]

Guest.insertMany(guests)