# Nuxt with Tailwind CSS, daisyUI, and Deno KV Todo App Starter

This project is a minimal starter for Nuxt 3 integrated with Tailwind CSS, daisyUI for styling, and Deno KV for database storage. It follows the tutorial for installing daisyUI in a Nuxt project and has been extended into a fully functional Todo App. This serves as a starting point for future Nuxt apps using daisyUI and Deno KV.

The project is deployed on Deno Deploy, and the production URL is: https://tutorial-with-next-2598.arfan.deno.net/

## Project Structure

```
.
├── app/
│   ├── app.vue                    # Main app component
│   ├── assets/
│   │   └── app.css               # Tailwind CSS and daisyUI imports
│   ├── components/
│   │   ├── EnvApp.vue            # Environment variables reader
│   │   ├── NotesApp.vue          # Notes management component
│   │   └── TodoApp.vue           # Todo list component
│   └── pages/
│       ├── components-test.vue    # DaisyUI components showcase
│       ├── env.vue               # Environment variables page
│       ├── index.vue             # Homepage
│       ├── kv-data.vue           # Database explorer
│       ├── notes.vue             # Notes application
│       └── todo.vue              # Todo application
├── server/
│   └── api/
│       ├── env.get.ts            # Environment variables API
│       ├── kv-data.get.ts        # Database browser API
│       ├── kv-data.delete.ts     # Database entry deletion
│       ├── notes/
│       │   ├── [id].delete.ts    # Delete note by ID
│       │   └── [id].put.ts       # Update note by ID
│       └── todos/
│           ├── [id].delete.ts    # Delete todo by ID
│           └── [id].put.ts       # Update todo by ID
├── docs/
│   └── deno-kv-apis.md          # API documentation
├── nuxt.config.ts               # Nuxt configuration with Tailwind CSS
├── package.json                 # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

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

### 3. Configure Nuxt with Tailwind CSS and Deno Runtime

Update [`nuxt.config.ts`](nuxt.config.ts) to include the Tailwind Vite plugin, CSS file, and Nitro preset for Deno:

```js
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/app.css"],
  nitro: {
    preset: "deno",
  },
  devtools: { enabled: true },
});
```

### 4. Add Tailwind CSS and daisyUI to CSS

Create or update [`app/assets/app.css`](app/assets/app.css) with the following content (remove any old styles):

```postcss
@import "tailwindcss";
@plugin "daisyui";
```

Now you can use daisyUI class names in your components!

## Todo App Features

This starter includes a complete Todo App with:

- **Add Todos**: Enter text and add new todos.
- **View List**: Display all todos fetched from Deno KV.
- **Edit Todos**: Click edit to inline edit the todo text, then save or cancel.
- **Delete Todos**: Delete individual todos.
- **Styling**: Uses daisyUI components like cards, buttons, and inputs for a clean UI.

The app uses Nuxt's `useFetch` for client-side API calls to `/api/todos` for all CRUD operations.

## Setting Up Deno KV for Deployment

To use Deno KV for data persistence on Deno Deploy:

1. Log in to your [Deno Deploy dashboard](https://deno.com/deploy).
2. Navigate to "Databases" and click "Add Database".
3. Choose "Deno KV" as the engine, provide a name, and save.
4. From the databases list, click "Assign" next to your database and select this app.
5. Deno Deploy will provision separate databases for each environment (production, branches, etc.) automatically.
6. Monitor the status until it shows "Connected".

**Note**: Locally, Deno KV uses in-memory storage. On deploy, it connects to the assigned database automatically via `await Deno.openKv()` in server routes. No manual configuration needed in code.

For more details, see the [Deno KV documentation](https://docs.deno.com/deploy/databases/kv/).

## Usage

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

Start the development server on `http://localhost:3000`. Note: Local development uses in-memory KV; data won't persist across restarts.

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


## Deployment

This project is deployed on [Deno Deploy](https://deno.com/deploy). To deploy your own version:

1. Push your code to a GitHub repository.
2. Connect the repository to Deno Deploy.
3. Assign a Deno KV database to the app (see above).
4. Configure deployment settings (e.g., build command: `npm run build`, output directory: `.output/public` for static deployment).

For more details, check the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) and [Deno Deploy docs](https://docs.deno.com/deploy/getting-started/).

## API Routes

The todo functionality uses these server routes:

- `GET /api/todos`: Fetch all todos.
- `POST /api/todos`: Add a new todo.
- `PUT /api/todos/:id`: Update a todo.
- `DELETE /api/todos/:id`: Delete a todo.

All routes use Deno KV for storage.

This setup provides a clean foundation for building Nuxt apps with daisyUI and Deno KV. Customize as needed for your projects!
