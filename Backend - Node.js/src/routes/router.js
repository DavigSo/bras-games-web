const router = require('express').Router();

const gameRouter = require('./gameRoutes');
router.use('/', gameRouter);

const userRouter = require('./userRoutes');
router.use('/', userRouter);

const cartRouter = require('./cartRoutes');
router.use('/', cartRouter);

const orderRouter = require('./orderRoutes');
router.use('/', orderRouter);


module.exports = router;
