# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

IATAMA is a Spanish-language business website for a water treatment and environmental management company based in Mérida, Yucatán, Mexico. The project is built using Bootstrap 5.3.3 with the "Multi" template from BootstrapMade as a base, customized for IATAMA's specific needs.

## Technology Stack

- **Frontend Framework**: Bootstrap 5.3.3
- **JavaScript Libraries**:
  - AOS (Animate On Scroll)
  - Swiper (Carousel/Slider)
  - GLightbox (Image galleries)
  - Isotope (Portfolio filtering)
  - PureCounter (Number animations)
- **Backend**: PHP (for contact forms)
- **Template Base**: Multi by BootstrapMade

## Project Structure

```
iatama-project/
├── index.html                    # Main homepage (Spanish)
├── portfolio-details.html        # Product/portfolio detail template
├── service-details.html          # Service detail template
├── starter-page.html            # Blank template for new pages
├── assets/
│   ├── css/
│   │   ├── main.css            # Main stylesheet
│   │   └── presupuestar.css    # Custom styles for quotation system
│   ├── js/
│   │   ├── main.js             # Core functionality
│   │   └── presupuestar.js     # Shopping cart/quotation system
│   ├── img/                    # Images and media
│   ├── scss/                   # SCSS source files (not in use)
│   └── vendor/                 # Third-party libraries
└── forms/
    ├── contact.php             # Contact form handler
    └── newsletter.php          # Newsletter subscription handler
```

## Key Features

1. **Dynamic Quotation System** (`presupuestar.js`):
   - Product catalog with categories (Bombas, Purificación, Tratamiento, Calentadores, Piscinas, Accesorios)
   - Shopping cart functionality
   - CSV export of quotations with user information
   - Modal-based user data collection

2. **Contact Forms**:
   - Main contact form
   - Newsletter subscription
   - Both require PHP Email Form library (not included in free version)

3. **Responsive Navigation**:
   - Sticky header with scroll effects
   - Mobile-responsive menu
   - Smooth scroll to sections

## Development Commands

### Local Development Server

Since this is a static site with PHP forms, use a local PHP server:

```bash
# Start PHP development server
php -S localhost:8000

# Or if using Python (for static files only, forms won't work)
python3 -m http.server 8000

# Or if using Node.js http-server
npx http-server -p 8000
```

### SCSS Compilation (if needed)

The project includes SCSS files but currently uses pre-compiled CSS. If you need to compile SCSS:

```bash
# Install sass globally
npm install -g sass

# Watch and compile SCSS
sass --watch assets/scss/main.scss:assets/css/main.css
```

### Testing Contact Forms

The PHP forms require the "PHP Email Form" library which is only available in the pro version. To test locally:

1. Update email addresses in `forms/contact.php` and `forms/newsletter.php`
2. Configure SMTP settings if needed
3. The forms won't work without the proper PHP library installation

## Important Business Logic

### Quotation System (presupuestar.js)

The quotation system maintains a product catalog with predefined items. Key functions:

- `loadProducts(category)` - Filters and displays products by category
- `addToCart(productId)` - Adds items to quotation cart
- `downloadExcel()` - Generates CSV file with quotation details
- `createAndDownloadCSV(data)` - Formats quotation data for download

Products include estimated energy costs for ROI calculations. Prices are intentionally shown as "Consultar" (consult) to encourage direct contact with sales.

### Form Validation

Forms use Bootstrap validation classes and PHP backend processing. The `php-email-form` library handles:
- AJAX submission
- Loading states
- Success/error messages
- SMTP configuration (if enabled)

## Deployment Considerations

1. **Email Configuration**: Update email addresses in PHP files before deployment
2. **PHP Requirements**: Ensure hosting supports PHP for contact forms
3. **SSL Certificate**: Recommended for contact form security
4. **Image Optimization**: Product images in catalog are using placeholders
5. **Google Maps API**: Update the iframe src with proper API key

## Customization Points

1. **Product Catalog** (`presupuestar.js`):
   - Products array (lines 6-36) contains all catalog items
   - Categories can be modified in the HTML (lines 736-758 in index.html)
   - Pricing logic can be adjusted in the cart functions

2. **Contact Information**:
   - Update in index.html footer (lines 957-963)
   - Update in contact section (lines 876-899)
   - Update map coordinates in iframe

3. **Social Links**:
   - Footer social media links (lines 964-969 in index.html)

4. **Company Branding**:
   - Logo text in header (line 48 in index.html)
   - Favicon and touch icons in assets/img/

## Common Tasks

### Adding a New Product

Edit the `products` array in `assets/js/presupuestar.js`:

```javascript
{ 
  id: 19, 
  name: 'Product Name', 
  description: 'Product description', 
  category: 'category_key', 
  price: 0, 
  energyCost: 0, 
  image: 'assets/img/products/product.jpg' 
}
```

### Creating a New Page

1. Copy `starter-page.html` as template
2. Update navigation in the new file
3. Modify content sections as needed
4. Include necessary JS/CSS dependencies

### Updating Contact Email

Change the `$receiving_email_address` variable in:
- `forms/contact.php` (line 10)
- `forms/newsletter.php` (line 10)

## Browser Compatibility

The site uses modern JavaScript features and Bootstrap 5.3.3, requiring:
- Chrome 91+
- Firefox 89+
- Safari 14.1+
- Edge 91+

## Performance Optimization

1. Vendor files are already minified
2. Consider lazy loading for images
3. Implement caching headers for static assets
4. Compress images before adding to assets/img/

## Language Considerations

The entire site is in Spanish. Key terms:
- "Presupuestar" = Create quotation
- "Cotización" = Quote/Quotation
- "Carrito" = Cart
- "Descargar" = Download

Maintain Spanish language consistency when adding new content or features.
