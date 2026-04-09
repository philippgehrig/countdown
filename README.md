# Gina Countdown Website

A playful countdown website built with **Nuxt 3**, **Vue 3**, **TypeScript**, and **Tailwind CSS**.

The site tracks the time until your reunion on **19 June 2026** with a clean, focused countdown layout.

## Features

- Live countdown (days, hours, minutes, seconds)
- Progress bar and dynamic countdown status messages
- Responsive design for desktop and mobile
- Legal pages: Privacy Policy, Legal Notice, Terms of Use, and Sitemap
- Existing CI/CD setup kept in place (tests, CodeQL, Docker workflow)

## Project Structure

```
├── components/
│   └── layout/           # Navbar + Footer
├── pages/
│   ├── index.vue         # Main countdown page
│   └── policies/         # Legal pages
├── public/               # Static assets
├── tests/
│   └── components/layout # Navbar tests
└── .github/workflows/    # CI + Docker workflows
```

## Setup

### Prerequisites

- Node.js v22+
- Yarn

### Installation

```bash
yarn install
```

## Development

Start local development server:

```bash
yarn dev
```

## Build and Preview

```bash
yarn build
yarn preview
```

## Testing

```bash
yarn test
```

Coverage:

```bash
yarn test:coverage
```

## Quick Customization

- Change reunion date in `pages/index.vue` (`reunionDate` constant)
- Edit daily mission text in `pages/index.vue` (`forecastOptions`)
- Tweak look and feel in `tailwind.config.js` and `app.vue`
