const jwt = require('jsonwebtoken')
const secret = 'HDLJDYLLZSX#@@@123'

module.exports = class extends think.Service {
    async create (admin) {
        const token = jwt.sign(admin, secret)
        return token
    }
    async parse () {
        if (think.token) {
            try {
                return jwt.verify(think.token, secret)
            } catch (err) {
                return null
            }
        }
        return null
    }
    async verify () {
        const result = await this.parse()
        if (think.isEmpty(result)) {
            return false
        }
        return true
    }
    /**
     * 根据传入的Header中X-MAuth-Token值获取用户ID
     * */
    async getAdminId() {
        const token = think.token
        if (!token) {
            return 0
        }
        const result = await this.parse()
        if (think.isEmpty(result) || result.admin_id <= 0) {
            return  0
        }
        return result.admin_id
    }
}
