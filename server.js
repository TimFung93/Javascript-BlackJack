const express = require('express');
const Shuffle = require('shuffle-array');
const app = express();


app.use(express.static('public'));


app.listen(8080, () => {
	console.log("Server started on http://localhost:8080")
	console.log("Press CTRL + C to kill server")
})