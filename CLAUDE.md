# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IATAMA is a business website for a water treatment and environmental management company based in Mérida, Yucatán, Mexico. The site is built using Bootstrap 5.3.3 with the "Multi" template from BootstrapMade as the foundation, featuring a quotation system for water treatment products.

## Technology Stack

- **Frontend**: Bootstrap 5.3.3, vanilla JavaScript
- **PDF Generation**: jsPDF with autoTable plugin
- **Libraries**: AOS, Swiper, GLightbox, Isotope, PureCounter
- **Language**: Spanish (entire site)
- **Deployment**: Azure Static Web Apps

## Development Commands

### Local Development

```bash
# Serve the static frontend
python3 -m http.server 8000
# OR
npx http-server -p 8000
```

## Architecture Overview

### Quotation System Flow

The quotation system is the core feature of this website:

1. **Product Catalog** (`assets/js/products-data.js`):
   - Contains 70+ water treatment products in the `iatamaProducts` array
   - Categories: químicos, filtros, bombas, osmosis, industrial, tratamiento, piscinas, tanques, accesorios
   - Each product has: id, name, description, category, price, image path

2. **Frontend Shopping Cart** (`assets/js/presupuestar.js`):
   - Manages cart state in memory (no persistence)
   - Category filtering and product display
   - Quantity management
   - PDF generation with jsPDF (lines 300-550)
   - Client-side only - downloads PDF locally

3. **PDF Generation**:
   - User selects products → adds to cart
   - Clicks download → fills modal with contact info
   - Frontend generates PDF with company branding
   - PDF includes: quote number, customer info, product table, pricing, company contact details

### Key Files and Their Responsibilities

- `index.html`: Single-page site with all sections (hero, services, catalog, quotation, contact)
- `assets/js/presupuestar.js`: Cart logic, PDF generation (20KB, 550+ lines)
- `assets/js/products-data.js`: Product database (70+ products, 25KB)
- `assets/js/main.js`: Bootstrap template core (navigation, scroll effects, animations)

### Product Data Structure

Each product in `iatamaProducts` array:
```javascript
{
  id: number,
  name: string,
  description: string,
  category: string,  // matches category filter keys
  price: number,     // in MXN
  image: string      // path to product image
}
```

## Important Business Logic

### Quotation PDF Generation

The PDF (`presupuestar.js` lines 300-550) includes:
- IATAMA branding with company colors
- Quote number (format: COT-{timestamp})
- Customer information from modal form
- Product table with quantities and prices
- Company contact information in footer

### Product Categories

Categories are hardcoded in HTML (`index.html` lines 765-795) and must match keys in `products-data.js`:
- quimicos (Químicos y Detergentes)
- filtros (Filtros y Cartuchos)
- bombas (Bombas y Motores)
- osmosis (Ósmosis Inversa)
- industrial (Equipos Industriales)
- tratamiento (Tratamiento de Agua)
- piscinas (Piscinas y Spa)
- tanques (Tanques y Depósitos)
- accesorios (Accesorios)

## Common Development Tasks

### Adding a New Product

Edit `assets/js/products-data.js`:
```javascript
{
  id: 71, // Increment from last ID
  name: 'Product Name',
  description: 'Detailed description',
  category: 'quimicos', // Must match existing category
  price: 500,
  image: 'assets/img/products/71-product-name.jpg'
}
```

### PDF Base64 Conversion

The quotation system generates PDFs for download:
1. `createPDFDocument()` generates jsPDF document
2. User info collected via Bootstrap modal
3. PDF includes product table using autoTable plugin
4. `downloadPDFFromBase64()` triggers local download

### Toast Notifications

Bootstrap toast system for user feedback:
- Success: Green toast for successful operations
- Warning: Yellow toast for partial failures
- Danger: Red toast for errors
- Creates toast container dynamically if not present

## Deployment Considerations

1. **Static Assets**:
   - Frontend deployed to Azure Static Web Apps (workflow in `.github/workflows/`)
   - No backend required - fully client-side application
   - Product images should be in `assets/img/products/`
   - Current images follow naming: `{id}-{slug}.jpg`

## Language Considerations

All content is in Spanish. Key terminology:
- Presupuestar = Create quotation
- Cotización = Quote
- Carrito = Shopping cart
- Descargar = Download
- Enviar = Send

Maintain consistency when adding new features or content.
