import { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
        averta: ['AvertaStd', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        j1: extendFontSize('4xl', {
          fontWeight: '700',
        }),
        j2: extendFontSize('3xl', {
          fontWeight: '700',
        }),
        h1: extendFontSize('2xl', {
          fontWeight: '600',
        }),
        h2: extendFontSize('xl', {
          fontWeight: '600',
        }),
        h3: extendFontSize('lg', {
          fontWeight: '600',
        }),
        h4: extendFontSize('base', {
          fontWeight: '700',
        }),
        h5: extendFontSize('base', {
          fontWeight: '600',
        }),
        h6: extendFontSize('sm', {
          fontWeight: '600',
        }),
        s1: extendFontSize('lg', {
          fontWeight: '500',
        }),
        s2: extendFontSize('base', {
          fontWeight: '500',
        }),
        s3: extendFontSize('sm', {
          fontWeight: '500',
        }),
        s4: extendFontSize('xs', {
          fontWeight: '500',
        }),
        b1: extendFontSize('lg', {
          fontWeight: '400',
        }),
        b2: extendFontSize('base', {
          fontWeight: '400',
        }),
        b3: extendFontSize('sm', {
          fontWeight: '400',
        }),
        c1: extendFontSize('xs', {
          fontWeight: '400',
        }),
        c2: [
          '11px',
          {
            lineHeight: '14px',
            fontWeight: '400',
          },
        ],
      },
      colors: {
        primary: {
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          //* Background
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          //* Complement
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          //* Default
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          //* Hovered
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          //* Active
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        },
        secondary: {
          50: '#EFF9F8',
          //* Background
          100: '#E8F4F3',
          200: '#E0F3F1',
          //* Complement
          300: '#D0EDEB',
          400: '#A2DBD7',
          //* Default
          500: '#40A69F',
          //* Hovered
          600: '#3B9993',
          //* Active
          700: '#2F7A75',
          800: '#235C58',
          900: '#173D3A',
        },
        typo: {
          DEFAULT: '#1F1F1F',
          secondary: '#707070',
          tertiary: '#999CA0',
          icons: '#999CA0',
          divider: '#EBEBEB',
          outline: '#D9D9D9',
        },
        dark: '#222222',
        light: '#F5F5F5',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
} satisfies Config;

function extendFontSize(
  variant: keyof typeof defaultTheme.fontSize,
  extend: Partial<{
    lineHeight: string;
    letterSpacing: string;
    fontWeight: string | number;
  }>
): (typeof defaultTheme.fontSize)[typeof variant] {
  return [
    defaultTheme.fontSize[variant][0],
    {
      ...defaultTheme.fontSize[variant][1],
      ...extend,
    },
  ];
}
