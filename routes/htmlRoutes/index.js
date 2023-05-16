const router = require('express').Router();
const {User,Post} = require('../../models');

// router.use((req, res, next) => {
//   if(!req.session.logged_in){
//    res.render('login', {loggedIn : false })
//   } else{
//     next();
//   }

// })
// redirect to hompage if not logged in


router.get('/users/:userId', async (req,res)=>{
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
    console.log(req.session)
    if(!req.session.user_id){
          // return res.render('login', { loggedIn: false });
            return res.redirect('/login');
    }
    await Post.findAll({
        where: {user_id: req.session.user_id},raw:true}).then((postData) => {
        console.log(postData)
           // const posts = postData.get({plain: true});
            console.log(postData)
            res.render("homepage", { loggedIn : true , user :{posts:postData}})

    })
});


router.get('/login', async (req, res) => {
    res.render('login', { loggedIn: false });
});



router.get('/signup', async (req,res) => {
    res.render("signup");
});

router.get('/newpost', async (req,res) =>{
    res.render('newpost', { loggedIn: true });
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