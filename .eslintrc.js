module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
    ],
    env: {
        node: true,
        es2017: true
    },
    overrides: [
        {
            files: ['src/**'],
            parser: '@typescript-eslint/parser',
            plugins: [
                '@typescript-eslint',
            ],
            extends: [
                'plugin:@typescript-eslint/recommended'
            ],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': [0],
                '@typescript-eslint/no-explicit-any': [0]
            }
        }
    ]
};
