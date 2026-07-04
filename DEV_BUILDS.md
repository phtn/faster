 
 Wait for that Android build to finish.
   - If it succeeds, install the APK/AAB from the EAS build page and smoke-test the app.
   - If it fails, pull the build log and fix the repo-side issue.

2. Commit the EAS setup once the build is good.
   - Important because the repo has a lot of unrelated existing changes/deletions; I’d keep the commit scoped to `app.json`, `eas.json`, `package.json`, `bun.lock`, and `eslint.config.js`.

3. Build the development client if you want native dev iteration:
   ```bash
   bun run eas:build:dev -- --platform android
   ```

4. Add iOS once Apple credentials/distribution are decided:
   ```bash
   bun run eas:build:preview -- --platform ios
   ```

5. For store release later:
   ```bash
   bun run eas:build:production -- --platform android
   bun run eas:build:production -- --platform ios
