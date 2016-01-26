var path = require("path");
var webpack = require("webpack");

module.exports = {

    entry: {
        "mw-sdk": "./src/core/main.js"
    },

    output: {
        path: path.join(__dirname, "./dist/"),
        publicPath: "./dist/",
        filename: '[name].js'
    },

    module: {
        //preLoaders: [{
        //    test: /\.js$/,
        //    exclude: /(node_modules|bower_components|libs)/,
        //    loader: 'jshint'
        //}],
        loaders:[
            { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel?presets[]=react,presets[]=es2015' },
            //{ test: /\.(jpg|png|gif)$/, loader: "url?limit=8192"},
            { test: /\.css$/, loader: 'style!css?:global' },
            { test: /\.scss$/, loader: 'style!css?modules!autoprefixer?browsers=last 10 versions!' }
            //{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&minetype=application/font-woff" },
            //{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" }
        ]
    },
    resolve: {
        root: [path.join(__dirname,  "./bower_components")]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
    //jshint : {
    //    reporter : require('jshint-loader-reporter')()
    //}
};
