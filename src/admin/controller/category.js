const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * 新增商品分类
   *
   * */
  async addMainCategoryAction() {
     const mainCategory = this.post();
     const model = this.model('maincategory');
     let m_id = await model.add({category_name:mainCategory.category_name, sort_index: mainCategory.sort_index, is_show: mainCategory.is_show});
     if(m_id > 0) {
        return this.success({mid: m_id}, '操作成功');
     }else {
       return this.fail('401','操作失败')
     }
  }
  /**
   * 根据商品编号获取分类
   * */
  async getMainCategoryByIdAction() {
      //获取编号
      const id = this.get('id');
      const model = this.model('maincategory');
      let data = await model.where({id:id}).find();
      if(!think.isEmpty(data)){
          return this.success(data)
      }else {
          return this.fail('401')
      }
  }
  /**
   * 获取商品分类
   * */
  async getMainCategoryAction() {
      const model = this.model('maincategory');
      let data = await model.select();
      if(!think.isEmpty(data)){
          return this.success(data);
      }else {
          return this.fail('402');
      }
  }
  /**
   * 编辑商品主分类
   * */
  async editMainCategoryAction() {
      const mainCategory = this.post()
      const model = this.model('maincategory')
      let result = await model.where({id:mainCategory.id}).update({
          id:mainCategory.id,
          category_name: mainCategory.category_name,
          sort_index: mainCategory.sort_index,
          is_show:mainCategory.is_show
      })
      if (result > 0) {
          return this.success({},'编辑成功')
      }else {
          return this.fail('编辑失败')
      }
  }
  /**
   * 添加子分类
   * */
   async addChildCategoryAction () {
       const childCategory =  this.post()
       const model =  this.model('childcategory')
       let cid = await model.add({
           category_name: childCategory.category_name,
           maincategory_id: childCategory.maincategory_id,
           sort_index: childCategory.sort_index,
           is_show: childCategory.is_show,
           icon_url: childCategory.icon_url
       })
      if(cid > 0) {
           return this.success({'id': cid},'操作成功')
      }else {
           return this.fail('401','操作失败')
      }
  }
  /**
   * 获取子分类列表
   * */
  async getChildCategoryListAction() {
      //获取
      const maincategoryid = this.get('mid')
      const model = this.model('childcategory')
      const whereCondition =  {}
      if (maincategoryid > 0) {
          whereCondition.maincategory_id = maincategoryid
      }

      let data  = await model
          .alias('childcategory')
          .field('`childcategory`.*, `maincategory`.`category_name` as "main_category_name"')
          .join({
              table: 'maincategory',
              join: 'left',
              as: 'maincategory',
              on: ['`childcategory`.`maincategory_id`', '`maincategory`.`id`']
          }).where(whereCondition).select()
      if(!think.isEmpty(data)) {
          return this.success(data)
      }else {
          return this.fail('401','数据为空')
      }
  }
  /**
   * 根据子分类ID来获取信息
   * */
  async getChildCategoryListByIdAction () {
      // 获取子分类ID
      const cid = this.get('cid')
      const model = this.model('childcategory')
      let data = await model.where({id:cid}).find()
      if (!think.isEmpty(data)) {
          return this.success(data)
      } else {
          return this.fail('401', '查询失败')
      }
  }
  /**
   * 删除主分类
   * */
  async deleteMainCategoryByIdAction () {
      const mid = this.get('mid')
      const model = this.model('maincategory')
      let affectRows = await model.where({id:mid}).delete()
      if(affectRows > 0) {
          return this.success({}, '删除成功')
      } else {
          return this.fail('402','删除失败')
      }
  }

    /***
     * 删除子分类
     */
    async deleteChildCategoryByIdAction () {
        const cid = this.get('cid')
        const model = this.model('childcategory')
        let affectRows = await model.where({id:cid}).delete()
        if(affectRows > 0) {
            return this.success({}, '删除成功')
        } else {
            return this.fail('402', '删除失败')
        }
    }

    /**
     * 编辑子分类
     * */
    async editChildCategoryAction() {
        const childCategory = this.post()
        const model = this.model('childcategory')
        let affectRows =await model.where({id: childCategory.id}).update({
            category_name: childCategory.category_name,
            sort_index: childCategory.sort_index,
            is_show: childCategory.is_show,
            icon_url: childCategory.icon_url
        })
        if (affectRows > 0){
            return this.success({},'更新成功')
        } else {
            return this.fail('401','更新失败')
        }

    }

    /**
     * 获取主分类和相应子分类
     * */
    async getMainCategroyAndChildCategoryAction() {
       const model = this.model('maincategory')
       let data  = await model.setRelation({childcategory: think.Model.HAS_MANY}).select()
        if(!think.isEmpty(data)) {
           return this.success(data)
        } else {
           return this.fail('401', '获取失败')
        }


    }
}