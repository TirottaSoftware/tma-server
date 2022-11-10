const router = require('express').Router();
const userController = require('../controllers/userController')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get('/', validateToken, (req, res) => {
    const user = req.user;
    res.json(user);
})

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const accessToken = await userController.loginUser(username, password)
        .then(data => {
            return data;
        })
        .catch(e => {
            return { error: e.error }
        })
    console.log(accessToken)
    res.send(accessToken);
})

// Registration
router.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    const accessToken = await userController.registerUser(username, email, password, confirmPassword)
        .then(data => {
            console.log("Token: ", data)
            return data;
        })
        .catch(e => {
            return { error: e.error }
        })
    res.send(accessToken);
})

// Adding a movie to the list

router.put('/movie', async (req, res) => {
    const { movie, userId } = req.body;

    const addMovie = await userController.addMovieToList(movie, userId);
    res.send(addMovie);
})

module.exports = router;