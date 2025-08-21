// Product catalog and shopping cart functionality for IATAMA
(function() {
    'use strict';

    // Sample product data (in production, this would come from a database)
    const products = [
        // Bombas y Motores
        { id: 1, name: 'Bomba Sumergible 1 HP', description: 'Bomba sumergible de alta eficiencia', category: 'bombas', price: 5500, energyCost: 150, image: 'assets/img/products/bomba1.jpg' },
        { id: 2, name: 'Bomba Centrífuga 2 HP', description: 'Bomba centrífuga industrial', category: 'bombas', price: 8500, energyCost: 280, image: 'assets/img/products/bomba2.jpg' },
        { id: 3, name: 'Motor Eléctrico 3 HP', description: 'Motor trifásico de alta eficiencia', category: 'bombas', price: 12000, energyCost: 420, image: 'assets/img/products/motor1.jpg' },
        
        // Purificación
        { id: 4, name: 'Sistema Ósmosis Inversa 500 GPD', description: 'Sistema completo de ósmosis inversa', category: 'purificacion', price: 45000, energyCost: 500, image: 'assets/img/products/osmosis1.jpg' },
        { id: 5, name: 'Filtro de Carbón Activado', description: 'Filtro de carbón de alta capacidad', category: 'purificacion', price: 2500, energyCost: 0, image: 'assets/img/products/filtro1.jpg' },
        { id: 6, name: 'Lámpara UV Esterilizadora', description: 'Sistema de desinfección UV', category: 'purificacion', price: 8500, energyCost: 80, image: 'assets/img/products/uv1.jpg' },
        
        // Tratamiento
        { id: 7, name: 'Planta de Tratamiento Compacta', description: 'Planta de tratamiento para 100 personas', category: 'tratamiento', price: 180000, energyCost: 1200, image: 'assets/img/products/planta1.jpg' },
        { id: 8, name: 'Sistema de Cloración', description: 'Sistema automático de cloración', category: 'tratamiento', price: 15000, energyCost: 50, image: 'assets/img/products/cloro1.jpg' },
        { id: 9, name: 'Tanque de Sedimentación', description: 'Tanque de sedimentación 5000L', category: 'tratamiento', price: 25000, energyCost: 0, image: 'assets/img/products/tanque1.jpg' },
        
        // Calentadores
        { id: 10, name: 'Calentador Solar 150L', description: 'Calentador solar de tubos evacuados', category: 'calentadores', price: 18000, energyCost: 0, image: 'assets/img/products/solar1.jpg' },
        { id: 11, name: 'Calentador de Paso 20L', description: 'Calentador de paso a gas', category: 'calentadores', price: 8500, energyCost: 0, image: 'assets/img/products/gas1.jpg' },
        { id: 12, name: 'Calentador Eléctrico 80L', description: 'Calentador eléctrico de depósito', category: 'calentadores', price: 12000, energyCost: 350, image: 'assets/img/products/electrico1.jpg' },
        
        // Piscinas
        { id: 13, name: 'Bomba para Piscina 1.5 HP', description: 'Bomba autocebante para piscina', category: 'piscinas', price: 9500, energyCost: 210, image: 'assets/img/products/piscina1.jpg' },
        { id: 14, name: 'Filtro de Arena 24"', description: 'Filtro de arena para piscina', category: 'piscinas', price: 15000, energyCost: 0, image: 'assets/img/products/filtro_arena.jpg' },
        { id: 15, name: 'Clorador Salino', description: 'Sistema de cloración salina', category: 'piscinas', price: 22000, energyCost: 150, image: 'assets/img/products/clorador.jpg' },
        
        // Accesorios
        { id: 16, name: 'Válvula Check 2"', description: 'Válvula check de bronce', category: 'accesorios', price: 850, energyCost: 0, image: 'assets/img/products/valvula1.jpg' },
        { id: 17, name: 'Manómetro Digital', description: 'Manómetro digital de precisión', category: 'accesorios', price: 2200, energyCost: 0, image: 'assets/img/products/manometro.jpg' },
        { id: 18, name: 'Kit de Conexiones PVC', description: 'Kit completo de conexiones', category: 'accesorios', price: 1500, energyCost: 0, image: 'assets/img/products/kit_pvc.jpg' }
    ];

    // Shopping cart
    let cart = [];

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializePresupuestar();
    });

    function initializePresupuestar() {
        // Only initialize if we're on the presupuestar section
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        loadProducts('all');
        setupCategoryFilters();
        setupCartButtons();
        setupModal();
    }

    function loadProducts(category) {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);

        productsGrid.innerHTML = `
            <div class="row g-3">
                ${filteredProducts.map(product => createProductCard(product)).join('')}
            </div>
        `;

        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.productId);
                addToCart(productId);
            });
        });
    }

    function createProductCard(product) {
        const placeholder = 'assets/img/product-placeholder.jpg';
        return `
            <div class="col-md-6 col-lg-4">
                <div class="card product-card h-100">
                    <img src="${placeholder}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h6 class="card-title">${product.name}</h6>
                        <p class="card-text small">${product.description}</p>
                        <div class="mt-auto">
                            <p class="text-muted mb-2">
                                <small>Categoría: ${getCategoryLabel(product.category)}</small>
                            </p>
                            <button class="btn btn-primary btn-sm w-100 add-to-cart" data-product-id="${product.id}">
                                <i class="bi bi-cart-plus"></i> Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function getCategoryLabel(category) {
        const labels = {
            'bombas': 'Bombas y Motores',
            'purificacion': 'Purificación',
            'tratamiento': 'Tratamiento',
            'calentadores': 'Calentadores',
            'piscinas': 'Piscinas',
            'accesorios': 'Accesorios'
        };
        return labels[category] || category;
    }

    function setupCategoryFilters() {
        const categoriesList = document.getElementById('categoriesList');
        if (!categoriesList) return;

        categoriesList.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.list-group-item');
            if (!link) return;

            // Update active state
            categoriesList.querySelectorAll('.list-group-item').forEach(item => {
                item.classList.remove('active');
            });
            link.classList.add('active');

            // Load products for selected category
            const category = link.dataset.category;
            loadProducts(category);
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCartDisplay();
        showToast('Producto agregado al carrito');
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
        showToast('Producto eliminado del carrito');
    }

    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }

    function updateCartDisplay() {
        const cartBody = document.getElementById('cartBody');
        const cartFooter = document.getElementById('cartFooter');
        const downloadSection = document.getElementById('downloadSection');

        if (!cartBody) return;

        if (cart.length === 0) {
            cartBody.innerHTML = `
                <tr class="empty-cart">
                    <td colspan="6" class="text-center text-muted">
                        <i class="bi bi-cart-x" style="font-size: 2rem;"></i>
                        <p>No hay productos en el carrito</p>
                    </td>
                </tr>
            `;
            cartFooter.style.display = 'none';
            downloadSection.style.display = 'none';
        } else {
            cartBody.innerHTML = cart.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td class="small">${item.description}</td>
                    <td>${getCategoryLabel(item.category)}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-sm btn-outline-secondary quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="mx-2">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </td>
                    <td class="text-center">
                        <span class="badge bg-secondary">Consultar</span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');

            // Update footer
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('totalItems').textContent = totalItems;
            document.getElementById('totalReference').textContent = 'Consultar';
            
            cartFooter.style.display = '';
            downloadSection.style.display = '';
        }
    }

    function setupCartButtons() {
        // Make functions globally available for onclick handlers
        window.removeFromCart = removeFromCart;
        window.updateQuantity = updateQuantity;
    }

    function setupModal() {
        const downloadBtn = document.getElementById('downloadBtn');
        const confirmDownload = document.getElementById('confirmDownload');
        const userInfoForm = document.getElementById('userInfoForm');

        if (!downloadBtn || !confirmDownload) return;

        downloadBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('userInfoModal'));
            modal.show();
        });

        confirmDownload.addEventListener('click', function() {
            if (validateForm()) {
                downloadExcel();
            }
        });
    }

    function validateForm() {
        const form = document.getElementById('userInfoForm');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return false;
        }
        return true;
    }

    function downloadExcel() {
        // Get user info
        const userName = document.getElementById('userName').value;
        const userPhone = document.getElementById('userPhone').value;
        const userEmail = document.getElementById('userEmail').value;
        const userCompany = document.getElementById('userCompany').value;

        // Create PDF instead of CSV
        generatePDF({
            name: userName,
            phone: userPhone,
            email: userEmail,
            company: userCompany,
            date: new Date().toLocaleDateString('es-MX', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })
        });

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('userInfoModal'));
        modal.hide();

        // Show success message
        showToast('Cotización descargada exitosamente', 'success');

        // Reset form
        document.getElementById('userInfoForm').reset();
        document.getElementById('userInfoForm').classList.remove('was-validated');
    }

    function generatePDF(userInfo) {
        // Initialize jsPDF with A4 format
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // IATAMA Colors based on the CSS variables
        const primaryColor = [46, 134, 171]; // #2E86AB
        const darkColor = [11, 35, 65]; // #0b2341
        const grayColor = [68, 68, 68]; // #444444
        
        // Document margins
        const marginLeft = 20;
        const marginRight = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const contentWidth = pageWidth - marginLeft - marginRight;
        
        // Header with company branding
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, pageWidth, 40, 'F');
        
        // Company name
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.text('IATAMA', marginLeft, 20);
        
        // Company tagline
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Ingeniería Aplicada en Tratamiento de Agua y Medio Ambiente', marginLeft, 28);
        
        // Document title
        doc.setTextColor(...darkColor);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('COTIZACIÓN', pageWidth / 2, 55, { align: 'center' });
        
        // Quote number and date
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...grayColor);
        const quoteNumber = 'COT-' + Date.now().toString().slice(-8);
        doc.text(`Número de cotización: ${quoteNumber}`, marginLeft, 65);
        doc.text(`Fecha: ${userInfo.date}`, pageWidth - marginRight, 65, { align: 'right' });
        
        // Client information section
        let yPosition = 80;
        doc.setFillColor(245, 247, 250);
        doc.rect(marginLeft, yPosition - 5, contentWidth, 35, 'F');
        
        doc.setTextColor(...darkColor);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('INFORMACIÓN DEL CLIENTE', marginLeft + 5, yPosition);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...grayColor);
        yPosition += 8;
        doc.text(`Cliente: ${userInfo.name}`, marginLeft + 5, yPosition);
        yPosition += 6;
        doc.text(`Empresa: ${userInfo.company || 'Particular'}`, marginLeft + 5, yPosition);
        yPosition += 6;
        doc.text(`Teléfono: ${userInfo.phone}`, marginLeft + 5, yPosition);
        doc.text(`Email: ${userInfo.email}`, pageWidth / 2, yPosition);
        
        // Products table
        yPosition = 125;
        doc.setTextColor(...darkColor);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('PRODUCTOS COTIZADOS', marginLeft, yPosition);
        
        // Prepare table data
        const tableHeaders = [['Producto', 'Descripción', 'Categoría', 'Cant.', 'P. Unit.*', 'Subtotal*']];
        const tableData = cart.map(item => [
            item.name,
            item.description.length > 35 ? item.description.substring(0, 32) + '...' : item.description,
            getCategoryLabel(item.category),
            item.quantity.toString(),
            `$${item.price.toLocaleString('es-MX')}`,
            `$${(item.price * item.quantity).toLocaleString('es-MX')}`
        ]);
        
        // Calculate totals
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalEnergyCost = cart.reduce((sum, item) => sum + (item.energyCost * item.quantity), 0);
        
        // Add totals row
        tableData.push(['', '', 'TOTALES:', totalItems.toString(), '', `$${totalPrice.toLocaleString('es-MX')}`]);
        
        // Generate table with autoTable plugin
        doc.autoTable({
            head: tableHeaders,
            body: tableData,
            startY: yPosition + 5,
            theme: 'grid',
            headStyles: {
                fillColor: primaryColor,
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: {
                fontSize: 9,
                textColor: grayColor
            },
            alternateRowStyles: {
                fillColor: [248, 249, 250]
            },
            columnStyles: {
                0: { cellWidth: 38 },
                1: { cellWidth: 55 },
                2: { cellWidth: 30 },
                3: { cellWidth: 15, halign: 'center' },
                4: { cellWidth: 22, halign: 'right' },
                5: { cellWidth: 25, halign: 'right' }
            },
            margin: { left: marginLeft, right: marginRight },
            didDrawCell: function(data) {
                // Bold the total row
                if (data.row.index === tableData.length - 1) {
                    doc.setFont('helvetica', 'bold');
                }
            }
        });
        
        // Important notes section
        yPosition = doc.lastAutoTable.finalY + 15;
        
        // Check if we need a new page
        if (yPosition > 240) {
            doc.addPage();
            yPosition = 30;
        }
        
        doc.setFillColor(255, 243, 224);
        doc.rect(marginLeft, yPosition, contentWidth, 30, 'F');
        
        doc.setTextColor(...darkColor);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('INFORMACIÓN IMPORTANTE:', marginLeft + 5, yPosition + 8);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...grayColor);
        doc.text('• Los precios mostrados son de referencia. Un asesor le proporcionará los precios finales.', marginLeft + 5, yPosition + 15);
        doc.text('• Ofrecemos financiamiento a 9 meses sin intereses.', marginLeft + 5, yPosition + 21);
        doc.text('• Esta cotización tiene una vigencia de 30 días.', marginLeft + 5, yPosition + 27);
        
        // Add energy cost estimation if applicable
        if (totalEnergyCost > 0) {
            yPosition += 35;
            
            // Check if we need a new page
            if (yPosition > 240) {
                doc.addPage();
                yPosition = 30;
            }
            
            doc.setFillColor(232, 244, 248);
            doc.rect(marginLeft, yPosition, contentWidth, 25, 'F');
            
            doc.setTextColor(...darkColor);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('ANÁLISIS DE AHORRO ENERGÉTICO:', marginLeft + 5, yPosition + 8);
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...grayColor);
            doc.text(`Costo energético mensual estimado: $${totalEnergyCost.toLocaleString('es-MX')} MXN`, marginLeft + 5, yPosition + 15);
            doc.text(`Ahorro anual estimado con equipos eficientes: $${(totalEnergyCost * 3).toLocaleString('es-MX')} MXN`, marginLeft + 5, yPosition + 21);
        }
        
        // Footer
        const footerY = 270;
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(0.5);
        doc.line(marginLeft, footerY, pageWidth - marginRight, footerY);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...grayColor);
        doc.text('IATAMA - Ingeniería Aplicada en Tratamiento de Agua y Medio Ambiente', pageWidth / 2, footerY + 6, { align: 'center' });
        doc.text('Tel: (01999) 2879003 | Email: ventas@iatama.com.mx', pageWidth / 2, footerY + 11, { align: 'center' });
        doc.text('Calle 69 #183 x 8C y Av. Pedagógica, Col. San Antonio Kaua, Mérida, Yucatán', pageWidth / 2, footerY + 16, { align: 'center' });
        
        // Save the PDF
        doc.save(`cotizacion_iatama_${quoteNumber}.pdf`);
    }

    function showToast(message, type = 'info') {
        // Create toast element
        const toastHtml = `
            <div class="toast align-items-center text-white bg-${type === 'success' ? 'success' : 'primary'} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        // Add toast container if it doesn't exist
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }

        // Add toast to container
        const toastElement = document.createElement('div');
        toastElement.innerHTML = toastHtml;
        toastContainer.appendChild(toastElement.firstElementChild);

        // Show toast
        const toast = new bootstrap.Toast(toastContainer.lastElementChild);
        toast.show();

        // Remove after hidden
        toastContainer.lastElementChild.addEventListener('hidden.bs.toast', function() {
            this.remove();
        });
    }

})();
