module.exports = {
  root: true,
  env: { node: true },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'prettier/prettier',
        'plugin:react/jsx-runtime'
      ],
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      plugins: ['react', 'prettier'],
      overrides: [
        {
          files: ['*.spec.js', '*.spec.jsx', '**/test-support/**/*.js'],
          env: {
            jest: true
          }
        }
      ]
    },
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
      },
      plugins: ['@typescript-eslint', 'import', 'prettier'],
      extends: [
        'airbnb-base',
        'airbnb-typescript',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'prettier/prettier'
      ],
      rules: {
        'no-underscore-dangle': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'no-console': 'error',

        // clashes with no-floating-promises
        'no-void': 'off',

        // codelens does this for us
        '@typescript-eslint/lines-between-class-members': 'off',

        '@typescript-eslint/no-unused-vars': [
          'warn',
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
        ]
      },
      overrides: [
        // non production code is more relaxed
        {
          files: ['*.spec.ts'],
          rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'import/no-extraneous-dependencies': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            'no-underscore-dangle': 'off',
            '@typescript-eslint/naming-convention': 'off',
            'func-names': 'off',
            'no-console': 'off'
          }
        }
      ]
    },
    {
      files: ['cypress/**/*.*', 'cypress.config.ts'],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
        'chai-friendly',
        'prettier',
        'cucumber',
        'import'
      ],
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:chai-friendly/recommended',
        'plugin:prettier/recommended',
        'prettier/prettier'
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
      },
      rules: {
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'cucumber/async-then': 'off',
        'cucumber/expression-type': 2,
        'cucumber/no-restricted-tags': [2, 'wip', 'broken', 'foo'],
        'cucumber/no-arrow-functions': 2,
        'func-names': 'off',
        'no-console': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    }
  ],
  settings: {
    react: {
      version: '17'
    }
  }
};
