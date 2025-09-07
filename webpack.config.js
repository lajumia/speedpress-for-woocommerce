const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

// Admin configuration
const adminConfig = {
  ...defaultConfig,
  entry: {
    index: "./admin/src/index.jsx", // Admin React entry point
  },
  output: {
    path: path.resolve(__dirname, "admin/build"),
    filename: "[name].js",
  },
};

// Public configuration
const publicConfig = {
  ...defaultConfig,
  entry: {
    index: "./public/src/index.jsx", // Public React entry point
  },
  output: {
    path: path.resolve(__dirname, "public/build"),
    filename: "[name].js",
  },
};

module.exports = [adminConfig, publicConfig];
