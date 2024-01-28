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
      const { fullName, phone, assist, partner, partnersName, childrens, childrensQuantity, assistChurch, dietaryRestrictions, dietaryRestrictionsIndications, message } = req.body;
      try {
         const existingGuest = await Guest.findOne({ phone });
         if (existingGuest) {
            return res.status(400).json({ success: false, error: 'Ya existe un invitado con el mismo número de teléfono' });
         }

         const newGuest = new Guest({ fullName, phone, assist, partner, partnersName, childrens, childrensQuantity, assistChurch, dietaryRestrictions, dietaryRestrictionsIndications, message });
         await newGuest.save();
         res.json({ success: true });
      } catch (error) {
         console.error(error);
         res.status(500).json({ success: false, error: 'Error al almacenar el invitado' });
      }
   } 
}


export default guestsController;