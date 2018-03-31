const Base = require('./base.js')

module.exports = class extends Base {
    /**
     *  获取商品分类
     * */
    async indexAction () {
        const main_model = this.model('maincategory')
        const child_model = this.model('childcategory')
        // 按照sortIndex来进行排序获取数据
        let main_category_list = await main_model.where({is_show: 1}).order({sort_index: 'asc'}).select()
        if (!think.isEmpty(main_category_list)) {
            const current_main_category_list = main_category_list[0];
            const mid = current_main_category_list.id
            current_main_category_list.subCategoryList =  await child_model.where({
                maincategory_id: mid,
                is_show: 1
            }).order({sort_index: 'asc'}).select()
            return this.success({categorylist: main_category_list, currentcategory: current_main_category_list})
        } else {
            return this.fail('401','数据异常')
        }
    }

    /***
     *  获取当前分类数据
     * */
    async currentAction () {
        const main_model = this.model('maincategory')
        const child_model = this.model('childcategory')
        const mid = this.get('mid')
        let current_main_category_data =  await main_model.where({id: mid}).find()
        if (!think.isEmpty(current_main_category_data)) {
            current_main_category_data.subCategoryList = await child_model.where({
                maincategory_id: mid,
                is_show: 1
            }).order({sort_index: 'asc'}).select()
            return this.success({currentcategory : current_main_category_data})
        } else {
            return this.fail('401','获取数据失败')
        }
    }

    /**
     * 根据子分类ID来获取兄弟子类
     * */
    async brotherAction () {
        const child_model = this.model('childcategory')
        const cid = this.get('id')
        let current_child_data = await child_model.where({id:cid}).find()
        if (!think.isEmpty(current_child_data)) {
            // 获取当前子分类的父分类ID
            let current_maincategory_id = current_child_data.maincategory_id
            let current_brother_data = await child_model.where({maincategory_id: current_maincategory_id}).select()
            if (!think.isEmpty(current_brother_data)) {
                return this.success({current_childcategroy: current_brother_data,brother: current_brother_data})
            } else {
                return this.fail(401, '获取数据失败')
            }
        } else {
            return this.fail(401, '获取数据失败')
        }
    }
}