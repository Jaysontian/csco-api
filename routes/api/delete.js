const express = require('express'); // Import express framework
const router = express.Router(); //

router.delete('/delete', async(req,res) => {
    try{
        console.log('delete request');
        res.json({ message: 'delete request received on the backend' });
    } catch(error){
        console.error('Error handling delete request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
