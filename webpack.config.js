const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: "./src/js/main.js",
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader', },
                    { loader: 'css-loader' }
                ],
                exclude : /node_modules/
            },
            {
                test: /\.(sass|scss)$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }],
                exclude : /node_modules/
              }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({ template: './index.html' })
    ],
    // watch: true
}