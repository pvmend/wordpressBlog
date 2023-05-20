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
            res.render("homepage", { loggedIn : true , posts:postData})

    })
    
});


router.get('/login', async (req, res) => {
    res.render('login', { loggedIn: false });
});



router.get('/signup', async (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }
    res.render("signup");
});


router.get('/newpost', withAuth, async (req,res) =>{
    res.render('newpost', { loggedIn: true });
});

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
router.get('/view/:id', withAuth, async (req,res) => {
    await Post.findByPk(req.params.id,{
       // raw:true,
        include: [{
            model: Comment,

        }]

    })
    .then( async postData => {
        postData = postData.get({plain:true})
        console.log(postData);
       
        res.render('view',{ loggedIn : true, post:postData });
    })
});

router.get('/dashboard', withAuth, async (req, res) => {
     await Post.findAll({
        where: {user_id: req.session.user_id},raw:true})
        .then((postData) => {
        console.log(postData)
           // const posts = postData.get({plain: true});
            console.log(postData)
            res.render("dashboard", { loggedIn : true , user :{posts:postData}})

    });
});
// /users
// /users  - render all the users
// /todos - renders all the todos
// router.get('/users', async (req, res) => {
//   try {
//     const usersData = await User.findAll();
//     const users = usersData.map(user => user.get({plain: true}));

//     res.render('users', {
//       sentence: 'This is a sentence',
//       users,
//       visitCount: req.session.visitCount || 0,
//       loggedInUser: req.session.user || null,
//     });


//   } catch (error) {
//     res.status(500).json({error});
//   }
// });


// router.get('/users/:userId', async (req, res) => {
//   try {
//     const {userId} = req.params;
//     const userData = await User.findByPk(userId);
//     const user = userData.get({plain: true});
//     const settings = {
//       isCool: true,
//       isHungry: false,
//     };
//     res.render('user_profile', {
//       user,
//       settings,
//     });
//   } catch (error) {
//     res.status(500).json({error});
//   }
// });


module.exports = router;