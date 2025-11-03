const express = require('express');
const router = express.Router();
const Service = require('../models/service');

router.post('/', async(req, res) => {
    try{
        const newService = new Service(req.body); // create a new service objective from client data
        const savedService = await newService.save(); // save it to the database
        res.status(201).json(savedService); // Send back the saved service as confirmation

    } catch (err){
        res.status(400).json({ error: err.message }); // If something goes wrong, send an error response 
    }
});

// Get all services (GET /api/service)
router.get('/', async (req, res) => {
    try{
        const services = await Service.find();
        res.json(services);

    }catch (err){
        res.status(500).json({ error: err.message });
        console.log("error22");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Service.findByIdAndDelete(req.params.id);
        if (!deleted)  return res.status(404).json({ message: 'Service not found' });
    
        res.status(200).json({ message: 'Service deleted successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("error33");
    }
});

module.exports = router;
