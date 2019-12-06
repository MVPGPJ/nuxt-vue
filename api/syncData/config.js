// 不同环境的请求配置
const prodConfigs = {
    '192.168.31.37': {
        apiHost: 'http://www-dev.y8511.cn'
    },
    '172.16.17.48': {
        apiHost: 'http://www-dev.y8511.cn'
    },
    // 开发
    'app-h5.dev.y8511.cn': {
        apiHost: 'http://www-dev.y8511.cn'
    },
    // 测试
    'app-h5.test.y8511.cn': {
        apiHost: 'http://www-test.y8511.cn'
    },
    // 预发
    'app-h5-pre.y8511.cn': {
        apiHost: 'https://www-pre.y8511.cn'
    },
    // 线上
    'app-h5.y8511.cn': {
        apiHost: 'https://www.y8511.cn'
    }
}
// 本地默认
// const devConfig = {
//     apiHost: '',
//     domain: '',
//     staticHost: '',
//     vconsole: true
// }
const hostConfig = prodConfigs[location.hostname]
if (hostConfig) {
    window.baseUrl = hostConfig.apiHost
}
export default hostConfig
