import { Configuration } from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import path from "path";

const config: Configuration = {
    target: "node",
    mode: "development",
    entry: "./editor.ts",
    devtool: "eval",
    module: {
        rules: [
            {
                test: /.ts$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-typescript"],
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(process.cwd(), "index.html"),
        }),
    ],
    output: {
        filename: "main.js",
        path: path.resolve(process.cwd(), "dist"),
        publicPath: "/",
    },
};

export default config;
