var path = require('path');
var webpack = require('webpack');

var config = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: __dirname + '/dist',
        filename: 'deferred-di.js',
        library: 'deferred-di',
        libraryTarget: 'umd',
    },
    externals: {
        immutable: 'immutable',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0'],
                },
            },
        ],
    },
    devtool: 'source-map',
    plugins: []
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true,
            warnings: false
        }
    }));
}

module.exports = config;
