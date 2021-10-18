const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const config = {
    target:'web',
    entry:path.join(__dirname, 'src/index.js'),
    output:{
        filename:"bundle.js",
        path:path.join(__dirname,'dist')
    },

    performance:{
        hints:'warning', //枚举
        maxAssetSize:300000, //整数类型（以字节为单位）
        maxEntrypointSize:500000, //整数类型（以字节为单位）
        assetFilter:function(assetFilename){
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
        }
    },
    module:{
        rules:[
            {
                test:/.vue$/,
                loader:'vue-loader'
            },
            {
            
                test:/.jsx$/,
                loader:'babel-loader'
            },
            // {
            //     test:/.css$/,
            //     // use可以接收数组
            //     use:[
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:30000,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            },

        ]
    },

    //process.env.NODE_ENV = development
    plugins:[
        new  webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"' :'"production"'
            }
        }),
        new HTMLPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename:'[id].css'
        })
    ],

    resolve:{
        extensions:['.js','','.css']
    }
}

if(isDev){
    config.module.rules.push({
        test:/\.styl/,
        use:[
            "style-loader",
            "css-loader",
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true,
                }
            },
            "stylus-loader"
        ]
    })
//    config.devtool = '#',
   config.devServer = {
       port:'8000',
       host:'0.0.0.0',
    //    overlay:{
    //        error:true,
    //    }

    //   historyFallback:{

    //   }

         hot:true,  //改了页面代码，仅仅会改变一个页面中的代码，而其他很多不需要
   }
   
   config.plugins.push(
       new webpack.HotModuleReplacementPlugin(),
       new webpack.NoEmitOnErrorsPlugin()
   )
   

}else{
    config.entry = {
        app:path.join(__dirname,'src/index.js'),
        vendor:["vue"]
    },
    config.output.filename = '[name].[chunkhash].8.js'
    config.module.rules.push({
        test:/\.(css|stylus)$/i,
        use:[
            "css-hot-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true,
                }
            },
            "stylus-loader",
        ]
    });

    config.plugins.push(
        new MiniCssExtractPlugin({
            　　filename: "[name].[chunkhash:8].css",
           　　 chunkFilename: "[id].css"
        }),

        new webpack.optimize.SplitChunksPlugin({
              name:'vendor'
        })
         
       
    );
    
}


module.exports = config;
