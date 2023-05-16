const router = require('express').Router();
const userRoutes = require('./userRoutes')
const postRoutes = require('./postRoutes')

router.use('/post', postRoutes);

router.use('/user', userRoutes);



module.exports = router;