module.exports = {
    devServer: {
        proxy: 'http://vxut-app.test/api/'
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/frontend-vxut-app/' // Thay tên repository của các bạn vào đây nhé
        : '/'
}