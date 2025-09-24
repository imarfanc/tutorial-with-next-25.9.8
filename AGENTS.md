# AGENTS.md

## Deployment and testing workflow

- Commit changes: `git commit -m "Your commit message"`
- Push changes: `git push`
- Wait 45 seconds for deployment to complete
- Test at: `https://tutorial-with-next-2598.arfan.deno.net/`

## Project overview

This is a Nuxt.js tutorial project built with TypeScript. It demonstrates several features including:

- Environment variable handling
- Deno KV integration for data storage
- Todo application functionality
- Notes application functionality

The project follows a standard Nuxt.js structure with:

- `app/` directory for Vue components and pages
- `server/` directory for API routes
- `public/` directory for static assets

## Code style

- TypeScript strict mode enabled
- Follow the existing code patterns and conventions
- Use composition API patterns in Vue components
- Maintain consistent naming conventions (camelCase for variables, PascalCase for components)
- Use async/await for asynchronous operations

## Testing instructions

- Currently no formal test suite is set up
- Manual testing can be done by running the dev server and testing each feature:
  - Environment variables: Visit `/env` to see environment variable handling
  - Todo functionality: Visit `/todo` to test CRUD operations
  - Notes functionality: Visit `/notes` to test CRUD operations
  - KV data: Visit `/kv-data` to test Deno KV integration

## Development workflow

- When adding new features, create both the page component in `app/pages/` and corresponding API routes in `server/api/`
- Follow the existing pattern for API routes (GET, POST, PUT, DELETE)
- Use the existing components as reference for styling and structure
- Update the navigation in `app/app.vue` when adding new pages

## File structure guidelines

- Pages go in `app/pages/` with the .vue extension
- Reusable components go in `app/components/`
- API routes follow the pattern `server/api/[resource].[method].ts`
- For nested routes with ID parameters, use `server/api/[resource]/[id].[method].ts`
- Static assets go in `public/`

## Dependencies and tools

- Nuxt.js for the Vue framework
- TypeScript for type safety
- Deno KV for data persistence
- No additional UI library is used - styling is custom CSS

## Security considerations

- Environment variables should be properly configured in .env files
- When working with Deno KV, ensure proper error handling for KV operations
- Validate user input in API routes
