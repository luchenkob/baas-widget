const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {

  return {

    entry: "./src/index.js",
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/env",
              {
                plugins: [
                  '@babel/plugin-proposal-class-properties'
                ]
              }
            ],
          }

        },
        {
          test: /\.scss$/,
          loaders: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-prefixer')({ prefix: 'baasZcx-' })
                ]
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            },
          ]
        },
        {
          test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader'
        }
      ]
    },
    node: {
      fs: "empty"
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      path: path.resolve("./dist/assets"),
      publicPath: "./assets/",
      filename: "com.elsten.bliss.baas.widget.js",
      library: 'baasWidget',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    devServer: {
      contentBase: "./src/",
      port: 3000,
      publicPath: "/assets/",
      hotOnly: true,
      before(app, server, compiler) {
        const watchFiles = ['.html', '.js', '.jsx', 'scss'];

        compiler.plugin('done', () => {
          const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

          if (
            this.hot &&
            changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))
          ) {
            server.sockWrite(server.sockets, 'content-changed');
          }
        });
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        endpoint: JSON.stringify(argv.endpoint),
        rules: JSON.stringify(argv.rules)
      }),
    ],
  }
};
