import jsPDF from 'jspdf';
import { Task } from '../types';
import { format } from 'date-fns';

interface InvoiceDetails {
  billTo: string;
  paymentTo: string;
  bankAddress: string;
  ifscCode: string;
  accountNumber: string;
}

export const generateInvoice = (tasks: Task[], details: InvoiceDetails) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Set up the document
  doc.setFontSize(20);
  doc.text('Invoice', pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Date: ${format(new Date(), 'MMMM dd, yyyy')}`, 20, 40);
  doc.text(`Invoice #: INV-${Date.now()}`, 20, 50);

  // Add billing details
  doc.setFont(undefined, 'bold');
  doc.text('Bill To:', 20, 70);
  doc.setFont(undefined, 'normal');
  doc.text(details.billTo, 20, 80);

  // Add table headers
  const headers = ['Item', 'Quantity', 'Rate', 'Amount'];
  let y = 100;
  doc.setFont(undefined, 'bold');
  headers.forEach((header, i) => {
    doc.text(header, 20 + (i * 40), y);
  });

  // Add table rows
  doc.setFont(undefined, 'normal');
  let totalAmount = 0;
  tasks.forEach((task) => {
    y += 10;
    const hours = task.timeSpent / (1000 * 60 * 60);
    const amount = hours * task.costPerHour;
    totalAmount += amount;

    doc.text(task.name, 20, y);
    doc.text(hours.toFixed(2), 60, y);
    doc.text(`$${task.costPerHour.toFixed(2)}`, 100, y);
    doc.text(`$${amount.toFixed(2)}`, 140, y);

    if (y > 250) {
      doc.addPage();
      y = 20;
    }
  });

  // Add total
  y += 20;
  doc.setFont(undefined, 'bold');
  doc.text(`Total: $${totalAmount.toFixed(2)}`, 140, y);

  // Add payment details
  y += 30;
  doc.setFont(undefined, 'bold');
  doc.text('Payment Details:', 20, y);
  y += 10;
  doc.setFont(undefined, 'normal');
  doc.text(`Payment To: ${details.paymentTo}`, 20, y);
  y += 10;
  doc.text(`Bank Address: ${details.bankAddress}`, 20, y);
  y += 10;
  doc.text(`IFSC Code: ${details.ifscCode}`, 20, y);
  y += 10;
  doc.text(`Account Number: ${details.accountNumber}`, 20, y);

  // Save the PDF
  doc.save(`invoice-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};