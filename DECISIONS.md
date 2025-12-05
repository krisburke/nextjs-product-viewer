# Decisions

## Overview

Overall when making decisions, I was balancing two goals:

1. completing the feature requirements in a straightforward way that demonstrates understanding of the fundamentals, and
2. choosing patterns that would scale well in a larger application without introducing unnecessary complexity for this small demo.

I chose a feature-based folder structure with shared utilities because it keeps related code co-located, makes features easier to navigate, and scales more cleanly than grouping by type (global `/components`, `/hooks`, etc.)

For state management, search, pagination, and filters sync to the URL using small custom hooks. More complex state libraries weren’t needed; URL state keeps everything in one place, creates predictable behavior, enables sharing/bookmarking, and allows browser back/forward navigation to work naturally.

## CSR vs SSR

(edited to add clarification on this decision)

I chose to use client-side rendering primarily to make the user interactions feel responsive, such as the search and dynamic pagination. If the requirements had mentioned SEO or if this were an actual E-Commerce site then SSR would be more appropriate. The initial page load could be improved by SSR, but the pagination and search would feel less interactive, and there would be a full page reload.


## Data Fetching

I began with a simple `fetch` implementation since the app only had one endpoint. However, I shifted to React Query because it provided clear benefits with almost no overhead:

- The retry button on error became trivial (`refetch()` instead of custom logic).
- Debounced search behavior integrates cleanly because React Query cancels stale requests automatically.
- Built-in loading and error states remove a lot of boilerplate.
- Caching and deduplication improve perceived performance.

To reduce payload size, product requests use `select=` to fetch only the fields needed by the UI.

I used `limit` and `skip` for true server pagination, along with the API’s search/query parameters, since these features were available and avoided loading the entire dataset at once.

## Product Grid

Next.js’s `<Image />` component provides automatic lazy loading and image optimization, so images only load as they enter the viewport.

The most impactful optimization was memoizing `ProductCard`. With up to 100 cards, preventing unnecessary re-renders matters:

- Opening/closing the modal no longer forces the entire grid to re-render.
- Each card re-renders only when its own props change.

I also memoized other components (e.g., `PaginationControls`) that benefit from stable props.

I chose not to implement list virtualization because pagination keeps the visible list small enough, and adding virtualization would introduce unnecessary complexity for this dataset size.

## Filtering and Search

I used lodash.debounce because it is simple, reliable, and handles timing/cancellation edge cases well. I placed the debounced logic inside the `useSearch` hook so:

- The input updates immediately for responsiveness
- Only the fetch-triggering portion is delayed
- The debounce logic stays encapsulated rather than scattered across UI components

I added category filters because they were shown in the design. DummyJSON’s categories didn’t align perfectly, so I introduced a small mapping layer to produce results that made sense for the UI.

The API doesn’t support combining category filters and search queries in one request. Because of that limitation:

- If a search term is present, the app falls back to “all products”
- Selecting a category clears the search term

This avoids confusing or inconsistent filtering behavior.

## Product Modal

I implemented a custom modal to demonstrate understanding of accessible modal patterns: focus trapping, ESC to close, and closing on backdrop click. Although a custom modal is appropriate for an assignment, in production I would typically use a headless UI library (Radix, Headless UI) because they provide robust accessibility and cross-browser handling.

The modal doesn’t have its own route, but that would be a natural enhancement in a larger app to support deep linking and improved navigation.

I imported the modal with `dynamic()` so it loads only when needed. While the component is lightweight for this demo, this pattern demonstrates awareness of bundle splitting.

## Other

Potential improvements for a production version include:

- Comprehensive tests (unit tests for utilities and hooks, integration/E2E tests for user flows)
- Using route-based state for the modal, as mentioned earlier
