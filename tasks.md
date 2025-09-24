# Deployment Workflow & Version Bump Tasks

## Pre-deployment Tasks
- [ ] Check current project status and ensure all changes are committed
- [ ] Run type checking to ensure no TypeScript errors
- [ ] Run linting (if configured)
- [ ] Run tests (if available)

## Version Management
- [ ] Bump version number in package.json (from 1.0.1 to 1.0.2)
- [ ] Update any version references in code or documentation if needed

## Build & Deploy
- [ ] Run build command to generate production assets
- [ ] Verify build completed successfully
- [ ] Check for any build warnings or errors
- [ ] Deploy to production environment
- [ ] Verify deployment completed successfully

## Post-deployment Verification
- [ ] Test the deployed application using Chrome DevTools MCP
- [ ] Verify all API endpoints are working (especially /api/notes)
- [ ] Test core functionality (adding, viewing, editing notes)
- [ ] Check console for any errors
- [ ] Confirm the new version is reflected in the deployed app

## Cleanup
- [ ] Commit any remaining changes
- [ ] Tag the release with the new version number
- [ ] Update deployment documentation if needed