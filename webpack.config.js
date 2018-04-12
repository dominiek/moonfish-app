const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "[name]-[hash].css"
});

const isProduction = process.argv.indexOf("-p") >= 0;
const ENV = isProduction ? "production" : "development";

const plugins = [
  new webpack.ProvidePlugin({
    fetch:
      "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
  }),
  new webpack.DefinePlugin({
    ENV: JSON.stringify(ENV),
    PRODUCTION_HOSTNAME: JSON.stringify("moonfish.one"),
    STAGING_HOSTNAME: JSON.stringify("moonfish-staging.one"),
    "process.env": {
      // for react building https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
      NODE_ENV: JSON.stringify(ENV)
    }
  }),
  new HtmlWebpackPlugin({
    chunks: ["vendor", "app"],
    template: "src/App/index.html",
    filename: "index.html"
  }),
  new HtmlWebpackPlugin({
    chunks: ["vendor", "admin"],
    template: "src/Admin/index.html",
    filename: "admin.html"
  }),
  // This is necessary to emit hot updates (currently CSS only):
  new webpack.HotModuleReplacementPlugin(),
  extractLess
];

module.exports = {
  devtool: isProduction ? "source-maps" : "cheap-module-source-map",
  entry: {
    app: ["./src/App/index"],
    admin: ["./src/Admin/index"],
    vendor: [
      "babel-polyfill",
      "react",
      "mobx",
      "react-router-dom",
      "mobx-react",
      "react-dom",
      "semantic-ui-react"
    ]
  },
  output: {
    publicPath: "/",
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  resolve: {
    alias: {
      "../../theme.config$": path.resolve(
        path.join(__dirname, "src"),
        "theme/theme.config"
      )
    },
    extensions: [".js", ".json", ".jsx"],
    modules: [path.join(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          fallback: {
            loader: "style-loader"
          },
          use: ["css-loader", "less-loader"]
        })
      },
      {
        test: /\.(eot|png|jpg|ttf|svg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(pdf)$/,
        loader:
          "file-loader?name=[name].[ext]&outputPath=downloads/&publicPath=downloads/"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(md)$/,
        use: "raw-loader"
      }
    ]
  },
  plugins
};
