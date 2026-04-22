/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}",
  ],
  darkMode: 'class', // Quan trọng để hỗ trợ dark mode
  theme: {
    extend: {
      // ==================== COLORS ====================
      colors: {
        accent: {
          DEFAULT: '#0A2540',     // Xanh dương đậm chính
          light: '#60A5FA',       // Xanh dương sáng (dùng cho hover, accent text)
          dark: '#1E40AF',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e2937',
          900: '#0f172a',
          950: '#020617',
        },
      },

      // ==================== FONTS ====================
      fontFamily: {
        sans: ['Inter', 'system_ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      // ==================== ANIMATION ====================
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        'marquee-fast': 'marquee 25s linear infinite',
        'typing': 'typing 4s steps(40, end) infinite',
        'blink': 'blink-caret .75s step-end infinite',
      },

      keyframes: {
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        },
        typing: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#60A5FA' },
        },
      },

      // ==================== UTILITIES ====================
      maxWidth: {
        'site': '96rem', // max-w-[96rem] như bạn dùng trước đây
      },

      boxShadow: {
        'soft': '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        'card': '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)',
      },

      // Gradient hỗ trợ tech feel
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A2540 0%, #1E40AF 50%, #3B82F6 100%)',
        'glass': 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(241,245,249,0.7))',
      },
    },
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.nav-pill': {
          '@apply px-6 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200': {},
        },
        '.nav-pill--active': {
          '@apply bg-[#0A2540] text-white dark:bg-[#60A5FA] dark:text-slate-950': {},
        },
        '.nav-pill--idle': {
          '@apply hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400': {},
        },
      });
    },
  ],
}