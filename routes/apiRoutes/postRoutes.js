const router =require('express').Router();
const {Post} = require('../../models');
const {Comment} = require('../../models');

router.post('/', async (req,res)=> {
         console.log(req.body);

    try {
        console.log(req.session);
        const postData = await Post.create({...req.body,
        user_id:req.session.user_id,
        
        });

    res.json(postData);
    // res.send('hello');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/comment/:postid', async (req,res)=> {
    try {
        console.log(req.session);
        const postData = await Comment.create({...req.body,
        user_id:req.session.user_id,
        post_id:req.params.postid
        })
        console.log(postData);
       return res.json(postData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
});

router.put('/:id', async (req,res)=> {
    console.log(req.body);
    console.log(req.params.id);
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if(!postData){
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports=router