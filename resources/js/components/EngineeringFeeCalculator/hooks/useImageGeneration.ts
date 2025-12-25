import { Language, SavedResult } from '../types';
import { BUILDING_GROUPS, COMPLEXITY_LEVELS, TRANSLATIONS } from '../constants';

export const useImageGeneration = (language: Language) => {
  const generateUniqueFilename = (): string => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    return `liwanlb-engineering-fee-${date}-${time}.png`;
  };

  const generateResultImage = (result?: SavedResult): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('');
        return;
      }

      // Set canvas size with proper dimensions
      canvas.width = 1000;
      canvas.height = 700;

      // Fill background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add border
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Load and draw logo
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Draw logo in top-left
        ctx.save();
        ctx.drawImage(img, 40, 40, 80, 80); // Position and size the logo
        ctx.restore();

        // Continue with the rest of the drawing after logo loads
        drawContent();
      };

      img.onerror = () => {
        // Fallback to placeholder if logo fails to load
        ctx.save();
        ctx.beginPath();
        ctx.arc(80, 70, 25, 0, 2 * Math.PI);
        ctx.fillStyle = '#3a3b3a';
        ctx.fill();
        ctx.strokeStyle = '#3a3b3a';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('L', 80, 70);
        ctx.restore();

        drawContent();
      };

      // Try to load the logo
      img.src = '/images/logo.png';

      const drawContent = () => {
        // Header with website
        ctx.fillStyle = '#3a3b3a';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        const title = language === 'ar' ? 'نتائج الحساب الهندسية' : 'Engineering Fee Calculation Results';
        ctx.fillText(title, canvas.width / 2, 60);

        // Website URL
        ctx.font = '16px Arial';
        ctx.fillStyle = '#3a3b3a';
        ctx.fillText('www.liwanlb.com', canvas.width / 2, 85);

        // Date
        ctx.font = '14px Arial';
        ctx.fillStyle = '#9ca3af';
        const date = result ? new Date(result.date).toLocaleDateString() : new Date().toLocaleDateString();
        ctx.fillText(date, canvas.width / 2, 105);

        // Financial Results Table
        ctx.textAlign = 'left';
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#3a3b3a';
        const financialTitle = language === 'ar' ? 'النتائج المالية' : 'Financial Results';
        ctx.fillText(financialTitle, 50, 150);

        // Table for financial results
        const tableX = 50;
        const tableY = 170;
        const tableWidth = canvas.width - 100;
        const rowHeight = 35;
        const colWidth = tableWidth / 2;

        // Table header
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(tableX, tableY, tableWidth, rowHeight);
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.strokeRect(tableX, tableY, tableWidth, rowHeight);

        // Header text
        ctx.fillStyle = '#3a3b3a';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(language === 'ar' ? 'البند' : 'Item', tableX + colWidth / 2, tableY + 23);
        ctx.fillText(language === 'ar' ? 'القيمة' : 'Value', tableX + colWidth * 1.5, tableY + 23);

        // Financial data rows
        const baseCost = result?.baseCostPerSqm || 0;
        const estCost = result?.estimatedCost || 0;
        const fee = result?.minimumFee || 0;
        const percentage = result?.applicablePercentage || 0;

        const financialData = [
          { label: TRANSLATIONS.baseCost[language], value: `$${baseCost.toLocaleString()}/m²`, color: '#3a3b3a' },
          { label: TRANSLATIONS.estimatedCost[language], value: `$${estCost.toLocaleString()}`, color: '#16a34a', bold: true }
        ];

        financialData.forEach((item, index) => {
          const y = tableY + rowHeight + (index * rowHeight);

          // Row background
          ctx.fillStyle = index % 2 === 0 ? '#ffffff' : '#f9fafb';
          ctx.fillRect(tableX, y, tableWidth, rowHeight);

          // Row border
          ctx.strokeStyle = '#e5e7eb';
          ctx.strokeRect(tableX, y, tableWidth, rowHeight);

          // Vertical line
          ctx.beginPath();
          ctx.moveTo(tableX + colWidth, y);
          ctx.lineTo(tableX + colWidth, y + rowHeight);
          ctx.stroke();

          // Text
          ctx.textAlign = 'left';
          ctx.fillStyle = '#374151';
          ctx.font = '14px Arial';
          ctx.fillText(item.label, tableX + 15, y + 23);

          ctx.textAlign = 'right';
          ctx.fillStyle = item.color;
          ctx.font = item.bold ? 'bold 16px Arial' : '14px Arial';
          ctx.fillText(item.value, tableX + tableWidth - 15, y + 23);
        });

        // Input Parameters Table
        ctx.textAlign = 'left';
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#3a3b3a';
        const paramsTitle = language === 'ar' ? 'معلمات الإدخال' : 'Input Parameters';
        ctx.fillText(paramsTitle, 50, 370);

        // Parameters table
        const paramsTableY = 390;
        const paramsData = [
          { label: TRANSLATIONS.group[language], value: result?.groupName || '' },
          { label: TRANSLATIONS.category[language], value: result?.categoryName || '' },
          { label: TRANSLATIONS.complexity[language], value: result?.complexityName || '' },
          { label: TRANSLATIONS.area[language], value: `${result?.area || ''} m²` }
        ];

        // Helper function to wrap text
        const wrapText = (text: string, maxWidth: number): string[] => {
          const words = text.split(' ');
          const lines: string[] = [];
          let currentLine = words[0];

          for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
              currentLine += ' ' + word;
            } else {
              lines.push(currentLine);
              currentLine = word;
            }
          }
          lines.push(currentLine);
          return lines;
        };

        paramsData.forEach((item, index) => {
          const y = paramsTableY + (index * rowHeight);

          // Row background
          ctx.fillStyle = index % 2 === 0 ? '#ffffff' : '#f9fafb';
          ctx.fillRect(tableX, y, tableWidth, rowHeight);

          // Row border
          ctx.strokeStyle = '#e5e7eb';
          ctx.strokeRect(tableX, y, tableWidth, rowHeight);

          // Vertical line
          ctx.beginPath();
          ctx.moveTo(tableX + colWidth, y);
          ctx.lineTo(tableX + colWidth, y + rowHeight);
          ctx.stroke();

          // Label
          ctx.textAlign = 'left';
          ctx.fillStyle = '#374151';
          ctx.font = '14px Arial';
          ctx.fillText(item.label, tableX + 15, y + 23);

          // Value (with wrapping if needed)
          ctx.textAlign = 'right';
          ctx.fillStyle = '#3a3b3a';
          ctx.font = '14px Arial';
          const valueLines = wrapText(item.value, colWidth - 30);
          valueLines.forEach((line, lineIndex) => {
            ctx.fillText(line, tableX + tableWidth - 15, y + 15 + (lineIndex * 18));
          });
        });

        // Footer
        ctx.font = '14px Arial';
        ctx.fillStyle = '#9ca3af';
        ctx.textAlign = 'center';
        const footer = language === 'ar' ? 'نقابة المهندسين - بيروت | www.liwanlb.com' : 'Engineers Syndicate - Beirut | www.liwanlb.com';
        ctx.fillText(footer, canvas.width / 2, canvas.height - 40);

        resolve(canvas.toDataURL('image/png'));
      };
    });
  };

  const downloadResultAsPNG = async (result?: SavedResult) => {
    try {
      const dataUrl = await generateResultImage(result);

      // Create download link with unique filename
      const link = document.createElement('a');
      link.download = generateUniqueFilename();
      link.href = dataUrl;
      link.click();

      return true;
    } catch (error) {
      console.error('Error downloading result:', error);
      return false;
    }
  };

  return {
    generateUniqueFilename,
    generateResultImage,
    downloadResultAsPNG
  };
};
