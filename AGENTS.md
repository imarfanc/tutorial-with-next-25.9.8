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

## Styling with DaisyUI v5

This project uses **DaisyUI v5** with Tailwind CSS for styling. Here are the key guidelines:

### Core Design System
- **Theme**: Uses DaisyUI's semantic color system (primary, secondary, accent, neutral, base-100, etc.)
- **Components**: Leverages DaisyUI's pre-built components for consistency
- **Responsive**: Mobile-first design with responsive breakpoints
- **Theme switching**: Built-in dark/light theme support via data-theme attribute

### Component Patterns
- **Cards**: Use `card bg-base-100 shadow-xl` for main content containers
- **Buttons**: Semantic button classes like `btn-primary`, `btn-secondary`, `btn-outline`
- **Navigation**: `navbar`, `menu`, and `dropdown` components for navigation
- **Forms**: `input-bordered`, `textarea-bordered`, and `form-control` for forms
- **Loading**: `loading loading-spinner` for loading states
- **Alerts**: `alert alert-info/warning/error/success` for notifications

### Layout Structure
- **Hero sections**: `hero min-h-96` for prominent content areas
- **Stats**: `stats shadow` for displaying metrics and key numbers
- **Grid layouts**: Responsive grids using `grid md:grid-cols-2 lg:grid-cols-3`
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Container**: Main content wrapped in responsive containers

### Interactive Elements
- **Hover effects**: `hover:shadow-xl`, `hover:scale-105` for interactivity
- **Transitions**: `transition-all duration-300` for smooth animations
- **Focus states**: Built-in focus styles for accessibility
- **Dropdown menus**: `dropdown dropdown-end` for action menus

### Color Usage
- **Primary**: Main brand color for CTAs and important elements
- **Secondary**: Supporting actions and secondary information
- **Accent**: Highlights and special emphasis
- **Base colors**: Background and content colors that adapt to themes
- **Semantic colors**: Success, warning, error, and info for status indication

### Available Themes
The application supports multiple DaisyUI themes including:
- `light` (default)
- `dark`
- `cupcake`
- `synthwave`
- And 30+ other built-in themes

### Current Implementation Examples
- **Homepage**: Hero section with gradient backgrounds, feature cards with hover effects
- **Todo App**: Stats component, dropdown menus, alert components for empty states
- **Notes App**: Toggle buttons using join component, card layouts with proper spacing
- **Environment Reader**: Mockup code components, indicator badges, avatar placeholders
- **Database Explorer**: Tabs component, table layouts, loading spinners

### Styling Best Practices for This Project
1. **Consistency**: Always use DaisyUI semantic classes over custom CSS
2. **Responsiveness**: Use responsive prefixes (sm:, md:, lg:) for layouts
3. **Accessibility**: DaisyUI components include built-in ARIA attributes
4. **Performance**: Minimal custom CSS, leverage utility classes
5. **Maintainability**: Theme-aware colors that work in light and dark modes

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

## Git commit message guidelines

This project follows conventional commit standards for clear, consistent commit history:

### Commit Message Format
```
<type>(<scope>): <description>

<body>

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Commit Types
- **feat**: New feature or functionality
- **fix**: Bug fixes and corrections
- **docs**: Documentation changes only
- **style**: Code formatting, styling, or UI/UX improvements
- **refactor**: Code restructuring without behavior changes
- **perf**: Performance improvements
- **test**: Adding or modifying tests
- **chore**: Maintenance tasks, dependencies, build processes

### Scope Examples
- **ui**: User interface components and styling
- **api**: Server-side API routes and logic
- **env**: Environment configuration
- **notes**: Notes app functionality
- **todo**: Todo app functionality
- **kv**: Deno KV database operations

### Example Commit Messages
```bash
feat(todo): add edit-in-place functionality with dropdown menus
fix(api): resolve database connection timeout issues
style(ui): upgrade to DaisyUI v5 with theme switching
docs: add comprehensive styling guidelines to AGENTS.md
refactor(components): consolidate shared UI patterns
```

### Guidelines
1. **Keep the first line under 70 characters**
2. **Use imperative mood**: "add feature" not "added feature"
3. **Include scope when relevant**: helps identify which part of the app changed
4. **Add detailed body for complex changes**: explain the "why" not just the "what"
5. **Reference issues/PRs when applicable**: "closes #123" or "relates to #456"

## File structure guidelines

- **Pages**: `app/pages/` with .vue extension (auto-routed by Nuxt)
- **Components**: `app/components/` for reusable Vue components
- **API routes**: `server/api/[resource].[method].ts` pattern
- **Nested routes**: `server/api/[resource]/[id].[method].ts` for ID-based operations
- **Static assets**: `public/` directory for images, icons, etc.

### Styling Configuration Files
- **`assets/app.css`**: Main CSS entry point that imports Tailwind and DaisyUI
- **`tailwind.config.js`**: Tailwind and DaisyUI configuration
- **`nuxt.config.ts`**: Nuxt configuration including CSS imports
- **`app/app.vue`**: Root layout component with theme switching functionality

### Component Architecture
- **Layout**: `app/app.vue` provides the main navigation and footer
- **Page templates**: Keep pages minimal, delegate to components
- **Reusable components**: Use DaisyUI patterns for consistency
- **State management**: Use Vue's built-in reactivity with `ref()` and `reactive()`

## Dependencies and tools

- **Nuxt.js 4.x**: Vue framework with full-stack capabilities
- **TypeScript**: Type safety throughout the application
- **Tailwind CSS 4.x**: Utility-first CSS framework
- **DaisyUI v5**: Component library built on Tailwind CSS
- **Deno KV**: Serverless database for data persistence
- **Vue 3**: Reactive frontend framework with Composition API

### Styling Stack
- **Tailwind CSS**: Base utility framework for styling
- **DaisyUI v5**: Pre-built components and themes
- **Custom CSS**: Minimal custom styles, prefer DaisyUI components
- **Theme System**: Built-in theme switching with multiple available themes

## Security considerations

- Environment variables should be properly configured in .env files
- When working with Deno KV, ensure proper error handling for KV operations
- Validate user input in API routes
