const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    // static: path.join(__dirname, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 8080,
    open: true
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', 'css'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'client',
      filename: 'remoteEntry.js',
      exposes: {
        './Chat': './src/Chat.jsx',
        './Test': './src/Test.jsx',
      },
      remotes: {
        'home': 'home@http://localhost:8081/remoteEntry.js',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        }
      }
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
