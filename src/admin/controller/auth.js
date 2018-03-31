const Base = require('./base.js')

module.exports = class extends Base {
    /**
     * 登录
     * */
    async loginAction () {
        const acc = this.post('acc')
        const key = this.post('key')
        let admin = await this.model('admin').where({acc: acc}).find()
        if (think.isEmpty(admin)) {
            return this.fail(400, '用户名或密码不正确')
        }
        if (think.md5(key) !== admin.key) {
            return this.fail(400, '用户名或密码不正确')
        }
        // 更新登录信息
        await this.model('admin').where({id: admin.id}).update({
            lastlogintime: new Date().getTime()
        })
        const TokenService = this.service('token', 'admin')
        const sessionKey =  await TokenService.create({
            admin_id: admin.id
        })
        if (think.isEmpty(sessionKey)) {
            return this.fail(401, '登录失败')
        }
        const adminInfo = {
            id: admin.id,
            acc: admin.acc,
            roles: admin.roles
        }
        return this.success({ token: sessionKey, admin: adminInfo})
    }
    /**
     *  获取管理员列表
     * */
    async getAdminsAction () {
        const admin_model =  this.model('admin')
        let data = await admin_model.select()
        if (!think.isEmpty(data)) {
            return this.success(data)
        } else {
            return this.fail(401, '获取数据失败')
        }
    }

    /**
     *  添加管理员
     * */
    async addAdminAction () {
        const admindata = this.post()
        admindata.created = new Date().getTime()
        admindata.key =  think.md5(admindata.key)
        const admin_model = this.model('admin')
        let id = await admin_model.add(admindata)
        if (id > 0) {
            return this.success({},'创建成功')
        } else {
            return this.fail('401', '创建失败')
        }
    }
}