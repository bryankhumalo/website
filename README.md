# Christofa's — Contemporary Greek Cuisine

A static HTML/CSS/JS website for **Christofa's**, redesigned to match the authentic brand materials (illustrated logo poster, printed menu designs, food photography, and taverna setting).

## Brand & Design System

- **Identity**:
  - Brand mark: Cameo oval medallion featuring the chef profile in deep navy ink.
  - Brand poster: Cerulean blue artwork with standing apron-clad chef and classical Greek uncial lettering.
  - Tagline: *Contemporary Greek Cuisine*.
- **Palette**:
  - **Parchment / Mediterranean Alabaster** (`#FBF7EE` / `#F3EBDB`): Authentic warm menu paper stock base.
  - **Aegean Navy Ink** (`#0E2A47`): Primary headings, borders, and brand typography.
  - **Greek Cobalt Blue** (`#0077D8` / `#005FA8`): Action buttons, interactive states, and logo accent.
  - **Terracotta** (`#C85A32`): Warm accent drawn from the outdoor candleholder.
  - **Olive Green** (`#5B6F45`): Herb & olive branch decorative accents.
- **Motifs & Artwork**:
  - Repeating seamless Greek Key meander borders (`greek-key.svg` and `greek-key-blue.svg`).
  - Hand-drawn vintage engraved olive branch vignettes (`olive-sprig.png`).
- **Photography (Curated from original brand assets)**:
  - `dish-keftedes-table.jpg`: Properly oriented outdoor taverna table setting with terracotta candle, wine glasses, napkins, and keftedes dish.
  - `dish-pork-skewer.jpg`: Charcoal-grilled pork belly skewer with smoked potato mash and charred green beans.
  - `dish-keftedes-close.jpg`: Close-up of keftedes meatballs with sheep's milk tzatziki and pickled pink shallots.
  - `dish-keftedes-flatlay.jpg`: Meze table presentation with bronze cutlery and artisan tableware.
  - `dish-keftedes-stone.jpg`: Overhead flatlay on stone with seafoam green plate.
  - `menu-food-sheet.jpg`: High-resolution scan of the authentic printed food menu.
  - `menu-cocktail-sheet.jpg`: High-resolution scan of the authentic printed cocktail list.
  - `chef-poster.jpg`: The full illustrated brand poster.

## Pages

1. **`index.html` (Home)**:
   - Sticky header with cameo medallion and responsive mobile navigation.
   - Hero section featuring the sunlit outdoor taverna setting.
   - Quick reservation widget (guests, date, time) linking into the booking flow.
   - From the Pass: 3 featured dishes with photography, prices, and descriptions.
   - Philosophy & Heritage: Brand poster spotlight with wood-fire cooking ethos.
   - Cocktail Spotlight: Top cocktail highlights.
   - Full footer with hours, address, direct telephone, and email.

2. **`menu.html` (Menu & Cocktails)**:
   - Interactive category filter tabs (All, Small Plates, Mains, Desserts, Cocktails).
   - Complete accurate menu transcribed directly from the printed cards.
   - High-resolution modal lightbox allowing guests to inspect the original printed menus.
   - Dietary badges (V, GF, Signature).

3. **`our-story.html` (Our Story)**:
   - The heritage of Christofa's from family kitchen to Cape Town harbour.
   - The culinary philosophy: wood fire, coastal line fish, olive oil, and herbs.
   - The spirit of *Philoxenia* (Greek hospitality).

4. **`book.html` (Reservations)**:
   - 3-step interactive booking flow:
     - Step 1: Party size selector pills, date picker, lunch & dinner time slots, seating area preference.
     - Step 2: Guest details (Full Name, Phone, Email, Special Requests).
     - Step 3: Verified reservation ticket with unique reference (`CHR-XXXXX`), summary table, and print button.
   - 100% XSS-safe (uses `textContent`).
   - Saved to `localStorage`.

5. **`contact.html` (Location & Hours)**:
   - Full visiting hours: Tuesday – Sunday, 12:00 – 22:00 (Closed Mondays).
   - Address: 123 Harbour Road, Waterfront, Cape Town.
   - Phone, Email, and WhatsApp contact details.
   - Interactive OpenStreetMap and Google Maps directions link.
   - Guest Guide: Parking, dress code, corkage policy, private dining.

## Local Testing

You can preview the website locally using any static file server:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000` in your web browser.
