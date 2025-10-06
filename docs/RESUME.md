# SambaIQ Resume Playbook

Purpose: Make it trivial for any agent/dev to resume work.

## Branches
- Primary dev branch: `cursor2`
- Main remains protected; merge via PR

## CI/CD
- GitHub Actions workflow: `.github/workflows/eas-preview.yml`
- Triggers on pushes to `cursor2`
- Requires repo secret `EXPO_TOKEN`

## How to trigger a build
1. Push to `cursor2` or run the workflow manually in Actions.
2. Wait ~10-15 minutes for iOS Preview.
3. Install from Expo build page: `https://expo.dev/accounts/jappmaster/projects/sambaiq`

## Secrets
- `EXPO_TOKEN` is required for EAS builds.
- For auto-submit to TestFlight later, add App Store Connect API credentials as repo secrets.

## Current priorities
- Fix crash when starting first scenario.
- Set up cloud development environment for fast iteration.
- Prototype drawing-based answer system.

## Contact
- Tech lead: current agent handling infra and builds.
