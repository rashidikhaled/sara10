// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const path = require("path")
const build = require("./build")
const packing = require("./build/compress-script")
// const zlib = require('zlib')
// const BrotliPlugin = require('brotli-webpack-plugin')
const webpack = require("webpack")

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: ["i18n", "startup", "translator"],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      // 'quasar.variables.scss',
      "app.scss"
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "material-icons" // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: "material-icons", // Quasar icon set
      lang: "fa-ir", // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      importStrategy: "auto",

      components: ["QDialog"],
      directives: ["ClosePopup"],

      // Quasar plugins
      plugins: ["Dialog", "Loading", "Notify", "Meta", "AppFullscreen", "BottomSheet"],
      cssAddon: true
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: false,

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      uglifyOptions: {
        minify: true,
        extractComments: true,
        // mangle: true,
        terserOptions: {
          format: {
            comments: false
          },
          compress: {
            drop_console: true,
            pure_funcs: ["console.info", "console.log", "console.warn"]
          }
        }
      }, // transpile: true,
      // scopeHoisting: true,
      vueRouterMode: "history",
      showProgress: true,
      rtl: true,
      gzip: true,
      analyze: true,
      preloadChunks: true,
      // extractCSS: true,
      publicPath: build.publicPath,
      // publicPath: '',
      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /[\\/]node_modules[\\/]/,
          options: {
            formatter: require("eslint").CLIEngine.getFormatter("stylish")
          }
        })
        // cfg.plugins.push(new webpack.PrefetchPlugin('vue'))
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias
          // Add your own alias like this
          config: path.resolve(__dirname, "./src/config"),
          store: path.resolve(__dirname, "./src/store"),
          utils: path.resolve(__dirname, "./src/utils"),
          src: path.resolve(__dirname, "./src")
        }

        const year = (new Date()).getFullYear()

        cfg.plugins.push(
          new webpack.BannerPlugin({
            banner: '©Safarayaneh company ' + year
          })
        )

        /* cfg.plugins.push(new BrotliPlugin({
          asset: '[path].gz',
          algorithm: 'gzip',
          test: /(vendor|app)\.(.*)\.(js|css)$/,
          threshold: 15240,
          minRatio: 0.7
        })) */
        /* cfg.plugins.push(new webpack.ids.HashedModuleIdsPlugin({
          context: __dirname,
          hashFunction: 'sha256',
          hashDigest: 'hex',
          hashDigestLength: 20
        })) */

        /* cfg.plugins.push(new BrotliPlugin({
          asset: '[path].br[query]',
          algorithm: 'brotli',
          test: /(vendor|app)\.(.*)\.(js|css)$/,
          threshold: 15240,
          minRatio: 0.7,
          quality: 11
        }))
        cfg.plugins.push(new BrotliPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /(vendor|app)\.(.*)\.(js|css)$/,
          threshold: 15240,
          minRatio: 0.7
        })) */

        // cfg.module.rules.push({
        //   test: /\.(png|svg|jpg|gif)$/,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         publicPath: '/public',
        //         name: '[name].[ext]'
        //       }
        //     }
        //   ]
        // })
        // cfg.module.rules.push({
        //   test: /\.(js)$/,
        //   use: [
        //     {
        //       loader: 'babel-loader'
        //     }
        //   ]
        // })
      },
      afterBuild ({ quasarConf }) {
        console.log("Packing...")
        packing().then((s) => {
          console.log("Packing is done.")
        })
      }
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      // https: true,
      port: 8036,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    // animations: 'none',

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
      extendPackageJson (pkg) {
        // directly change props of pkg;
        // no need to return anything
      },

      // -- @quasar/app v1.5+ --
      // optional; webpack config Object for
      // the Webserver part ONLY (/src-ssr/)
      // which is invoked for production (NOT for dev)
      extendWebpack (cfg, { isServer, isClient }) {
        // directly change props of cfg;
        // no need to return anything
      },

      // -- @quasar/app v1.5+ --
      // optional; EQUIVALENT to extendWebpack() but uses webpack-chain;
      // the Webserver part ONLY (/src-ssr/)
      // which is invoked for production (NOT for dev)
      chainWebpack (chain) {
        // chain is a webpack-chain instance
        // of the Webpack configuration
      }
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        name: build.appName,
        short_name: build.appName,
        description: build.appTitle,
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    // https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
        /* cfg.optimization.minimizer('terser').tap((args) => {
           args[0].terserOptions.output = {
             ...args[0].terserOptions.output,
             comments: false // exclude all comments from output
           }
           return args
         }) */
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'qt-proj'
      }
    }
  }
}
