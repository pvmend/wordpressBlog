const router = require('express').Router();
//const {User} = require('../../models');

// router.use((req, res, next) => {
//   if(!req.session.logged_in){
//    res.render('login', {loggedIn : false })
//   } else{
//     next();
//   }

// })
// redirect to hompage if not logged in

router.get('/', async (req,res)=>{
    console.log(req.session)
    res.render("homepage", { loggedIn : true })
});


router.get('/login', async (req, res) => {
    res.render('login', { loggedIn: false });
});

router.get('/signup', async (req,res) => {
    res.render("signup");
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