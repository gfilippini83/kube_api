var mongoose = require('mongoose');

var gooseClient = mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DATABASE_URL}/chunkedwedge?authSource=admin`)

const PageModel = require('./models/page')
const ArticleModel = require('./models/article')
const RoleModel = require('./models/role');
const UserModel = require('./models/user');
module.exports = {
    ArticleModel,
    PageModel,
    RoleModel,
    UserModel
}