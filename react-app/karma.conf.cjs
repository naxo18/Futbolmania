const webpack = require("webpack");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],

    files: [
      { pattern: "src/tests/setup.js", watched: false },
      { pattern: "src/tests/**/*.spec.jsx", watched: false },
      { pattern: "src/tests/**/*.spec.js", watched: false }
    ],

    preprocessors: {
      "src/tests/setup.js": ["webpack"],
      "src/tests/**/*.spec.jsx": ["webpack"],
      "src/tests/**/*.spec.js": ["webpack"]
    },

    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            resolve: {
              fullySpecified: false
            },
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    { targets: { browsers: ["last 2 Chrome versions"] } }
                  ],
                  ["@babel/preset-react", { runtime: "automatic" }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          }
        ]
      },
      resolve: {
        extensions: [".js", ".jsx"]
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("test")
        })
      ]
    },

    webpackMiddleware: {
      stats: "errors-only"
    },

    reporters: ["spec"],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["ChromeHeadlessNoSandbox"],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
      }
    },

    singleRun: true,
    concurrency: Infinity
  });
};
