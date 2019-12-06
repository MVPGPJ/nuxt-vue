let baseURL = ''
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://bt-app-dev.y8511.cn'
} else if (process.env.NODE_ENV === 'test') {
    baseURL = 'http://222'
} else if (process.env.NODE_ENV === 'presentation') {
    baseURL = 'http://333'
} else if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://444'
}

export default {
    BASE_URL: baseURL,
    HEADERS: {
        // 'Content-Type': 'application/json'\
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    TIMEOUT: 15000 // api超时时间
}
