/* eslint-disable */
import { build } from 'esbuild'
// import eslint from 'esbuild-plugin-eslint'
import {glob} from 'glob'
const files = await glob('appsync/**/*.ts')

await build({
  format: 'esm',
  target: 'esnext',
  platform: 'node',
  external: ['@aws-appsync/utils'],
  outdir: 'out/appsync',
  entryPoints: files,
  bundle: true,
//   plugins: [eslint({ useEslintrc: true })],
})