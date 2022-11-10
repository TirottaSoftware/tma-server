const router = require('express').Router();
const movieController = require('../controllers/movieController');

router.get('/:uid', async (req, res) => {
    const { uid } = req.params;

    const list = await movieController.getUserList(parseInt(uid));
    res.send(list)
})

router.get('/list/:uid/:movieId', async (req, res) => {

    const movieId = parseInt(req.params.movieId);
    const uid = parseInt(req.params.uid)

    const isInList = await movieController.isInList(movieId, uid);
    res.send(isInList);
})

module.exports = router;