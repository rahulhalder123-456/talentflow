
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='hsl(var(--border)/0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in-up': {
          '0%': {
              opacity: '0',
              transform: 'translateY(10px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0)'
          },
        },
        'spin-slow': {
          '0%': { transform: 'rotateY(0deg) rotateX(0deg)' },
          '100%': { transform: 'rotateY(360deg) rotateX(360deg)' },
        },
        'orbit-1': {
          '0%': { transform: 'rotateZ(0deg) rotateX(60deg) rotateY(0deg)' },
          '100%': { transform: 'rotateZ(360deg) rotateX(60deg) rotateY(0deg)' },
        },
        'orbit-2': {
          '0%': { transform: 'rotateZ(0deg) rotateX(60deg) rotateY(60deg)' },
          '100%': { transform: 'rotateZ(360deg) rotateX(60deg) rotateY(60deg)' },
        },
        'orbit-3': {
          '0%': { transform: 'rotateZ(0deg) rotateX(60deg) rotateY(120deg)' },
          '100%': { transform: 'rotateZ(360deg) rotateX(60deg) rotateY(120deg)' },
        },
        'pulse-slow': {
          '50%': { opacity: '.5' },
        },
        'scroll-y': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
        'scroll-y-reverse': {
          from: { transform: 'translateY(-50%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'spin-slow': 'spin-slow 15s linear infinite',
        'orbit-1': 'orbit-1 5s linear infinite',
        'orbit-2': 'orbit-2 5s linear infinite 0.5s',
        'orbit-3': 'orbit-3 5s linear infinite 1s',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll-y-slow': 'scroll-y 80s linear infinite',
        'scroll-y-medium': 'scroll-y 60s linear infinite',
        'scroll-y-fast': 'scroll-y 40s linear infinite',
        'scroll-y-reverse-slow': 'scroll-y-reverse 80s linear infinite',
        'scroll-y-reverse-medium': 'scroll-y-reverse 60s linear infinite',
        'scroll-y-reverse-fast': 'scroll-y-reverse 40s linear infinite',
      },
      // Add boxShadow extension here
      boxShadow: {
        'glow': '0 0 8px rgba(255,255,255,0.2), 0 0 24px rgba(255,0,255,0.3)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        '.transform-style-preserve-3d': {
          'transform-style': 'preserve-3d',
        },
      });
    },
  ],
} satisfies Config;
