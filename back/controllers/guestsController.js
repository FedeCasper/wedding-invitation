import Guest from '../models/Guest.js';

const guestsController = {

   getGuests: async (req, res) => {
      try {
         const guests = await Guest.find();
         res.status(200).json(guests);
      } catch (error) {
         console.error(error);
         res.status(500).json({ success: false, error: 'Error al obtener los invitados' });
      }
   },

   postGuests: async (req, res) => {
      const { fullName, assist, drinkPreferences, partner, partnersName, assistChurch, contact, foodPreferences, message } = req.body;
      try {
         const newGuest = new Guest({ fullName, assist, drinkPreferences, partner, partnersName, assistChurch, contact, foodPreferences, message });
         await newGuest.save();
         res.json({ success: true });
      } catch (error) {
         console.error(error);
         res.status(500).json({ success: false, error: 'Error al almacenar el invitado' });
      }
   } 
}


export default guestsController;