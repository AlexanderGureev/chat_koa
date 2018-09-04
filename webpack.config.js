const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
const mode = process.env.NODE_ENV || "development";
const rootDir = {
    dev: path.join(__dirname, "frontend", "dev"),
    dist: path.join(__dirname, "frontend", "dist")
};

module.exports = {
    // watch: true,
    // watchOptions: {
    //     aggregateTimeout: 100
    // },
    mode: mode,
    devtool: mode === "development" ? "eval-source-map" : false,
    entry: {
        home: [path.join(rootDir.dev, "js", "home", "index.js")],
        chat: [path.join(rootDir.dev, "js", "chat", "index.js")]
    },
    output: {
        path: rootDir.dist,
        filename: "js/[name].bundle.js",
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
          chunks: "all",
        //   name: false
        }
    },
    plugins: [
        new CleanWebpackPlugin([rootDir.dist]),
        new CopyWebpackPlugin([
            {
              from: path.join(rootDir.dev, "img"),
              to: path.join(rootDir.dist, "img")
            }
        ]),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(rootDir.dev, "index.html"),
            filename: "index.html",
            chunks: ["home"]
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(rootDir.dev, "chat.html"),
            filename: "chat.html",
            chunks: ["chat"]
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            //_: "lodash"
        }),
        //new BundleAnalyzerPlugin()
    ],
    resolve: {
        alias: {
            root: path.resolve(__dirname, "node_modules")
        },
        modules: ["node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react", "stage-0"]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "img/",
                        publicPath: "../img/"
                    }
                  },
                  {
                    loader: "image-webpack-loader",
                    options: { },
                  }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                        publicPath: "../fonts/"
                    }
                  }
                ]
            },
        ]
    }
};


// module.exports = (env, argv) => {
//     config.devtool = argv.mode === "development" 
//                                     ? "eval-source-map" 
//                                     : false;
//     return config;
// }