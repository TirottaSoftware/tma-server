const router = require('express').Router();
const profileController = require('../controllers/profileController')

router.get('/:uid', async (req, res) => {
    const { uid } = req.params;

    const user = await profileController.getUser(uid);
    res.send(user)
})

router.put('/updatePassword', async (req, res) => {
    console.log("Body: ", req.body)
    const { uid, oldPassword, newPassword, newPasswordConfirm } = req.body;
    await profileController.updateUserPassword(uid, oldPassword, newPassword, newPasswordConfirm)
        .then(data => {
            res.send(data)
        })
        .catch(e => {
            console.log("Error: ", e)
            res.send({ error: e.error })
            return;
        })
})

router.put('/:uid', async (req, res) => {
    const { uid } = req.params;

    const user = await profileController.updateUserDetails(uid, req.body);

    res.send(user);
})


module.exports = router;