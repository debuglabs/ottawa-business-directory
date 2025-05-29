import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  let base = '/';
  if (mode === 'production') {
    // If building for production, and you intend to deploy to a subpath,
    // use the subpath. This will be picked up by the abc.com proxy.
    // For the direct netlify.app URL, the Netlify environment variable
    // will override this, setting base to '/'.
    base = '/ottawa-business-directory/';
  }
  if (process.env.VITE_APP_BASE_URL) {
    base = process.env.VITE_APP_BASE_URL;
  }
  return {
    base: base,
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
