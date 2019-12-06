module.exports = {
    mode: 'universal',
    env: {
        NODE_ENV: process.env.NODE_ENV
    },
    head: {
        title: 'TeeMo',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'msapplication-tap-highlight', content: 'no' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' }
        ],
        link: [
            { rel: 'SHORTCUT ICON', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
        ]
    },

    loading: { color: '#3B8070' },

    cache: false,

    build: {
        // vendor: ['axios', 'mint-ui'],
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },

    plugins: [
        { src: '~plugins/mint-ui', ssr: false },
        { src: '~assets/styles/index.less', ssr: false },
        { src: '@/plugins/index', ssr: false }
    ]
}
