'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = process.env.VUE_APP_PROJECT_TITLE || 'Diamond App' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9666 npm run dev OR npm run dev --port = 9666
const port = process.env.port || process.env.npm_config_port || 9666 // dev port

// All configuration item explanations
// can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'source',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
      '/assets': {
        target: 'http://localhost:4000/assets',
        changeOrigin: true,
        pathRewrite: { '^/assets': '' }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's title field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      // htmlWebpackPlugin
      // https://github.com/jantimon/html-webpack-plugin
      config.plugin('html').tap(args => {
        args[0].filename = path.resolve(__dirname, './layout/index.ejs')
        args[0].template = path.resolve(__dirname, './public/index_prod.html')
        return args
      })

      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })

      config.optimization.runtimeChunk('single')

      // CopyWebpackPlugin Configs
      // https://github.com/webpack-contrib/copy-webpack-plugin
      config.plugin('copy').tap(args => {
        args[0][0].to = path.resolve(__dirname, './source')
        args[0][0].ignore = ['.*', '*.html']
        return args
      })
    })
  }
}
