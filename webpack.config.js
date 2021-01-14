const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        entry: path.resolve(__dirname, 'src', 'app.js'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'public','dist'),
        },
        mode: 'development',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname,'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties'],
                        },
                    },
                },
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: (resourcePath, context) => {
                                    return (
                                        path.relative(path.dirname(resourcePath), context) + '/'
                                    );
                                },
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css',
            }),
        ],
    };
};