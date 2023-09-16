/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        97: '26rem',
        98: '28rem',
        '12/10': '120%'
      },
      colors: {
        ob: 'var(--text-accent)',
        'ob-normal': 'var(--text-normal)',
        'ob-trans': 'var(--background-trans)',
        'ob-backdrop': 'var(--background-backdrop)',
        'ob-accent-55': 'var(--bg-accent-55)',
        'ob-secondary': 'var(--text-sub-accent)',
        'ob-bright': 'var(--text-bright)',
        'ob-invert': 'var(--text-invert)',
        'ob-dim': 'var(--text-dim)',
        'ob-deep': {
          800: 'var(--background-secondary)',
          900: 'var(--background-primary)'
        },
        'ob-screen': 'var(--app-screen-bg)'
      },
      boxShadow: {
        ob: 'var(--accent-shadow)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
