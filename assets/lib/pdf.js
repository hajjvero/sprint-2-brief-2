export const renderPDF = async (element) => {
    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
    });

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pageWidth;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    // === Adjust when content fits within 1 page ===
    if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    }
    // === Handle multi-page content ===
    else {
        let position = 0;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
    }

    // Open in new tab
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
};

export const renderPDFJson = async (json) => {
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    const maxWidth = pageWidth - (margin * 2);

    // Set font
    pdf.setFont('courier');
    pdf.setFontSize(10);
    // color green
    pdf.setTextColor(0, 128, 0);

    // Split text into lines that fit the page width
    const lines = pdf.splitTextToSize(json, maxWidth);

    let yPosition = margin;
    const lineHeight = 12;

    lines.forEach((line, index) => {
        // Check if we need a new page
        if (yPosition + lineHeight > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
        }

        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
    });

    // Open in new tab
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
};
