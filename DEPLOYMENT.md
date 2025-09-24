# Deployment Guide

This project is configured to deploy automatically to Deno Deploy using GitHub Actions.

## Automatic Deployment

The project uses GitHub Actions for CI/CD. On every push to the `main` branch:

1. **Build and Test Job**:
   - Installs dependencies
   - Runs type checking with `nuxi typecheck`
   - Builds the project with `npm run build`
   - Verifies build artifacts

2. **Deploy Job** (only on main branch):
   - Rebuilds the project
   - Deploys to Deno Deploy using deployctl

## Setup Requirements

### GitHub Repository Secrets

To enable automatic deployment, you need to configure the following secret in your GitHub repository:

1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following secret:

   - `DENO_DEPLOY_TOKEN`: Your Deno Deploy access token
     - Get this from [Deno Deploy Dashboard](https://dash.deno.com/account#access-tokens)
     - Click "New Access Token" and copy the generated token

### Deno Deploy Project Configuration

The GitHub Action expects:
- **Project Name**: `tutorial-with-next-2598` (update in `.github/workflows/deploy.yml` if different)
- **Entry Point**: `.output/server/index.mjs` (Nuxt's server build output)

## Manual Deployment Commands

For local development and testing:

```bash
# Build the project locally
npm run deploy:build

# Build and preview locally
npm run deploy:preview

# Run full deployment check (build + instructions)
npm run deploy
```

## Deployment Workflow

1. **Development**: Work on feature branches
2. **Testing**: Push to branches other than `main` to run build/test checks
3. **Deployment**: Merge to `main` to trigger automatic deployment
4. **Monitoring**: Check deployment status in GitHub Actions and Deno Deploy dashboard

## Current Configuration

- **Version**: 1.0.1
- **Platform**: Deno Deploy
- **Build Output**: `.output/server/index.mjs`
- **Production URL**: https://tutorial-with-next-2598.arfan.deno.net/
- **Repository**: https://github.com/imarfanc/tutorial-with-next-25.9.8.git

## Troubleshooting

### Build Failures
- Check GitHub Actions logs for detailed error messages
- Ensure all dependencies are properly listed in `package.json`
- Verify TypeScript types are correct with `npm run typecheck`

### Deployment Failures
- Verify `DENO_DEPLOY_TOKEN` is correctly set in repository secrets
- Check Deno Deploy project name matches the one in the workflow file
- Ensure the project is properly linked to the GitHub repository in Deno Deploy dashboard

### Database Issues
- Deno KV database should be automatically provisioned and connected
- Check Deno Deploy dashboard for database status
- Ensure the database is assigned to the correct project environment