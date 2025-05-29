import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const appBase = mode === 'development' ? '/' : '/ottawa-business-directory/';

  // console.log debugging is good, keep it for now
  console.log('Vite config mode:', mode);
  console.log('Vite config calculated appBase:', appBase);
  return {
    base: appBase,
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
