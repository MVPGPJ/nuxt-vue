module.exports = {
    root: true,
    env: {
        node: true,
        es6: true, // 额外支持新的 ES6 全局变量
        browser: true // 在代码中可以放心使用宿主环境给你提供的全局变量
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error', 4],
        'space-infix-ops': 'error', // 要求操作符周围有空格
        'comma-spacing': 'error', // 逗号后面加空格
        'arrow-spacing': 'error', // 使用 => 前后空格
        'spaced-comment': 'warn', // 注释风格，前后留一个空格
        'no-irregular-whitespace': 'error', // 不能有不规则的空格
        'no-mixed-spaces-and-tabs': 'error', // 不能混用空格和tab
        'no-multiple-empty-lines': 'error', // 不能有多余的空行
        'no-var': 'error', // 不能使用var
        'eqeqeq': 'error', // 使用全等
        'quotes': [1, 'single'], // 引号类型，使用单引号
        'no-new': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6, // 启用 ES6 语法支持
        sourceType: 'module'
    },
    globals: { // 声明在代码中自定义的全局变量
    }
}
