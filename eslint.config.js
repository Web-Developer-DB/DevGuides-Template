import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tailwindcss from 'eslint-plugin-tailwindcss'

const reactRecommended = reactPlugin.configs.recommended?.rules ?? {}
const reactJsxRuntime = reactPlugin.configs['jsx-runtime']?.rules ?? {}
const jsxA11yRecommended = jsxA11y.configs.recommended?.rules ?? {}

const commonRules = {
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  'jsx-a11y/anchor-is-valid': 'off',
  'tailwindcss/classnames-order': 'warn',
  'tailwindcss/enforces-shorthand': 'warn',
  'tailwindcss/no-custom-classname': 'off',
}

export default [
  {
    ignores: ['dist', 'node_modules'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      tailwindcss,
    },
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl'],
        config: 'tailwind.config.js',
      },
    },
    rules: {
      ...reactRecommended,
      ...reactJsxRuntime,
      ...jsxA11yRecommended,
      ...commonRules,
    },
  },
]
