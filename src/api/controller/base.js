module.exports = class extends think.Controller {
    async __before() {
        this.header('Access-Control-Allow-Origin', '*');
        this.header('Access-Control-Allow-Headers', '*');
        this.header('Access-Control-Allow-Methods', 'GET,POST');
        if(this.method === 'OPTIONS') {
            this.ctx.status = 200;
            return false;
        }
    }
}