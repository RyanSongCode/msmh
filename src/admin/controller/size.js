const Base = require('./base.js')

module.exports = class extends Base {
    /**
     *  新增商品尺码
     * */
    async addSizeAction () {
        const size_data = this.post()
        const sizeModel = this.model('size')
        let s_id =  await sizeModel.add({size_alisa: size_data.size_alisa, size_set: size_data.size_set})
        if (s_id > 0) {
            return this.success({},'添加成功')
        } else {
            return this.fail('添加失败')
        }
    }

    /**
     * 获取尺码列表
     * */
    async sizeListAction () {
        const sizeModel = this.model('size')
        let data = await sizeModel.select()
        if (!think.isEmpty(data)){
            return this.success(data)
        } else {
            return this.fail('401','获取失败')
        }
    }

    /**
     * 根据尺码ID获取尺码
     * */
    async getSizeByIdAction () {
        const s_id = this.get("s_id")
        const sizeModel = this.model('size')
        let data = await sizeModel.where({id:s_id}).find()
        if (!think.isEmpty(data)) {
            return this.success(data)
        } else {
            return this.fail('401','获取失败')
        }
    }

    /***
     * 根据尺码信息
     */
    async editSizeByIdAction () {
        const size = this.post()
        const sizeModel = this.model('size')
        let affectRows =  await sizeModel.where({id: size.id}).update({size_alisa: size.size_alisa, size_set: size.size_set})
        if (affectRows > 0) {
            return this.success({}, '更新成功')
        } else {
            return this.fail('401', '更新失败')
        }
    }

    /**
     * 删除尺码信息
     * */
    async deleteSizeByIdAction () {
        const s_id = this.get('id')
        const sizeModel = this.model('size')
        let affectRows = await sizeModel.where({id:s_id}).delete()
        if (affectRows > 0) {
            return this.success({},'删除成功')
        } else {
            return this.fail('401', '删除失败')
        }
    }
}