module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  trailingComma: 'all',
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  singleQuote: false,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
};
