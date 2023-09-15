const sequelize = require('../config/connectDB')
const { QueryTypes } = require('sequelize');

class QuanLyController {
    // [GET] /api/tao
    async index(req,res){
        try {
            const data = await sequelize.query(`SELECT * FROM majors`, 
                                                { type: QueryTypes.SELECT, })
            return res.json({
                data: data,
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

    // [POST] /api/tao
    async create(req,res, next){
        try {
            const maLop = req.body.MA_LOP
            const tenLop = req.body.TEN_LOP
            const maCN = req.body.MA_CN

            await sequelize.query(`INSERT INTO classes (MA_LOP,MA_CN, TEN_LOP)
                                            VALUES ('${maLop}', '${maCN}', '${tenLop}')`, { type: QueryTypes.INSERT })
            return res.json({
                message: 'SUCCESS'
            })            
        } catch (error) {
            console.log('Lỗi nhá:', error)
        }
    }

}

module.exports = new QuanLyController 