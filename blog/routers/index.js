module.exports = (app) => {
    const register = require('./register')
    const login = require('./login')
    const status = require('./status')
    const publish = require('./publish')
    const collect = require('./collect')
    const cancelCollect = require('./cancelCollect')
    const thumbs = require('./thumbs')
    const cancelThumbs = require('./cancelThumbs')
    const comment = require('./comment')
    const replyComment = require('./replyComment')
    const delArticle = require('./delArticle')
    const delComment = require('./delComment')
    const delReplyComment = require('./delReplyComment')
    const showArticle = require('./showArticle')
    const showComment = require('./showComment')
    const showReply = require('./showReply')
    const showCollect = require('./showCollect')
    const showComArt = require('./showComArt')
    const modify = require('./modify')
    const articleSee = require('./articleSee')
    const search = require('./search')
    const showSee = require('./showSee')
    const share = require('./share')
    const follow = require('./follow')
    const showFollow = require('./showFollow')
    const showFans = require('./showFans')
    const cancelFollow = require('./cancelFollow')
    const articleDetails = require('./articleDetails')
    const selected = require('./selected')
    const checkCollect = require('./checkCollect')
    const checkThumbs = require('./checkThumbs')
    const delSee = require('./delSee')
    const delAllSee = require('./delAllSee')
    const showCollectLen = require('./showCollectLen')
    const checkFollow = require('./checkFollow')
    const pic = require('./pic')
    const searchLen = require('./searchLen')
    const showUserComment = require('./showUserComment')
    const showAdmin = require('./showAdmin')
    const updateArticle = require('./updateArticle')


    app.get('/', (req, res) => {
        res.render('home')
    })
    //注册
    app.use('/register', register)

    //登录
    app.use('/login', login)

    //登录状态
    app.use('/status', status)

    //发表文章
    app.use('/publish', publish)

    //收藏
    app.use('/collect', collect)

    //取消收藏
    app.use('/cancelCollect', cancelCollect)

    //点赞
    app.use('/thumbs', thumbs)

    //取消点赞
    app.use('/cancelThumbs', cancelThumbs)

    //评论
    app.use('/comment', comment)

    //回复评论
    app.use('/replyComment', replyComment)

    //删除文章
    app.use('/delArticle', delArticle)

    //删除评论
    app.use('/delComment', delComment)

    //删除回复评论
    app.use('/delReplyComment', delReplyComment)

    //所有文章
    app.use('/showArticle', showArticle)

    //查看文章详情
    app.use('/articleDetails', articleDetails)

    //所有评论
    app.use('/showComment', showComment)

    //所有回复评论
    app.use('/showReply', showReply)

    //显示用户收藏
    app.use('/showCollect', showCollect)

    //显示评论文章
    app.use('/showComArt', showComArt)

    //修改信息
    app.use('/modify', modify)

    //文章浏览历史
    app.use('/articleSee', articleSee)

    //搜索查询
    app.use('/search', search)

    //查看历史
    app.use('/showSee', showSee)

    //删除历史
    app.use('/delSee', delSee)

    //删除所有历史
    app.use('/delAllSee', delAllSee)

    //分享
    app.use('/share', share)

    //关注
    app.use('/follow', follow)

    //取消关注
    app.use('/cancelFollow', cancelFollow)

    //查看关注
    app.use('/showFollow', showFollow)

    //每日精选
    app.use('/selected', selected)

    //查看是否收藏
    app.use('/checkCollect', checkCollect)

    //查看是否点赞
    app.use('/checkThumbs', checkThumbs)

    //查看收藏数量
    app.use('/showCollectLen', showCollectLen)

    //查看是否关注
    app.use('/checkFollow', checkFollow)

    //查看粉丝
    app.use('/showFans', showFans)

    //上传文章图片
    app.use('/pic', pic)

    //查看搜索总条数
    app.use('/searchLen', searchLen)

    //查看评论用户文章
    app.use('/showUserComment', showUserComment)

    //系统通知
    app.use('/showAdmin',showAdmin)

    //修改文章
    app.use('/updateArticle',updateArticle)

    // app.get('/', (req, res) => res.render('home'))
}