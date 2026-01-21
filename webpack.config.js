const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Helper to create config for admin & public
const createConfig = (name, entryPath, outputPath) => ({
  ...defaultConfig,
  entry: { [name]: entryPath },
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: "[name].bundle.js",
  },
  resolve: {
    ...defaultConfig.resolve,
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      ...defaultConfig.module.rules,
      // TypeScript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // CSS (Tailwind + PostCSS)
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    ...(defaultConfig.plugins || []),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css", // final CSS file name
    }),
  ],
});

module.exports = [
  createConfig("admin", "./admin/src/app.tsx", "admin/build"),
  createConfig("public", "./public/src/app.tsx", "public/build"),
];
