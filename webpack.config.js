const webpack = require('webpack');
const HtmlWebpakPlugin = require('html-webpack-plugin');
const path = require('path');
const NODE_ENV = process.argv.indexOf('--optimize-minimize') > -1 ? 'production' : 'development';

module.exports = {
    entry: './src',

    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: 'app.js'
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            {test: /\.css$/, loader: 'style!css!postcss'}
        ]
    },

    plugins: [
        new HtmlWebpakPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        })
    ],

    postcss: function(webpack) {
        return [
            require('postcss-import')({
                addDependencyTo: webpack
            }),
            require('precss', {import: false}),
            require('autoprefixer')
        ];
    },

    devServer: {
        contentBase: 'build'
    }
}
