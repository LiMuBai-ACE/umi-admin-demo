module.exports = {
    outputPath: '/dist', // 修改打包路径
    antd: {
        dark: false,
    },
    publicPath: '/',
    manifest: {
        basePath: '/',
    },
    hash: true, // 开启哈希模式 生产文件后缀名带有哈希值 避免浏览器缓存
    history: { type: 'browser' },
    devtool: false, // devtool: 'source-map',//生成map文件 devtool: 'eval',
    dva: {
        immer: true, // 表示是否启用 immer 以方便修改 reducer
        hmr: true, // 表示是否启用 dva model 的热更新
    },
    targets: {
        ie: 11,
    },
    nodeModulesTransform: {
        type: 'none',
    },
    theme: {},
    ignoreMomentLocale: true,
};
