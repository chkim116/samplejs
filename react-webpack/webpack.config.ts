import { Configuration } from "webpack";
import "webpack-dev-server"; // Configuration에 devServer Type 추가
import HTMLWebpackPlugin from "html-webpack-plugin";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

type NODE_ENV = "production" | "development";

const mode = (process.env.NODE_ENV || "development") as NODE_ENV;

const config: Configuration = {
    name: "client",
    target: "web", // "web"으로 설정하면 hotreloading 적용됨.
    mode,
    entry: {
        client: "./src/index.tsx", // 번들 대상
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    browsers: ["> 5% in KR"],
                                    node: "current",
                                },
                                modules: "auto",
                                useBuiltIns: "usage",
                                corejs: 3,
                            },
                        ],
                    ],
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.resolve(process.cwd(), "build"),
            publicPath: "/",
        },
        open: true,
        port: 5500,
        historyApiFallback: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(process.cwd(), "public/index.html"),
        }),
    ],
    resolve: {
        extensions: [".js", ".ts", ".tsx"], // 대상 파일 확장명
    },
    output: {
        filename: "client.js", // 번들 후 파일 이름
        path: path.resolve(process.cwd(), "build"), // 번들 후 저장
        publicPath: "/web/",
    },
};

export default config;
