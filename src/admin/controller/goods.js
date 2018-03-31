const Base = require('./base.js')

module.exports = class extends Base {
    /**
     * 新建产品信息
     * */
    async addNewGoodsAction () {
        const goods_data = this.post()
        goods_data.goods_created = new Date().getTime()
        const goods_model = this.model('goods')
        let g_id = await goods_model.add(goods_data)
        if (g_id > 0) {
            return this.success({}, '提交成功')
        } else {
            return this.fail ('401', '提交失败')
        }
    }

    /**
     * 获取产品信息列表
     * */
     async getGoodsListAction () {
         const goods_model = this.model('goods')
         let goodsData = await goods_model.select()
         if (!think.isEmpty(goodsData)) {
             return this.success(goodsData,'获取成功')
         } else {
             return this.fail('401', '获取产品列表失败')
         }
    }
     /**
      * 商品ID来获取商品信息
      * */
     async getGoodsInfoByIdAction () {
         const gid = this.get('id')
         const goods_model = this.model('goods')
         let goodsData = await goods_model.where({id: gid}).find()
         if (!think.isEmpty(goodsData)) {
             return this.success(goodsData)
         } else {
             return this.fail('401', '获取失败')
         }
     }

    /**
     * 编辑产品信息
     * */
    async editGoodsByIdAction () {
        const goods_data = this.post()
        const goods_model = this.model('goods')
        const affectRows = await  goods_model.where({id: goods_data.id}).update(goods_data)
        if (affectRows > 0) {
            return this.success({},'保存成功')
        } else {
            return this.fail('401', '编辑失败')
        }
    }

    /**
     * 删除产品信息
     * */
    async deleteGoodsByIdAction () {
        const gid = this.get('id')
        const goods_model = this.model('goods')
        const affectRows = await goods_model.where({id:gid}).delete()
        if (affectRows > 0) {
            return this.success({},'删除成功')
        } else {
            return this.fail('401', '删除失败')
        }


    }
}