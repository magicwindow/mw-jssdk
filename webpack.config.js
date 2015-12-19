var activityName = 'misc';
var path = require("path");
var webpack = require("webpack");

module.exports = {

    entry: {
        "main": "./app/scripts/main.js",
        "start": "./app/scripts/start.js",
        "end": "./app/scripts/end.js",
        "register": "./app/scripts/register.js",
        "choice": "./app/scripts/choice.js",
        "rank": "./app/scripts/rank.js",
        "share": "./app/scripts/share.js"
    },

    output: {
        path: path.join(__dirname, "./app/js/"),
        publicPath: "./app/js/",
        filename: '[name].js'
    },

    module: {
        //preLoaders: [{
        //    test: /\.js$/,
        //    exclude: /(node_modules|bower_components|libs)/,
        //    loader: 'jshint'
        //}],
        loaders:[
            { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.(jpg|png|gif)$/, loader: "url?limit=8192"},
            { test: /\.css$/, loader: 'style!css?:global' },
            { test: /\.scss$/, loader: 'style!css?modules!autoprefixer?browsers=last 10 versions!' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" }
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
