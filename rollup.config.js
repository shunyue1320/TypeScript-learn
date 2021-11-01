import path from 'path'
import serve from 'rollup-plugin-serve'
import ts from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.ts',
  output: {
    format: 'iife',
    file: path.resolve('dist/index.js'),
    sourcemap: true
  },
  plugins: [
    nodeResolve({ // Rollup 插件，用于在 node_modules 中使用第三方模块
      extensions: [ '.js', '.ts' ]
    }),
    ts({   // ts 打包配置
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    serve({ // rollup 开启端口服务
      open: true,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: ''
    })
  ]
}