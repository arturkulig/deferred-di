var path = require('path');

module.exports = {
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
                loader: 'uglify',
            },
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
};
