const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.--done
// TODO: Add CSS loaders and babel to webpack.--done

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js"
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "TODOs List"
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js"
      }),
      new WebpackPwaManifest({
        short_name: "Texter",
        name: "Texting App",
        icons: {
          src: "./src/images/logo.png",
          type: "image/png",
          sizes: [96, 128, 192, 512],
          purpose: "JATE logo",
          destination: path.join("client", "icons")
        },

        orientation: "portrait",
        description: "Keeping random notes handy",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        start_url: "./",
        publicPath: "./"
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime"
              ]
            }
          }
        }
      ]
    }
  };
};
