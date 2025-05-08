function receiveSensorData(req, res, io) {
    const data  = req.body;

    if (!data) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Sensor data received successfully' });
   // console.log(data); // just for debugging, but eats disk
}

module.exports = {
    receiveSensorData,
};
