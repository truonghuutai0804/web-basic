const quanlyRouter = require('./quanly')
const taoRouter = require('./tao')


function route(app){
    app.use(quanlyRouter)
    app.use(taoRouter)
}

module.exports = route