'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LogOut, Plus, Trash2, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import COMPANY_INFO from '../config/company';

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface QuoteForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  projectDescription: string;
  items: QuoteItem[];
}

interface QuoteGeneratorProps {
  onLogout: () => void;
}

export default function QuoteGenerator({ onLogout }: QuoteGeneratorProps) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [newItem, setNewItem] = useState({ description: '', quantity: 1, price: 0 });
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteForm>();

  // Helper function to format numbers with commas
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const addItem = () => {
    if (newItem.description && newItem.price > 0) {
      const item: QuoteItem = {
        id: Date.now().toString(),
        ...newItem
      };
      setItems([...items, item]);
      setNewItem({ description: '', quantity: 1, price: 0 });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const generatePDF = (data: QuoteForm) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;
    let yPosition = 20;

    // HEADER: reduce height for more space
    pdf.setFillColor(21, 37, 52); // RGB(21, 37, 52) - Custom dark color
    pdf.rect(0, 0, pageWidth, 32, 'F'); // reduced from 45 to 32

    // Logo: slightly smaller and lower for compactness
    try {
      pdf.addImage('/assets/wnl-logo.png', 'PNG', margin, 10, 29, 20); // smaller logo
    } catch {}
    const headerTextLeft = margin + 32;
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18); // smaller
    pdf.setFont('helvetica', 'bold');
    pdf.text(COMPANY_INFO.name, headerTextLeft, 14);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(COMPANY_INFO.tagline, headerTextLeft, 20);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.text('The difference is in the details', headerTextLeft, 24);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Email: wnlflooring@gmail.com  Phone: (786) 762-6304', headerTextLeft, 28);
    yPosition = 38; // start content lower
    
    // Quote title - clean without shadow
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('QUOTE', margin, yPosition + 7);
    
    // Date only (no quote number)
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.8);
    pdf.rect(pageWidth - 60, yPosition - 3, 55, 12);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 55, yPosition + 4);
    
    yPosition += 25;
    
    // Client information section
    pdf.setFillColor(250, 250, 250); // Very light gray
    pdf.rect(margin - 3, yPosition - 3, pageWidth - 2 * margin + 6, 32, 'F');
    pdf.setDrawColor(0, 0, 0); // Black border
    pdf.setLineWidth(0.5);
    pdf.rect(margin - 3, yPosition - 3, pageWidth - 2 * margin + 6, 32);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CLIENT INFORMATION', margin, yPosition + 5);
    
    yPosition += 12;
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    
    // Client info in organized layout
    pdf.setFont('helvetica', 'bold');
    pdf.text('Name:', margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(data.customerName, margin + 22, yPosition);
    
    pdf.setFont('helvetica', 'bold');
    pdf.text('Phone:', margin + 95, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(data.customerPhone, margin + 115, yPosition);
    
    yPosition += 7;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Email:', margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(data.customerEmail, margin + 22, yPosition);
    
    yPosition += 7;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Address:', margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    const addressText = pdf.splitTextToSize(data.customerAddress, pageWidth - margin - 30);
    pdf.text(addressText, margin + 22, yPosition);
    
    yPosition += Math.max(7, addressText.length * 4) + 15;
    
    // Project description with dynamic height calculation
    pdf.setFillColor(250, 250, 250);
    
    // Calculate the actual text lines after splitting for width
    const projectLines = pdf.splitTextToSize(data.projectDescription, pageWidth - 2 * margin - 6);
    const projectHeight = Math.max(25, projectLines.length * 4 + 15); // Dynamic height based on actual lines
    
    pdf.rect(margin - 3, yPosition - 3, pageWidth - 2 * margin + 6, projectHeight, 'F');
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(margin - 3, yPosition - 3, pageWidth - 2 * margin + 6, projectHeight);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROJECT DESCRIPTION', margin, yPosition + 5);
    
    yPosition += 10;
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text(projectLines, margin, yPosition);
    yPosition += projectLines.length * 4 + 12;
    
    // Items and pricing section
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ITEMS AND PRICING', margin, yPosition);
    
    yPosition += 12;
    
    // Professional table header
    pdf.setFillColor(21, 37, 52); // Custom dark color header
    pdf.rect(margin - 3, yPosition - 3, pageWidth - 2 * margin + 6, 10, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DESCRIPTION', margin, yPosition + 3);
    pdf.text('QTY', pageWidth - 110, yPosition + 3);
    pdf.text('UNIT PRICE', pageWidth - 80, yPosition + 3);
    pdf.text('AMOUNT', pageWidth - 35, yPosition + 3);
    
    yPosition += 12;
    
    // Table rows with clean styling
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    
    items.forEach((item, index) => {
      if (index % 2 === 0) {
        pdf.setFillColor(248, 249, 250);
        pdf.rect(margin - 3, yPosition - 2, pageWidth - 2 * margin + 6, 8, 'F');
      }
      
      pdf.text(item.description, margin, yPosition + 2);
      pdf.text(item.quantity.toString(), pageWidth - 110, yPosition + 2);
      pdf.text(formatCurrency(item.price), pageWidth - 80, yPosition + 2);
      pdf.text(formatCurrency(item.quantity * item.price), pageWidth - 35, yPosition + 2);
      yPosition += 10;
    });
    
    // Professional total section
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(1);
    pdf.line(pageWidth - 100, yPosition, pageWidth - 5, yPosition);
    
    yPosition += 8;
    pdf.setFillColor(21, 37, 52); // Custom dark color background for total
    pdf.rect(pageWidth - 100, yPosition - 3, 95, 12, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('TOTAL AMOUNT:', pageWidth - 95, yPosition + 4);
    pdf.setFontSize(14);
    pdf.text(formatCurrency(calculateTotal()), pageWidth - 35, yPosition + 4);
    
    yPosition += 20;
    
    // Terms and conditions
    pdf.setFillColor(250, 250, 250);
    pdf.rect(margin - 3, yPosition - 3, pageWidth - 2 * margin + 6, 45, 'F');
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(margin - 3, yPosition - 3, pageWidth - 2 * margin + 6, 45);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text('TERMS AND CONDITIONS', margin, yPosition + 4);
    
    yPosition += 10;
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    
    const terms = [
      '1. This quotation is valid for 30 days from the date specified above.',
      '2. Prices are subject to change without notice after the expiration date.',
      '3. Accepted payment methods: Zelle transfer or certified check.',
      '4. Payment Schedule:',
      '   • A 30% deposit is required prior to start of the project',
      '   • A 40% progress payment will be due once the project is halfway completed',
      '   • The remaining 30% is due upon project completion and final approvall'
    ];
    
    terms.forEach(term => {
      const termLines = pdf.splitTextToSize(term, pageWidth - 2 * margin - 6);
      pdf.text(termLines, margin, yPosition);
      yPosition += termLines.length * 3.5 + 1;
    });
    
    yPosition += 18; // less space after terms

    // Firmas minimalistas bien separadas
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.8);
    const lineWidth = 70; // slightly shorter
    const gap = 40; // closer together
    const centerX = pageWidth / 2;
    // Línea izquierda (Client)
    const leftLineX1 = centerX - gap/2 - lineWidth;
    const leftLineX2 = centerX - gap/2;
    pdf.line(leftLineX1, yPosition, leftLineX2, yPosition);
    // Línea derecha (WNL FLOORING)
    const rightLineX1 = centerX + gap/2;
    const rightLineX2 = centerX + gap/2 + lineWidth;
    pdf.line(rightLineX1, yPosition, rightLineX2, yPosition);
    // Etiquetas centradas debajo de cada línea
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text('Client', (leftLineX1 + leftLineX2) / 2, yPosition + 7, { align: 'center' });
    pdf.text('WNL FLOORING', (rightLineX1 + rightLineX2) / 2, yPosition + 7, { align: 'center' });
    yPosition += 22;

    // FOOTER: make band smaller and text centered
    pdf.setFillColor(21, 37, 52);
    pdf.rect(0, yPosition, pageWidth, 15, 'F'); // reduced from 20 to 15
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Thank you for considering ${COMPANY_INFO.name} for your project.`, pageWidth/2, yPosition + 6, { align: 'center' });
    pdf.setFontSize(8);
    pdf.text('Professional Installation • Quality Materials • Satisfaction Guaranteed', pageWidth/2, yPosition + 12, { align: 'center' });
    
    // Create blob and download properly to avoid security warnings
    const pdfBlob = pdf.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `WNL_Flooring_Quote_${data.customerName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onSubmit = (data: QuoteForm) => {
    if (items.length === 0) {
      alert('Please add at least one item to the quote.');
      return;
    }
    generatePDF({ ...data, items });
    reset();
    setItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">WNL</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{COMPANY_INFO.name}</h1>
                <p className="text-sm text-gray-500">Quote Generator</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Client Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name *
                </label>
                <input
                  {...register('customerName', { required: 'Client name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Enter client name"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  {...register('customerEmail', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="client@email.com"
                />
                {errors.customerEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  {...register('customerPhone', { required: 'Phone is required' })}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="(555) 123-4567"
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  {...register('customerAddress', { required: 'Address is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Client address"
                />
                {errors.customerAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerAddress.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h2>
            <textarea
              {...register('projectDescription', { required: 'Project description is required' })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="Describe the tile and bathroom remodeling project..."
            />
            {errors.projectDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.projectDescription.message}</p>
            )}
          </div>

          {/* Items */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Items & Pricing</h2>
            
            {/* Add Item Form */}
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3">Add New Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="Item description"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    value={newItem.quantity}
                    placeholder="Qty"
                    onFocus={e => { if (e.target.value === '1') e.target.value = ''; }}
                    onChange={e => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    value={newItem.price}
                    placeholder="Price"
                    onFocus={e => { if (e.target.value === '0') e.target.value = ''; }}
                    onChange={e => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  />
                  <button
                    type="button"
                    onClick={addItem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Items List */}
            {items.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-medium text-gray-700">Description</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-700">Qty</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-700">Price</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-700">Total</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-2 text-sm text-gray-900">{item.description}</td>
                        <td className="py-2 text-sm text-gray-900 text-right">{item.quantity}</td>
                        <td className="py-2 text-sm text-gray-900 text-right">{formatCurrency(item.price)}</td>
                        <td className="py-2 text-sm text-gray-900 text-right font-semibold">
                          {formatCurrency(item.quantity * item.price)}
                        </td>
                        <td className="py-2 text-right">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300">
                      <td colSpan={3} className="py-3 text-right font-semibold text-gray-900">
                        TOTAL:
                      </td>
                      <td className="py-3 text-right font-bold text-lg text-gray-900">
                        {formatCurrency(calculateTotal())}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Generate Quote Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Generate PDF Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
