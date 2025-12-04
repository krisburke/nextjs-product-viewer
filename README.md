# Product Listing Application

A Next.js-based product listing demo featuring search, filtering, pagination, and accessible modal interactions.

Built to demonstrate modern React and Next.js patterns for data fetching, state management, and UI composition.

**Preview on CodeSandbox:** [Open Project](https://codesandbox.io/p/github/krisburke/nextjs-product-viewer)  
**Template used:** [Next.js Starter Template](https://codesandbox.io/templates/nextjs)

## Features

### Core

- Product grid showing image, title, price, and description
- Fetches products from [DummyJSON API](https://dummyjson.com/products)
- Debounced search (250 ms) with URL-synced query
- Pagination (10 / 50 / 100 items per page)
- Accessible modal implementation using semantic HTML and keyboard support
- User-friendly error handling and retry
- Performance optimizations for rendering and data fetching

### Extras

- URL-based state so filters and pagination persist when sharing/bookmarking
- Category filters (Living Room, Office, Decor, Kitchen, Bath)
- Responsive layout using Tailwind CSS

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Framework**: React 19 + TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching:** TanStack React Query
- **Package Manager:** pnpm

## Project Structure

```
app/
├── common/          # Shared UI + hooks
├── features/
│   └── products/    # Product components, hooks, lib
├── lib/             # Global utilities
├── providers/       # React context
├── styles/          # Global CSS
├── layout.tsx       # Root layout + error boundary
└── page.tsx         # Product listing page
```

## Getting Started

**Requirements:** Node 18+, pnpm 10+

```bash
pnpm install   # Install dependencies
pnpm dev       # Start dev server
```

Then open http://localhost:3000

### Other scripts

```
pnpm build     # Production build
pnpm start     # Run production server
pnpm lint      # Lint with ESLint
pnpm format    # Format with Prettier
```

## API

Uses [DummyJSON](https://dummyjson.com):

| Endpoint                        | Description              |
| ------------------------------- | ------------------------ |
| `/products`                     | Fetch paginated products |
| `/products/search`              | Search by query          |
| `/products/category/{category}` | Filter by category       |
