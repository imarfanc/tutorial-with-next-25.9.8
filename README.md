# Nuxt with Tailwind CSS and daisyUI Starter

This project is a minimal starter for Nuxt 3 integrated with Tailwind CSS and daisyUI. It follows the tutorial for installing daisyUI in a Nuxt project and serves as a starting point for future Nuxt apps using daisyUI.

The project is deployed on Deno Deploy, and the production URL is: https://tutorial-with-next-2598.arfan.deno.net/

## Project Structure

- `nuxt.config.ts`: Nuxt configuration with Tailwind CSS Vite plugin.
- `app/assets/app.css`: Tailwind CSS and daisyUI imports.
- `app/app.vue`: The main app component (minimal for now).
- Standard Nuxt files for setup.

## Installation and Setup

This project was created following these steps:

### 1. Create a new Nuxt project

Run the following command in the current directory to initialize a new Nuxt project:

```sh
npx nuxi@latest init
```

### 2. Install Tailwind CSS and daisyUI

Install the required packages:

```sh
npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest
```

### 3. Configure Nuxt with Tailwind CSS

Update [`nuxt.config.ts`](nuxt.config.ts) to include the Tailwind Vite plugin and CSS file:

```js
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/app.css"],
});
```

### 4. Add Tailwind CSS and daisyUI to CSS

Create or update [`app/assets/app.css`](app/assets/app.css) with the following content (remove any old styles):

```postcss
@import "tailwindcss";
@plugin "daisyui";
```

Now you can use daisyUI class names in your components!

## Usage

With daisyUI installed, you can apply its component classes directly in your Vue templates. For example, in [`app/app.vue`](app/app.vue), you could add:

```vue
<template>
  <div class="btn btn-primary">Hello daisyUI!</div>
</template>
```

Refer to the [daisyUI documentation](https://daisyui.com/docs/install/) for available components and themes.

For more on Nuxt, see the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction).

## Setup Dependencies

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview the production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Deployment

This project is deployed on [Deno Deploy](https://deno.com/deploy). To deploy your own version:

1. Push your code to a GitHub repository.
2. Connect the repository to Deno Deploy.
3. Configure the deployment settings (e.g., build command: `npm run build`, output directory: `.output/public` for static deployment).

For more details, check the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) and [Deno Deploy docs](https://docs.deno.com/deploy/getting-started/).

This setup provides a clean foundation for building Nuxt apps with daisyUI. Customize as needed for your projects!
