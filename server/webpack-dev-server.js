const webpack = require('webpack');
const config = require('../webpack.config');
const webpackDevServer = require('webpack-dev-server');

config.entry.unshift('webpack-dev-server/client', 'webpack/hot/dev-server');
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);
module.exports = new webpackDevServer(compiler, {
    contentBase: './target/www',
    stats: { colors: true },
    historyApiFallback: true,
    inline: true,
    hot: true
});
