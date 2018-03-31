const Base  = require('./base.js');
const uploadConfig = require('../config/upload-config')
const qiniu = require('qiniu')


module.exports =  class extends Base {
    /**
     *  上传凭证
     * */
    async uploadAuthAction () {
        // 获取传入的Post参数
        const uploadFileName = this.post('fileName')
        // 七牛服务器鉴权
        const defaultDomain = uploadConfig.qiniuConfig.default_domain;
        const bucket = uploadConfig.qiniuConfig.bucket;
        const accessKey =  uploadConfig.qiniuConfig.accessKey;
        const secretKey = uploadConfig.qiniuConfig.secretKey;
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const options = {
            scope: bucket,
            expires: 24 * 60 * 60,
            returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        return this.success({uploadToken: uploadToken, fileName: uploadFileName, defaultDomain: defaultDomain })

    }

    /**
     * 删除文件
     * */
    async deleteFileAction () {
        // 获取文件名(key)
        const key = this.get('key')
        // 构建BucketManage对象
        const bucket = uploadConfig.qiniuConfig.bucket
        const accessKey = uploadConfig.qiniuConfig.accessKey
        const secretKey = uploadConfig.qiniuConfig.secretKey
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        var config = new qiniu.conf.Config()
        config.zone = qiniu.zone.Zone_z0
        var bucketManager = new qiniu.rs.BucketManager(mac, config)
        // 删除文件
        try{
            var result =bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                }
            })
            return this.success({},'删除成功')
        } catch(e) {
            return this.fail('402','删除失败')
        }
    }
}