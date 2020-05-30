const path = require("path");

module.exports = {
  entry: "./src/player.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },
  ],
};
