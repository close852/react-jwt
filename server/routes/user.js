import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({
        test:'test'
    })

})


export default router;
