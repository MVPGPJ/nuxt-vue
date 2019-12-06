import axios from 'axios'
import Vue from 'vue'
import hostConfig from './config'
const baseUrl = hostConfig.apiHost
const apiConfig = axios.create({
    // 设置超时时间
    timeout: 10000,
    // 请求的baseUrl
    baseURL: baseUrl,
    // 请求头部信息
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    // 请求参数转换
    transformRequest: [function (data) {
        let ret = ''
        for (const it in data) {
            if (data[it] === 0 || (data[it] || data[it] === '') || data[it] === false) {
                if (ret !== '') ret += '&'
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            }
        }
        return ret
    }]
})

// 请求拦截
apiConfig.interceptors.request.use(config => {
    // Vue.prototype.$Toast.loading({
    //     loadingType: 'spinner',
    //     message: '加载中...',
    //     duration: 0
    // })
    if (!config.data) {
        config.data = {}
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截
apiConfig.interceptors.response.use(res => {
    if (res.data.code === '2001') {
        // 特殊处理
    } else if (res.data.code === '-1') {
        Vue.prototype.$Toast(res.b || '请求失败')
    } else {
        Vue.prototype.$Toast.clear()
    }
    let json = res.data
    if (typeof json === 'string') {
        json = JSON.parse(json)
    }
    return json
}, err => {
    Vue.prototype.$Toast('服务器异常，请稍后重试')
    return Promise.reject(err)
})

export function createAPI (url, method, data) {
    const config = {
        method: method,
        url: url,
        data
    }
    return apiConfig(config)
}
