# FarmConnect – Updated Frontend
live link :https://vinaykanoje.github.io/FarmConnect/
This package contains the refreshed FarmConnect frontend demo.

## Changes in this version

1. **Attractive green agricultural theme** with improved cards, buttons, shadows, spacing and hover effects.
2. **Farm background is visible across the site** with a readable translucent overlay.
3. **How It Works redesigned** as a four-step visual timeline with icons and CTA buttons.
4. **7-language selector works site-wide**: English, Hindi, Marathi, Gujarati, Punjabi, Bengali and Telugu. Common page text is translated automatically and dynamic product controls respond to language changes.
5. **Products and Marketplace are now different**:
   - Products = category/product catalog.
   - Marketplace = live farmer listings with search, location, category and price filters.
6. **Register page now has a clear Sign in link** and Login page has a Create account link.
7. **Added an attractive FarmConnect SVG site icon/favicon**.
8. **Improved marketplace and authentication UI** while keeping the existing frontend-demo structure.

## Latest update

1. **Theme switcher** – 🎨 selector in the navbar: Green (default), Dark, Harvest and High Contrast. The choice is saved and applies on every page (`js/theme.js`, theme block at the end of `css/style.css`).
2. **Voice assistant on every page** (`js/voice.js`) – big 🎤 button at bottom-right in all 7 languages:
   - say commands such as *sell crop, orders, marketplace, cart, login, dark theme, Hindi, read page, help*
   - **Read page** reads the whole page aloud and highlights each line
   - a 🔊 button on every card, title and form field reads it aloud; a 🎤 button beside text boxes fills them by voice
   - **Guide** mode reads each field/button name when it is selected
   - Works best in Chrome / Edge (needs microphone permission; Hindi/Marathi/etc. voices depend on the device)
3. **For Farmers page** – the four feature blocks now sit side by side (2 per row on tablets, 1 on phones).
4. Fixed a bug in `js/language.js` that stopped non-English auto-translation from running.

## Run locally

Open `index.html` directly in a browser, or use a local server such as VS Code Live Server.

## Main folders

- `assets/` – logo, farm background and new site icon
- `css/` – global theme
- `js/` – language, cart, voice and validation logic
- `farmer/` – farmer screens
- `retailer/` – retailer screens
- `admin/` – admin screens
