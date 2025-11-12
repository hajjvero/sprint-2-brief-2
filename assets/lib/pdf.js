export const renderPDF = async (element) => {
    // create canvas of contaner cv
    const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false
    });

    const { jsPDF } = window.jspdf;

    // Create a new jsPDF instance
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth(); // get with of page A4
    const pageHeight = pdf.internal.pageSize.getHeight(); // get height of page A4

    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png');

    // Calculate dimensions of image
    let imgHeight = (canvas.height * pageWidth) / canvas.width;
    let position = 0;
    let heightLeft = imgHeight;


    // add first page
    pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add extra pages if needed (multi pages)
    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    // Open PDF in a new blank tab
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
}