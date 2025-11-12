/**
 * Simulador de Utilidades - IATAMA
 * JavaScript functionality for profit calculations
 */

// Business data configurations
const businessData = {
  'purificadora-basica': {
    name: 'Purificadora Básica',
    costs: {
      tapas: { base: 300, unit: '500Pzas', perUnit: [60.00, 90.00, 120.00, 150.00, 180.00, 240.00, null] },
      sellos: { base: 210, unit: '1000Pzas', perUnit: [21.00, 31.50, 42.00, 52.50, 63.00, 84.00, null] },
      agua: { base: 1200, unit: '$/pipa 10Mil L', perUnit: [240.00, 360.00, 480.00, 600.00, 720.00, 960.00, null] },
      luz: { base: 1800, unit: '$/Bimestre', perUnit: [29.59, 29.59, 29.59, 29.59, 29.59, 29.59, null] },
      sueldos: { base: 7500, unit: '$/mes', perUnit: [246.55, 246.55, 246.55, 246.55, 246.55, 246.55, null] },
      renta: { base: 3000, unit: '$/mes', perUnit: [98.62, 98.62, 98.62, 98.62, 98.62, 98.62, null] },
      detergente: { base: 71, unit: '1Kg', perUnit: [2.33, 2.33, 2.33, 2.33, 2.33, 2.33, null] }
    }
  },
  'purificadora-osmosis': {
    name: 'Purificadora c/ Ósmosis Inversa',
    costs: {
      tapas: { base: 300, unit: '500Pzas', perUnit: [60.00, 90.00, 120.00, 150.00, 180.00, 240.00] },
      sellos: { base: 210, unit: '1000Pzas', perUnit: [21.00, 31.50, 42.00, 52.50, 63.00, 84.00] },
      agua: { base: 750, unit: '$/pipa 10Mil L', perUnit: [150.00, 225.00, 300.00, 375.00, 450.00, 600.00] },
      luz: { base: 1800, unit: '$/Bimestre', perUnit: [29.59, 29.59, 29.59, 29.59, 29.59, 29.59] },
      sueldos: { base: 7500, unit: '$/mes', perUnit: [246.55, 246.55, 246.55, 246.55, 246.55, 246.55] },
      renta: { base: 3000, unit: '$/mes', perUnit: [98.62, 98.62, 98.62, 98.62, 98.62, 98.62] },
      detergente: { base: 71, unit: '1Kg', perUnit: [2.33, 2.33, 2.33, 2.33, 2.33, 2.33] },
      sal: { base: 300, unit: '20Kg', perUnit: [24.78, 37.17, 49.56, 61.95, 74.34, 99.13] }
    }
  },
  'ventana-24hrs': {
    name: 'Ventana 24hrs Básica',
    costs: {
      agua: { base: 1200, unit: '$/pipa 10Mil L', perUnit: [120.00, 240.00, 360.00, 480.00, 600.00, 720.00] },
      luz: { base: 1200, unit: '$/Bimestre', perUnit: [19.72, 19.72, 19.72, 19.72, 19.72, 19.72] },
      renta: { base: 3000, unit: '$/mes', perUnit: [98.62, 98.62, 98.62, 98.62, 98.62, 98.62] }
    }
  },
  'ventana-24hrs-osmosis': {
    name: 'Ventana 24hrs c/ Ósmosis Inversa',
    costs: {
      agua: { base: 750, unit: '$/pipa 10Mil L', perUnit: [75.00, 150.00, 225.00, 300.00, 375.00, 450.00] },
      luz: { base: 1200, unit: '$/Bimestre', perUnit: [19.72, 19.72, 19.72, 19.72, 19.72, 19.72] },
      renta: { base: 3000, unit: '$/mes', perUnit: [98.62, 98.62, 98.62, 98.62, 98.62, 98.62] },
      sal: { base: 300, unit: '20Kg', perUnit: [12.39, 24.78, 37.17, 49.56, 61.95, 74.34] }
    }
  },
  'vending-basico': {
    name: 'Vending 24hrs Básico',
    costs: {
      agua: { base: 1200, unit: '$/pipa 10Mil L', perUnit: [120.00, 240.00, 360.00, 480.00] },
      luz: { base: 800, unit: '$/Bimestre', perUnit: [13.15, 13.15, 13.15, 13.15] },
      renta: { base: 0, unit: '$/mes', perUnit: [0.00, 0.00, 0.00, 0.00] }
    }
  },
  'vending-osmosis': {
    name: 'Vending 24hrs c/ Ósmosis Inversa',
    costs: {
      agua: { base: 750, unit: '$/pipa 10Mil L', perUnit: [75.00, 150.00, 225.00, 300.00] },
      luz: { base: 800, unit: '$/Bimestre', perUnit: [13.15, 13.15, 13.15, 13.15] },
      renta: { base: 0, unit: '$/mes', perUnit: [0.00, 0.00, 0.00, 0.00] }
    }
  }
};

// Production options mapping
const productionOptions = {
  50: 0,
  100: 1,
  150: 2,
  200: 3,
  250: 4,
  300: 5,
  400: 6
};

// Cost item names in Spanish
const costItemNames = {
  tapas: 'Tapas con Liners',
  sellos: 'Sellos',
  agua: 'Agua',
  luz: 'Luz (Valor de referencia)',
  sueldos: 'Sueldos',
  renta: 'Renta',
  detergente: 'Detergente biodegradable',
  sal: 'Sal en pellets'
};

// Global variables
let selectedBusiness = null;
let currentCalculation = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  AOS.init();
});

// Initialize event listeners
function initializeEventListeners() {
  // Business card selection
  const businessCards = document.querySelectorAll('.business-card');
  businessCards.forEach(card => {
    card.addEventListener('click', function() {
      selectBusiness(this);
    });
  });

  // Form submission
  const profitForm = document.getElementById('profit-form');
  if (profitForm) {
    profitForm.addEventListener('submit', function(e) {
      e.preventDefault();
      calculateProfits();
    });
  }

  // Reset button
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetCalculator);
  }

  // Download PDF button
  const downloadPdfBtn = document.getElementById('download-pdf');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', generatePDF);
  }

  // Contact button
  const contactBtn = document.getElementById('contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      window.location.href = 'index.html#contact';
    });
  }

  // Update production options based on business type
  const productionSelect = document.getElementById('production');
  if (productionSelect) {
    productionSelect.addEventListener('change', validateProductionOption);
  }
}

// Select business type
function selectBusiness(card) {
  // Remove selected class from all cards
  document.querySelectorAll('.business-card').forEach(c => {
    c.classList.remove('selected');
  });

  // Add selected class to clicked card
  card.classList.add('selected');

  // Get business type
  selectedBusiness = card.dataset.business;
  const businessName = businessData[selectedBusiness].name;

  // Update form with business name
  document.getElementById('business-name').textContent = businessName;

  // Show calculator section
  const calculatorSection = document.getElementById('calculator-section');
  calculatorSection.style.display = 'block';
  
  // Update production options based on business type
  updateProductionOptions();

  // Scroll to calculator
  setTimeout(() => {
    calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  // Hide results if visible
  document.getElementById('results-section').style.display = 'none';
}

// Update production options based on business type
function updateProductionOptions() {
  const productionSelect = document.getElementById('production');
  const business = businessData[selectedBusiness];
  
  // Clear existing options
  productionSelect.innerHTML = '<option value="">Selecciona la producción diaria</option>';
  
  // Determine available options based on business type
  let maxOptions = 7; // Default for most businesses
  
  if (selectedBusiness === 'vending-basico' || selectedBusiness === 'vending-osmosis') {
    maxOptions = 4; // Vending machines only support up to 200 garrafones
  }
  
  const productionValues = [50, 100, 150, 200, 250, 300, 400];
  
  for (let i = 0; i < maxOptions; i++) {
    if (i < productionValues.length) {
      const option = document.createElement('option');
      option.value = productionValues[i];
      option.textContent = `${productionValues[i]} garrafones`;
      productionSelect.appendChild(option);
    }
  }
}

// Validate production option
function validateProductionOption() {
  const production = parseInt(document.getElementById('production').value);
  
  if (selectedBusiness && production) {
    const business = businessData[selectedBusiness];
    const index = productionOptions[production];
    
    // Check if this production level is supported
    const firstCostItem = Object.values(business.costs)[0];
    if (index >= firstCostItem.perUnit.length || firstCostItem.perUnit[index] === null) {
      alert('Esta producción no está disponible para el tipo de negocio seleccionado.');
      document.getElementById('production').value = '';
    }
  }
}

// Calculate profits
function calculateProfits() {
  const production = parseInt(document.getElementById('production').value);
  const salePrice = parseFloat(document.getElementById('sale-price').value);
  
  if (!selectedBusiness || !production || !salePrice) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const business = businessData[selectedBusiness];
  const index = productionOptions[production];
  
  // Calculate costs
  let totalCost = 0;
  const costBreakdown = [];
  
  for (const [key, data] of Object.entries(business.costs)) {
    const costValue = data.perUnit[index];
    if (costValue !== null && costValue !== undefined) {
      totalCost += costValue;
      costBreakdown.push({
        name: costItemNames[key],
        baseCost: data.base,
        unit: data.unit,
        totalCost: costValue
      });
    }
  }

  // Calculate profits
  const revenue = production * salePrice;
  const dailyProfit = revenue - totalCost;
  const weeklyProfit = dailyProfit * 7;
  const monthlyProfit = dailyProfit * 30.4; // Average days per month
  const costPerBottle = totalCost / production;

  // Store calculation for PDF export
  currentCalculation = {
    businessName: business.name,
    production: production,
    salePrice: salePrice,
    costBreakdown: costBreakdown,
    totalCost: totalCost,
    costPerBottle: costPerBottle,
    revenue: revenue,
    dailyProfit: dailyProfit,
    weeklyProfit: weeklyProfit,
    monthlyProfit: monthlyProfit
  };

  // Display results
  displayResults();
}

// Display calculation results
function displayResults() {
  if (!currentCalculation) return;

  // Populate cost table
  const tbody = document.getElementById('costs-tbody');
  tbody.innerHTML = '';
  
  currentCalculation.costBreakdown.forEach(item => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.baseCost.toLocaleString('es-MX')}</td>
      <td>${item.unit}</td>
      <td>$${item.totalCost.toFixed(2)}</td>
    `;
  });

  // Update totals
  document.getElementById('total-production-cost').textContent = 
    `$${currentCalculation.totalCost.toFixed(2)}`;
  document.getElementById('cost-per-bottle').textContent = 
    `$${currentCalculation.costPerBottle.toFixed(2)}`;

  // Update profit summary
  document.getElementById('daily-profit').textContent = 
    `$${currentCalculation.dailyProfit.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById('weekly-profit').textContent = 
    `$${currentCalculation.weeklyProfit.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById('monthly-profit').textContent = 
    `$${currentCalculation.monthlyProfit.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Show results section
  const resultsSection = document.getElementById('results-section');
  resultsSection.style.display = 'block';
  
  // Scroll to results
  setTimeout(() => {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// Reset calculator
function resetCalculator() {
  // Hide sections
  document.getElementById('calculator-section').style.display = 'none';
  document.getElementById('results-section').style.display = 'none';
  
  // Reset form
  document.getElementById('profit-form').reset();
  
  // Remove business selection
  document.querySelectorAll('.business-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  selectedBusiness = null;
  currentCalculation = null;
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Generate PDF report
function generatePDF() {
  if (!currentCalculation) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Colors
  const primaryColor = [74, 159, 219]; // Light blue
  const darkColor = [58, 139, 200]; // Darker blue
  const lightGray = [245, 245, 245];
  const textGray = [100, 100, 100];
  
  // Add IATAMA branding header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('IATAMA', 105, 18, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Simulador de Utilidades - Reporte de Análisis', 105, 28, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  const today = new Date().toLocaleDateString('es-MX', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(`Fecha: ${today}`, 105, 35, { align: 'center' });
  
  // Business Information Section
  let yPos = 55;
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Información del Negocio', 20, yPos);
  
  yPos += 10;
  doc.setTextColor(...textGray);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tipo de Negocio: ${currentCalculation.businessName}`, 20, yPos);
  
  yPos += 6;
  doc.text(`Producción Diaria: ${currentCalculation.production} garrafones`, 20, yPos);
  
  yPos += 6;
  doc.text(`Precio de Venta por Garrafón: $${currentCalculation.salePrice.toFixed(2)} MXN`, 20, yPos);
  
  // Cost Breakdown Table
  yPos += 15;
  doc.setTextColor(...darkColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Desglose de Costos', 20, yPos);
  
  yPos += 10;
  
  // Table headers
  const tableHeaders = [['Concepto', 'Costo Base', 'Unidad', 'Costo Total']];
  const tableData = currentCalculation.costBreakdown.map(item => [
    item.name,
    `$${item.baseCost.toLocaleString('es-MX')}`,
    item.unit,
    `$${item.totalCost.toFixed(2)}`
  ]);
  
  // Add summary rows
  tableData.push(
    ['', '', '', ''],
    ['Costo Total de Producción', '', '', `$${currentCalculation.totalCost.toFixed(2)}`],
    ['Costo por Garrafón', '', '', `$${currentCalculation.costPerBottle.toFixed(2)}`]
  );
  
  doc.autoTable({
    startY: yPos,
    head: tableHeaders,
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    bodyStyles: {
      textColor: textGray
    },
    alternateRowStyles: {
      fillColor: lightGray
    },
    didDrawRow: function(data) {
      // Style the summary rows
      if (data.row.index >= tableData.length - 2) {
        doc.setFont('helvetica', 'bold');
      }
    }
  });
  
  // Profit Summary
  yPos = doc.lastAutoTable.finalY + 20;
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Resumen de Utilidades', 20, yPos);
  
  yPos += 10;
  
  // Create profit boxes
  const boxWidth = 55;
  const boxHeight = 25;
  const startX = 20;
  
  // Daily profit box
  doc.setFillColor(...lightGray);
  doc.roundedRect(startX, yPos, boxWidth, boxHeight, 3, 3, 'F');
  doc.setTextColor(...darkColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Ganancia Diaria', startX + boxWidth/2, yPos + 8, { align: 'center' });
  doc.setTextColor(...textGray);
  doc.setFontSize(12);
  doc.text(`$${currentCalculation.dailyProfit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`, 
    startX + boxWidth/2, yPos + 16, { align: 'center' });
  
  // Weekly profit box
  doc.setFillColor(...lightGray);
  doc.roundedRect(startX + boxWidth + 10, yPos, boxWidth, boxHeight, 3, 3, 'F');
  doc.setTextColor(...darkColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Ganancia Semanal', startX + boxWidth + 10 + boxWidth/2, yPos + 8, { align: 'center' });
  doc.setTextColor(...textGray);
  doc.setFontSize(12);
  doc.text(`$${currentCalculation.weeklyProfit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`, 
    startX + boxWidth + 10 + boxWidth/2, yPos + 16, { align: 'center' });
  
  // Monthly profit box (highlighted)
  doc.setFillColor(...primaryColor);
  doc.roundedRect(startX + (boxWidth + 10) * 2, yPos, boxWidth, boxHeight, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Ganancia Mensual', startX + (boxWidth + 10) * 2 + boxWidth/2, yPos + 8, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`$${currentCalculation.monthlyProfit.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`, 
    startX + (boxWidth + 10) * 2 + boxWidth/2, yPos + 16, { align: 'center' });
  
  // Disclaimer
  yPos += 40;
  doc.setTextColor(...textGray);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  const disclaimer = 'Nota: Este reporte proporciona estimaciones basadas en valores promedio del mercado. Los resultados reales pueden variar según factores locales y condiciones específicas del negocio.';
  const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
  doc.text(splitDisclaimer, 20, yPos);
  
  // Footer
  doc.setFillColor(...lightGray);
  doc.rect(0, 270, 210, 27, 'F');
  
  doc.setTextColor(...textGray);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('IATAMA - Ingeniería Aplicada en Tratamiento de Agua y Medio Ambiente', 105, 278, { align: 'center' });
  doc.text('Mérida, Yucatán, México', 105, 284, { align: 'center' });
  doc.text('www.iatama.com.mx | info@iatama.com.mx', 105, 290, { align: 'center' });
  
  // Save PDF
  const fileName = `IATAMA_Simulador_Utilidades_${new Date().getTime()}.pdf`;
  doc.save(fileName);
}