module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        'design-cyan': 'var(--design-cyan)',
        'dark-violet': 'var(--dark-violet)',
        'design-red': 'var(--design-red)',
        'design-gray': 'var(--design-gray)',
        'grayish-violet': 'var(--grayish-violet)',
        'very-dark-blue': 'var(--very-dark-blue)',
        'very-dark-violet': 'var(--very-dark-violet)'
      },

      zIndex: {
        '1': '1',
      },

      spacing: {
        '90': '90%',
        '50': '50%'
      }
    },
  },
  plugins: [],
}
