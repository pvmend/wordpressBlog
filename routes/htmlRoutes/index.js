const router = require('express').Router();
const {User,Post,Comment} = require('../../models');
const withAuth = require('../../utils/auth');
const { DateTime } = require('luxon');

// router.use((req, res, next) => {
//   if(!req.session.logged_in){
//    res.render('login', {loggedIn : false })
//   } else{
//     next();
//   }

// })
// redirect to hompage if not logged in

// get user post
router.get('/users/:userId', withAuth, async (req,res)=>{
    try{
        const {user_id} = req.params;
        const userData = await User.findByPk(user_id, {
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title',
                    'content', 'date_created']
                }
            ]
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// get all posts

router.get('/', async (req,res)=>{
   // console.log(req.session)
    
    await Post.findAll({raw:true})
        .then((postData) => {
        //console.log(postData)
           // const posts = postData.get({plain: true});
            //console.log(postData) // array
            postData = postData.map(post => {
                post.showCreated = DateTime.fromJSDate(post.created_at).toFormat('ff');
                return post 
            })
            // console.log(postData) // array
            res.render("homepage", { loggedIn : req.session.logged_in , posts:postData})

    })
    
});

// render login page
router.get('/login', async (req, res) => {
    res.render('login', { loggedIn: false });
});


// render signup page
router.get('/signup', async (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }
    res.render("signup");
});

// render new post page
router.get('/newpost', withAuth, async (req,res) =>{
    res.render('newpost', { loggedIn: true });
});

// render edit post page
router.get('/edit/:id',withAuth, async(req,res) => {
    await Post.findByPk(req.params.id,{raw:true})
    .then(postData => {
        if(req.session.user_id === postData.user_id){
        //console.log(postData)
        res.render('edit',{ loggedIn : true, post:postData });
        } else {
            res.redirect('/')
        }
    })
   
})
// view a single post
router.get('/view/:id', withAuth, async (req,res) => {
    await Post.findByPk(req.params.id,{
       // raw:true,
        include: [{
            model: Comment,
            include: [{
                model: User,
            }],
        }]


    })
    .then( async postData => {
        postData = postData.get({plain:true})
        console.log(postData);
       
        res.render('view',{ loggedIn : true, post:postData });

    })
});
// user dashnoard
router.get('/dashboard', withAuth, async (req, res) => {
     await Post.findAll({
        where: {user_id: req.session.user_id},raw:true})
        .then((postData) => {
        //console.log(postData)
           // const posts = postData.get({plain: true});
           // console.log(postData)
            res.render("dashboard", { loggedIn : true , user :{posts:postData}})

    });
});



module.exports = router;