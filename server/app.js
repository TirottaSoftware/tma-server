const express = require('express')
const cors = require('cors')
const movieRoutes = require('./routes/movieRoutes')
const userRoutes = require('./routes/userRoutes')
const profileRoutes = require('./routes/profileRoutes')

const app = express();
app.use(cors())
app.use(express.json())

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);

app.listen(4000, () => {
    console.log("Backend listening on port 4000");
})