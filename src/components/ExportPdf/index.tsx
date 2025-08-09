import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';

export default function ExportarEstudioPDF() {
  const exportarAPdfConSaltos = () => {
    const input = document.getElementById('detalle-estudio');
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`detalle_estudio_${new Date().toISOString().slice(0, 10)}.pdf`);
    });
  };

  return (
    <Button onClick={exportarAPdfConSaltos} variant="contained" sx={{ mb: 2 }}>
      📄 Exportar a PDF
    </Button>
  );
}
