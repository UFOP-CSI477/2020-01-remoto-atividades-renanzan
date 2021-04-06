const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');

module.exports = {
    ...withCSS({
        cssModules: true,
        webpack: function (config) {
            config.module.rules.push({
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: '[name].[ext]'
                    }
                }
            });

            return config;
        }
    }),
    ...withFonts({
        webpack(config) {
            config.module.rules.push({
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                issuer: {
                    test: /\.(js|ts)x?$/,
                },
                use: ['@svgr/webpack'],
            });

            return config;
        },
    })
};
