const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// Post belongsTo User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// User have many Post
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.hasOne(User, {
    foreignKey: 'user_id',
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});



module.exports = { User, Post, Comment };
