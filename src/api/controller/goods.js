const Base = require('./base.js')

module.exports = class extends Base{
    /**
     * 获取子分类下的相应的产品
     * */
    async indexAction () {
        const goods_model =  this.model('goods')
        const goods_category_id = this.get('cid')
        let goods_data = await goods_model.where({goods_categoryid: goods_category_id}).select()
        if (!think.isEmpty(goods_data)) {
            return this.success({goodsList: goods_data})
        } else {
            return this.fail(401, '获取数据失败')
        }
    }
    /**
     * 根据商品id来获取商品详情
     * */
    async detailAction () {
        const gid = this.get('gid')
        const goods_model = this.model('goods')
        let goods_detail_data = await goods_model.where({id: gid}).find()
        if (!think.isEmpty(goods_detail_data)) {
            return this.success({detail: goods_detail_data})
        } else {
            return this.fail(401, '获取失败')
        }
    }

}