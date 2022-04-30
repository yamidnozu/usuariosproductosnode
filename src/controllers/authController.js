const { Router } = require('express');
const router = Router();

const User = require('../models/UserModel');
const verifyToken = require('./verifyToken')

const jwt = require('jsonwebtoken');
const config = require('../config');

const productController = require('./productController')



router.post('/signup', async (req, res) => {
    try {
        // Receiving Data
        const { username, password } = req.body;
        // Creating a new User
        const user = new User({
            username,

            password
        });
        user.password = await user.encryptPassword(password);
        await user.save();
        // Create a Token
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });

        res.json({ auth: true, token });

    } catch (e) {
        console.log(e)
        res.status(500).send('Hay un problema registrando el usuario');
    }
});

router.route('/products')
    .get(verifyToken, productController.index)
    .post(verifyToken, productController.new)

router.route('/product/:id')
    .get(verifyToken, productController.view)
    .put(verifyToken, productController.update)
    .delete(verifyToken, productController.delete)



router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).send("No existe el username")
        }
        const validPassword = await user.validatePassword(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ auth: false, token: null });
        }
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: '24h'
        });
        res.status(200).json({ auth: true, token });
    } catch (e) {
        console.log(e)
        res.status(500).send('Hay un problema iniciando sesión');
    }
});


router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;