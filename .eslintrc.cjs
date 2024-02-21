module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'standard-with-typescript'
  ],
  ignorePatterns: ['dist', '**/*.cjs', '**/*.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: './'
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
