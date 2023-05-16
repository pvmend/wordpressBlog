const router =require('express').Router();
const {Post} = require('../../models');

router.post('/', async (req,res)=> {
    try {
        const postData = await Post.create({...req.body,
        user_id:req.session.user_id,
        });
    res.json(postData);
    // console.log(req.body);
    // res.send('hello');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports=router