const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const APIKEY = "0sdYTqwO6bq7uTWmSrqmLEPcuESO0WNkZ8OUGYxcNZI";
const URL = "https://api.unsplash.com/photos/random/?query=landscape&count=10&client_id=" + APIKEY;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(URL);
        const data = response.data;
        const filteredData = data.filter(image => image.location && image.location.position && image.location.position.latitude && image.location.position.longitude);
        const imageData = filteredData.map(image => ({
            image_url: image.urls.regular,
            location_name: image.location.name,
            latitude: image.location.position.latitude,
            longitude: image.location.position.longitude
        }));
        res.json(imageData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});









