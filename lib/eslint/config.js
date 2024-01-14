import * as path from 'path'

const configPkgName = 'eslint-config-moyi'
const configPkgPath = {
  javascript: '',
  'javascript/vue': 'vue',
  'javascript/react': 'react',
  typescript: '',
  'typescript/vue': 'vue',
  'typescript/react': 'react'
}

const needDeps = {
  javascript: ['eslint', 'babel-eslint', 'eslint-config-moyi'],
  typescript: ['typescript', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser'],
  vue: ['eslint-plugin-vue', 'eslint-plugin-parser'],
  react: ['eslint-plugin-react', 'eslint-plugin-react-hooks']
}

const eslintrcConfig = (type) => ({
  extends: path.join(configPkgName, configPkgPath[type])
})

module.exports = {
  eslintrcConfig,
  needDeps
}
