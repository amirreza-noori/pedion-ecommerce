import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginCheckFile from 'eslint-plugin-check-file';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const baseDirectory = dirname(filename);

const compat = new FlatCompat({ baseDirectory });

const eslintConfig = [
  { ignores: ['.next/**'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mts'],
    plugins: {
      'react-refresh': eslintPluginReactRefresh,
      import: eslintPluginImport,
      'check-file': eslintPluginCheckFile,
    },
    rules: {
      'no-console': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'no-trailing-spaces': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-underscore-dangle': 'error',
      'import/no-unresolved': 'error',
      'react-refresh/only-export-components': ['error', { allowExportNames: ['metadata'] }],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/api/*'],
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{d.ts,test.tsx,test.ts,mock.ts,mock.tsx,stories.tsx,config.ts}': '[a-z][a-zA-Z.]*',
          '**/[^.]+.[^.]+': 'CAMEL_CASE',
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'app/**': 'NEXT_JS_APP_ROUTER_CASE',
          'public/**': 'KEBAB_CASE',
          '!(app|public|node_modules|.next|.)/**': 'CAMEL_CASE',
        },
      ],
    },
  },
];

export default eslintConfig;
