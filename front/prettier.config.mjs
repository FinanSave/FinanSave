export default {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  semi: false,
  endOfLine: 'auto',
  plugins: [await import('prettier-plugin-tailwindcss')],
}
