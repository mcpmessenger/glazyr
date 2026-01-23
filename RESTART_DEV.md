# Restart Dev Server

The compilation was stuck. Here's how to restart:

## Quick Restart

```powershell
cd glazyr-main
npm run dev
```

## If It Stuck Again

1. **Kill the process**: Press `Ctrl+C` in the terminal running `npm run dev`

2. **Clean cache**:
   ```powershell
   cd glazyr-main
   Remove-Item -Path .next -Recurse -Force
   ```

3. **Restart**:
   ```powershell
   npm run dev
   ```

## Expected Output

You should see:
```
▲ Next.js 16.0.10
- Local:        http://localhost:3000
- Ready in Xs

✓ Starting...
✓ Ready in [time]
```

If it takes longer than 2-3 minutes, there might be an issue. Check for:
- TypeScript errors
- Missing dependencies
- Port 3000 already in use

## Alternative: Use Production Build

If dev server keeps having issues:

```powershell
npm run build
npm start
```

This uses the production build (slower to start but more stable).
