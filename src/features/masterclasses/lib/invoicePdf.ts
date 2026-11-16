import jsPDF from 'jspdf';
import type { Masterclass } from '@/features/masterclasses/lib/masterclassService';

export type InvoiceCustomer = { name: string; email: string; phone: string; organization: string };

/** Builds and downloads the pro-forma invoice PDF for a masterclass booking. */
export function generateMasterclassInvoice({
  masterclass,
  customerInfo,
  selectedPricing,
  seatCount,
}: {
  masterclass: Masterclass;
  customerInfo: InvoiceCustomer;
  selectedPricing: string;
  seatCount: number;
}) {
  const basePrice = selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice;
  const totalPrice = basePrice * seatCount;
  const invoiceNumber = `INV-MC-${Date.now()}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Create PDF
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Header - PAAN Logo area (we'll add text for now, logo can be added later)
  doc.setFontSize(24);
  doc.setTextColor(23, 40, 64); // PAAN dark blue
  doc.text('PAAN', 20, 30);
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Pan-African Advertising Network', 20, 38);
  
  // Invoice title
  doc.setFontSize(28);
  doc.setTextColor(242, 88, 73); // PAAN red
  doc.text('INVOICE', 140, 30);
  
  // Invoice details
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Invoice #: ${invoiceNumber}`, 140, 45);
  doc.text(`Date: ${currentDate}`, 140, 52);
  doc.text(`Due Date: ${currentDate}`, 140, 59);
  
  // Horizontal line
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 70, 190, 70);
  
  // Bill To section
  doc.setFontSize(12);
  doc.setTextColor(23, 40, 64);
  doc.text('BILL TO:', 20, 85);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  let yPos = 95;
  doc.text(customerInfo.name, 20, yPos);
  yPos += 7;
  doc.text(customerInfo.email, 20, yPos);
  if (customerInfo.phone) {
    yPos += 7;
    doc.text(customerInfo.phone, 20, yPos);
  }
  if (customerInfo.organization) {
    yPos += 7;
    doc.text(customerInfo.organization, 20, yPos);
  }
  
  // Masterclass details section
  yPos += 20;
  doc.setFontSize(12);
  doc.setTextColor(23, 40, 64);
  doc.text('MASTERCLASS DETAILS:', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Title: ${masterclass.title}`, 20, yPos);
  yPos += 7;
  doc.text(`Date: ${masterclass.date}`, 20, yPos);
  yPos += 7;
  doc.text(`Time: ${masterclass.time}`, 20, yPos);
  yPos += 7;
  doc.text(`Format: ${masterclass.format}`, 20, yPos);
  yPos += 7;
  doc.text(`Instructor: ${masterclass.instructor.name}`, 20, yPos);
  
  // Items table
  yPos += 20;
  
  // Table header
  doc.setFillColor(242, 88, 73); // PAAN red background
  doc.rect(20, yPos, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('DESCRIPTION', 25, yPos + 7);
  doc.text('PRICING TYPE', 100, yPos + 7);
  doc.text('QTY', 140, yPos + 7);
  doc.text('AMOUNT', 160, yPos + 7);
  
  // Table row
  yPos += 10;
  doc.setFillColor(248, 249, 250);
  doc.rect(20, yPos, 170, 15, 'F');
  doc.setTextColor(0, 0, 0);
  
  // Wrap long masterclass title
  const splitTitle = doc.splitTextToSize(masterclass.title, 70);
  doc.text(splitTitle, 25, yPos + 7);
  
  doc.text(selectedPricing === 'member' ? 'Member' : 'Non-Member', 100, yPos + 7);
  doc.text(seatCount.toString(), 140, yPos + 7);
  doc.text(`$${totalPrice}`, 160, yPos + 7);
  
  // Total section
  yPos += 25;
  doc.setDrawColor(200, 200, 200);
  doc.line(120, yPos, 190, yPos);
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setTextColor(23, 40, 64);
  doc.text('SUBTOTAL:', 120, yPos);
  doc.text(`$${totalPrice} USD`, 160, yPos);
  
  yPos += 10;
  doc.setFontSize(14);
  doc.setTextColor(242, 88, 73);
  doc.text('TOTAL:', 120, yPos);
  doc.text(`$${totalPrice} USD`, 160, yPos);
  
  // Footer
  yPos += 30;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for choosing PAAN Masterclasses!', 20, yPos);
  yPos += 7;
  doc.text('For questions, contact: support@paan.africa', 20, yPos);
  yPos += 7;
  doc.text('Website: www.paan.africa', 20, yPos);
  
  // Benefits section
  if (masterclass.benefits && masterclass.benefits.length > 0) {
    yPos += 15;
    doc.setFontSize(12);
    doc.setTextColor(23, 40, 64);
    doc.text('BONUS BENEFITS INCLUDED:', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    masterclass.benefits.forEach((benefit) => {
      doc.text(`• ${benefit}`, 25, yPos);
      yPos += 7;
    });
  }
  
  // Save the PDF
  doc.save(`PAAN-Masterclass-Invoice-${invoiceNumber}.pdf`);
}
