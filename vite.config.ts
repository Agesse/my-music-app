import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    devtools(),
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg}']
      },
      manifest: {
        "name": "My Music App",
        "short_name": "My Music App",
        "description": "Permet de se tester au piano sur les accords de septième de jazz",
        "categories": ["education", "music"],
        "lang": "fr",
        "id": "my-music-app",
        "scope": "https://agesse.github.io/my-music-app/",
        "start_url": "https://agesse.github.io/my-music-app/",
        "theme_color": "#d68f84",
        "background_color": "#242220",
        "orientation": "portrait",
        "display": "fullscreen",
        "display_override": ["fullscreen", "standalone"],
        "screenshots": [
          {
            "src": "./img/screenshot.png",
            "type": "image/png",
            "sizes": "3199x2134",
            "form_factor": "wide"
          },
          {
            "src": "./img/screenshot.png",
            "type": "image/png",
            "sizes": "3199x2134"
          }
        ],
        "icons": [
          {
            "src": "./img/icon-192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "./img/icon-384.png",
            "type": "image/png",
            "sizes": "384x384",
            "purpose": "any"
          },
          {
            "src": "./img/icon-384-mask.png",
            "type": "image/png",
            "sizes": "384x384",
            "purpose": "maskable"
          },
          {
            "src": "./img/icon-512.png",
            "type": "image/png",
            "sizes": "512x512",
            "purpose": "any"
          },
          {
            "src": "./img/icon-512-mask.png",
            "type": "image/png",
            "sizes": "512x512",
            "purpose": "maskable"
          },
          {
            "src": "./img/icon-1024.png",
            "type": "image/png",
            "sizes": "1024x1024",
            "purpose": "any"
          },
          {
            "src": "./img/icon-1024-mask.png",
            "type": "image/png",
            "sizes": "1024x1024",
            "purpose": "maskable"
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  base: "/my-music-app/"
});
