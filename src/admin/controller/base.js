module.exports = class extends think.Controller {
  async __before() {
      this.header('Access-Control-Allow-Origin', '*');
      this.header('Access-Control-Allow-Headers', '*');
      this.header('Access-Control-Allow-Methods', 'GET,POST');
      if (this.method === 'OPTIONS') {
          this.ctx.status = 200;
          return false;
      }
      // 获取token值
      think.token = this.header('x-mauth-token')
      const tokenService = this.service('token', 'admin')
      think.admin_id = await tokenService.getAdminId()
      // // 只允许登录操作
      if (this.ctx.action !== 'login') {
          if (think.admin_id <= 0) {
              return this.fail(401, '请先登录')
          }
      }
  }
}