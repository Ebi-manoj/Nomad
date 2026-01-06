import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ReportTransaction {
  id: string;
  date: string;
  type: 'Hike Commission' | 'Ride Commission' | 'Subscription';
  userName: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

interface ReportStats {
  totalRevenue: number;
  hikeCommission: number;
  rideCommission: number;
  subscriptions: number;
  totalTransactions: number;
  dateRange: string;
}

export const generateHTMLReport = async (
  transactions: ReportTransaction[],
  stats: ReportStats
) => {
  // Create a hidden div with your report HTML
  const reportHTML = `
    <div id="report-container" style="width: 800px; padding: 40px; background: white; font-family: Arial;">
      <!-- Header -->
      <div style="display: flex; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px;">
        <div style="width: 60px; height: 60px; background: #2563eb; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 24px; font-weight: bold;">ND</span>
        </div>
        <div style="margin-left: 20px; flex: 1;">
          <h1 style="margin: 0; font-size: 32px; color: #111827;">Revenue Report</h1>
          <p style="margin: 5px 0 0 0; color: #6b7280;">Nomad  - Financial Analytics</p>
        </div>
        <div style="text-align: right; color: #6b7280; font-size: 12px;">
          <div>Generated: ${new Date().toLocaleString()}</div>
          <div>Period: ${stats.dateRange}</div>
        </div>
      </div>

      <!-- Summary Cards -->
      <h2 style="font-size: 20px; margin-bottom: 15px;">Executive Summary</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 20px; border-radius: 12px; color: white;">
          <div style="font-size: 12px; opacity: 0.9;">Total Revenue</div>
          <div style="font-size: 24px; font-weight: bold; margin-top: 5px;">₹${stats.totalRevenue.toLocaleString()}</div>
        </div>
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 12px; color: white;">
          <div style="font-size: 12px; opacity: 0.9;">Hike Commission</div>
          <div style="font-size: 24px; font-weight: bold; margin-top: 5px;">₹${stats.hikeCommission.toLocaleString()}</div>
        </div>
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 20px; border-radius: 12px; color: white;">
          <div style="font-size: 12px; opacity: 0.9;">Ride Commission</div>
          <div style="font-size: 24px; font-weight: bold; margin-top: 5px;">₹${stats.rideCommission.toLocaleString()}</div>
        </div>
        <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 20px; border-radius: 12px; color: white;">
          <div style="font-size: 12px; opacity: 0.9;">Subscriptions</div>
          <div style="font-size: 24px; font-weight: bold; margin-top: 5px;">₹${stats.subscriptions.toLocaleString()}</div>
        </div>
      </div>

      <!-- Transaction Table -->
      <h2 style="font-size: 20px; margin-bottom: 15px;">Transaction Details</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
        <thead>
          <tr style="background: #2563eb; color: white;">
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">ID</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Date</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Type</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">User</th>
            <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Amount</th>
            <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${transactions
            .map(
              (t, i) => `
            <tr style="background: ${i % 2 === 0 ? '#f9fafb' : 'white'};">
              <td style="padding: 10px; border: 1px solid #ddd;">TXN${t.id.slice(
                0,
                8
              )}</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${new Date(
                t.date
              ).toLocaleString()}</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${t.type}</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                t.userName
              }</td>
              <td style="padding: 10px; text-align: right; border: 1px solid #ddd; font-weight: bold;">₹${
                t.amount
              }</td>
              <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">
                <span style="padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 10px; ${
                  t.status === 'completed'
                    ? 'background: #d1fae5; color: #065f46;'
                    : t.status === 'pending'
                    ? 'background: #fef3c7; color: #92400e;'
                    : 'background: #fee2e2; color: #991b1b;'
                }">
                  ${t.status.toUpperCase()}
                </span>
              </td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>

      <!-- Footer -->
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280; text-align: center;">
        <div>Nomad Platform | support@nomad.com | Confidential Report</div>
      </div>
    </div>
  `;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.left = '-9999px';
  iframe.style.top = '0';
  iframe.style.width = '900px';
  iframe.style.height = '1200px';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) {
    document.body.removeChild(iframe);
    return;
  }

  doc.open();
  doc.write(
    `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0; background:#ffffff;">${reportHTML}</body></html>`
  );
  doc.close();

  // Convert to PDF from iframe content
  const element = doc.getElementById('report-container');
  if (element) {
    const canvas = await html2canvas(element as HTMLElement, {
      scale: 2,
      backgroundColor: '#ffffff',
    });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Additional pages
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save(`revenue-report-${Date.now()}.pdf`);
  }

  // Cleanup
  document.body.removeChild(iframe);
};
