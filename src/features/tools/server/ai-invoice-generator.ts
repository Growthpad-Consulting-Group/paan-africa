import { readJson, reply } from '@/lib/server/http';
import { errorMessage } from '@/utils/errors';
import OpenAI from 'openai';

// Fallback invoice generator when OpenAI is unavailable
function generateFallbackInvoice(data: any) {
  const {
    businessName,
    businessEmail,
    businessPhone,
    businessAddress,
    clientName,
    clientEmail,
    clientAddress,
    invoiceNumber,
    invoiceDate,
    dueDate,
    currency,
    services,
    taxRate,
    discount,
    notes,
    paymentTerms,
    paymentMethods
  } = data;

  // Calculate totals with safe defaults
  const subtotal = services.reduce((sum: any, service: any) => sum + (service.amount || 0), 0);
  const discountAmount = (subtotal * (discount || 0)) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * (taxRate || 0)) / 100;
  const total = taxableAmount + taxAmount;

  return `
╔══════════════════════════════════════════════════════════════════════════════╗
║                                    INVOICE                                   ║
╚══════════════════════════════════════════════════════════════════════════════╝

INVOICE DETAILS:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Invoice Number: ${invoiceNumber || 'N/A'}                                    │
│ Date: ${invoiceDate || new Date().toLocaleDateString()}                      │
│ Due Date: ${dueDate || 'Not specified'}                                      │
└─────────────────────────────────────────────────────────────────────────────┘

BILL TO:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ${clientName || 'N/A'}                                                      │
${clientEmail ? `│ Email: ${clientEmail}` : ''}
${clientAddress ? `│ ${clientAddress}` : ''}
└─────────────────────────────────────────────────────────────────────────────┘

FROM:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ${businessName || 'N/A'}                                                   │
${businessEmail ? `│ Email: ${businessEmail}` : ''}
${businessPhone ? `│ Phone: ${businessPhone}` : ''}
${businessAddress ? `│ ${businessAddress}` : ''}
└─────────────────────────────────────────────────────────────────────────────┘

SERVICES PROVIDED:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Description                    │ Qty │ Rate        │ Amount                │
├─────────────────────────────────────────────────────────────────────────────┤
${services.map((service: any, index: any) => {
  const desc = (service.description || 'Service description not provided').substring(0, 30);
  const qty = service.quantity.toString();
  const rate = `${currency || 'USD'} ${service.rate.toFixed(2)}`;
  const amount = `${currency || 'USD'} ${service.amount.toFixed(2)}`;
  return `│ ${desc.padEnd(30)} │ ${qty.padStart(3)} │ ${rate.padEnd(11)} │ ${amount.padEnd(20)} │`;
}).join('\n')}
└─────────────────────────────────────────────────────────────────────────────┘

FINANCIAL SUMMARY:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Subtotal:                                 ${currency || 'USD'} ${subtotal.toFixed(2).padStart(10)} │
${discount > 0 ? `│ Discount (${discount}%):                        -${currency || 'USD'} ${discountAmount.toFixed(2).padStart(10)} │` : ''}
${taxRate > 0 ? `│ Tax (${taxRate}%):                           ${currency || 'USD'} ${taxAmount.toFixed(2).padStart(10)} │` : ''}
├─────────────────────────────────────────────────────────────────────────────┤
│ TOTAL:                                    ${currency || 'USD'} ${total.toFixed(2).padStart(10)} │
└─────────────────────────────────────────────────────────────────────────────┘

PAYMENT INFORMATION:
┌─────────────────────────────────────────────────────────────────────────────┐
│ Payment Terms: ${paymentTerms || 'Not specified'}                           │
${paymentMethods && paymentMethods.length > 0 ? `│ Payment Methods: ${paymentMethods.join(', ')}` : ''}
└─────────────────────────────────────────────────────────────────────────────┘

${notes ? `
ADDITIONAL NOTES:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ${notes}                                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
` : ''}

╔══════════════════════════════════════════════════════════════════════════════╗
║                              THANK YOU FOR YOUR BUSINESS!                    ║
║                                                                              ║
║  ${businessName || 'N/A'}                                                   ║
╚══════════════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════════════════╗
║                           POWERED BY PAAN AFRICA                             ║
║                                                                              ║
║  Generated with PAAN AI Invoice Generator | paan.africa                     ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `.trim();
}

export async function aiInvoiceGenerator(request: Request): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = ((await readJson(request)) ?? {}) as Record<string, any>;
  console.log('API endpoint called with method:', request.method);

  console.log('Request body:', body);

  const { 
    businessName,
    businessEmail,
    businessPhone,
    businessAddress,
    clientName,
    clientEmail,
    clientAddress,
    invoiceNumber,
    invoiceDate,
    dueDate,
    currency,
    services,
    taxRate,
    discount,
    notes,
    paymentTerms,
    paymentMethods
  } = body;
  
  console.log('Destructured data:', {
    businessName,
    clientName,
    invoiceNumber,
    services,
    currency
  });

  // Validate required fields
  if (!businessName || !clientName || !invoiceNumber) {
    return reply({ 
      message: 'Missing required fields: businessName, clientName, invoiceNumber' 
    }, 400);
  }

  // Check for OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is missing');
    return reply({ 
      message: 'AI service is currently unavailable. Please try again later.' 
    }, 500);
  }

  try {
    console.log('Starting invoice generation with data:', {
      businessName,
      clientName,
      invoiceNumber,
      services,
      currency
    });
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Calculate totals
    const subtotal = services.reduce((sum: any, service: any) => sum + (service.amount || 0), 0);
    const discountAmount = (subtotal * (discount || 0)) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * (taxRate || 0)) / 100;
    const total = taxableAmount + taxAmount;
    
    console.log('Calculated totals:', {
      subtotal,
      discountAmount,
      taxableAmount,
      taxAmount,
      total
    });

    // Create a comprehensive prompt for the AI
    const prompt = `
Create a professional invoice for a business transaction. Use the following information to generate a polished, client-ready invoice:

BUSINESS INFORMATION:
- Business Name: ${businessName}
- Business Email: ${businessEmail || 'Not provided'}
- Business Phone: ${businessPhone || 'Not provided'}
- Business Address: ${businessAddress || 'Not provided'}

CLIENT INFORMATION:
- Client Name: ${clientName}
- Client Email: ${clientEmail || 'Not provided'}
- Client Address: ${clientAddress || 'Not provided'}

INVOICE DETAILS:
- Invoice Number: ${invoiceNumber}
- Invoice Date: ${invoiceDate || new Date().toLocaleDateString()}
- Due Date: ${dueDate || 'Not specified'}
- Currency: ${currency}

SERVICES PROVIDED:
${services.map((service: any, index: any) => `
${index + 1}. ${service.description || 'Service description not provided'}
   Quantity: ${service.quantity}
   Rate: ${currency} ${service.rate}
   Amount: ${currency} ${service.amount}
`).join('')}

FINANCIAL SUMMARY:
- Subtotal: ${currency} ${subtotal.toFixed(2)}
- Discount: ${discount}% (${currency} ${discountAmount.toFixed(2)})
- Taxable Amount: ${currency} ${taxableAmount.toFixed(2)}
- Tax Rate: ${taxRate}%
- Tax Amount: ${currency} ${taxAmount.toFixed(2)}
- Total Amount: ${currency} ${total.toFixed(2)}

PAYMENT INFORMATION:
- Payment Terms: ${paymentTerms}
- Payment Methods: ${paymentMethods ? paymentMethods.join(', ') : 'Not specified'}

ADDITIONAL NOTES:
${notes || 'No additional notes provided'}

Please create a professional invoice with the following structure:
1. A clear header with business branding
2. Professional business and client information layout
3. Detailed service breakdown in a table format
4. Clear financial summary with subtotals, taxes, and totals
5. Professional payment terms and methods
6. Any additional notes or terms
7. Professional footer with contact information

Make the invoice look polished and ready for client presentation. Use professional language and formatting.
`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('OpenAI request timed out')), 55000)
    );

    const completion = await Promise.race([
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional business assistant specializing in creating polished, client-ready invoices. You understand business communication, financial documentation, and professional presentation. Your goal is to create invoices that look professional and are ready for client presentation."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1200,
        temperature: 0.7,
      }),
      timeoutPromise
    ]);

    const text = (completion as { choices: { message: { content: string } }[] }).choices[0].message.content;
    
    // Create a summary for the invoice
    const summary = `Professional invoice for ${clientName} totaling ${currency} ${total.toFixed(2)}. Includes ${services.length} service item(s) with ${taxRate > 0 ? `${taxRate}% tax` : 'no tax'}${discount > 0 ? ` and ${discount}% discount` : ''}. Payment terms: ${paymentTerms}.`;

    return reply({
      success: true,
      invoice: text,
      summary: summary,
      timestamp: new Date().toISOString(),
      invoiceDetails: {
        businessName,
        clientName,
        invoiceNumber,
        invoiceDate: invoiceDate || new Date().toLocaleDateString(),
        dueDate: dueDate || 'Not specified',
        currency,
        total: total.toFixed(2),
        subtotal: subtotal.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        discountAmount: discountAmount.toFixed(2)
      }
    });

  } catch (error) {
    console.error('Full error details:', error);
    console.error('Error message:', errorMessage(error));
    console.error('Error type:', typeof error);
    
    if (errorMessage(error) && errorMessage(error).includes('timed out')) {
      return reply({
        message: 'AI service timed out. Please try again or reduce your input size.',
      }, 504);
    }
    
    // Handle OpenAI quota exceeded or API unavailable - provide fallback
    if (errorMessage(error) && (errorMessage(error).includes('quota') || errorMessage(error).includes('429'))) {
      console.error('OpenAI quota exceeded, using fallback template:', error);
      
      try {
        console.log('Attempting fallback generation with data:', {
          businessName,
          clientName,
          invoiceNumber,
          services,
          currency
        });
        
        // Generate a fallback invoice using a template
        const fallbackInvoice = generateFallbackInvoice({
          businessName,
          businessEmail,
          businessPhone,
          businessAddress,
          clientName,
          clientEmail,
          clientAddress,
          invoiceNumber,
          invoiceDate: invoiceDate || new Date().toLocaleDateString(),
          dueDate: dueDate || 'Not specified',
          currency,
          services,
          taxRate: taxRate || 0,
          discount: discount || 0,
          notes,
          paymentTerms,
          paymentMethods: paymentMethods || []
        });
        
        console.log('Fallback invoice generated successfully');
        
        // Calculate totals for fallback (since they're not in scope here)
        const fallbackSubtotal = services.reduce((sum: any, service: any) => sum + (service.amount || 0), 0);
        const fallbackDiscountAmount = (fallbackSubtotal * (discount || 0)) / 100;
        const fallbackTaxableAmount = fallbackSubtotal - fallbackDiscountAmount;
        const fallbackTaxAmount = (fallbackTaxableAmount * (taxRate || 0)) / 100;
        const fallbackTotal = fallbackTaxableAmount + fallbackTaxAmount;
        
        const summary = `Professional invoice for ${clientName} totaling ${currency} ${fallbackTotal.toFixed(2)}. Includes ${services.length} service item(s) with ${taxRate > 0 ? `${taxRate}% tax` : 'no tax'}${discount > 0 ? ` and ${discount}% discount` : ''}. Payment terms: ${paymentTerms || 'Not specified'}.`;
        
        return reply({
          success: true,
          invoice: fallbackInvoice,
          summary: summary,
          timestamp: new Date().toISOString(),
          invoiceDetails: {
            businessName,
            clientName,
            invoiceNumber,
            invoiceDate: invoiceDate || new Date().toLocaleDateString(),
            dueDate: dueDate || 'Not specified',
            currency,
            total: fallbackTotal.toFixed(2),
            subtotal: fallbackSubtotal.toFixed(2),
            taxAmount: fallbackTaxAmount.toFixed(2),
            discountAmount: fallbackDiscountAmount.toFixed(2)
          },
          fallback: true
        });
      } catch (fallbackError) {
        console.error('Fallback invoice generation failed:', fallbackError);
        return reply({
          message: 'Failed to generate invoice. Please try again.',
          error: 'Both AI and fallback generation failed'
        }, 500);
      }
    }
    
    console.error('OpenAI API error:', error);

    // Always return JSON, and include error details in development
    return reply({ 
      message: 'An error occurred while generating your invoice. Please try again.',
      error: typeof error === 'string' ? error : errorMessage(error) || String(error),
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
    }, 500);
  }
}
