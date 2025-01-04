import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Colors for badges
	'bg-gray-100', 
    'bg-blue-100', 'bg-blue-200', 'text-gray-800',
    'bg-green-100', 'bg-green-200', 'text-green-800',
    'bg-purple-100', 'bg-purple-200', 'text-purple-800',
    'bg-indigo-100', 'bg-indigo-200', 'text-indigo-800',
    'bg-yellow-100', 'bg-yellow-200', 'text-yellow-800',
    'bg-red-100', 'bg-red-200', 'text-red-800',
    'bg-pink-100', 'bg-pink-200', 'text-pink-800',
    'bg-orange-100', 'bg-orange-200', 'text-orange-800',
    'bg-teal-100', 'bg-teal-200', 'text-teal-800',
    'bg-cyan-100', 'bg-cyan-200', 'text-cyan-800',
    'bg-emerald-100', 'bg-emerald-200', 'text-emerald-800',
    'bg-sky-100', 'bg-sky-200', 'text-sky-800',
    'bg-violet-100', 'bg-violet-200', 'text-violet-800',
    'bg-slate-100', 'bg-slate-200', 'text-slate-800',
    'bg-rose-100', 'bg-rose-200', 'text-rose-800',
    'bg-amber-100', 'bg-amber-200', 'text-amber-800',
    'bg-lime-100', 'bg-lime-200', 'text-lime-800',
    'bg-fuchsia-100', 'bg-fuchsia-200', 'text-fuchsia-800',
    // Hover variants
	'hover:bg-gray-200',
    'hover:bg-blue-200', 'hover:bg-green-200', 'hover:bg-purple-200',
    'hover:bg-indigo-200', 'hover:bg-yellow-200', 'hover:bg-red-200',
    'hover:bg-pink-200', 'hover:bg-orange-200', 'hover:bg-teal-200',
    'hover:bg-cyan-200', 'hover:bg-emerald-200', 'hover:bg-sky-200',
    'hover:bg-violet-200', 'hover:bg-slate-200', 'hover:bg-rose-200',
    'hover:bg-amber-200', 'hover:bg-lime-200', 'hover:bg-fuchsia-200'
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
