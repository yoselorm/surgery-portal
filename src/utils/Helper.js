


export const exportToCSV = (data, filename = "surgery_records.csv") => {
    if (!data || data.length === 0) {
      console.error("No data provided for CSV export.");
      return;
    }
  
    // Convert nested objects into flat CSV-safe format
    const flattenObject = (obj, parentKey = "", result = {}) => {
      for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
  
        const newKey = parentKey ? `${parentKey}.${key}` : key;
  
        if (Array.isArray(obj[key])) {
          // Convert arrays to JSON string
          result[newKey] = JSON.stringify(obj[key]);
        } else if (obj[key] !== null && typeof obj[key] === "object") {
          flattenObject(obj[key], newKey, result);
        } else {
          result[newKey] = obj[key];
        }
      }
      return result;
    };
  
    // Flatten all records first
    const flatData = data.map((item) => flattenObject(item));
  
    // Get all unique keys across all rows
    const headers = Array.from(
      flatData.reduce((set, item) => {
        Object.keys(item).forEach((key) => set.add(key));
        return set;
      }, new Set())
    );
  
    // Create CSV string
    const csvRows = [];
  
    // Header row
    csvRows.push(headers.join(","));
  
    // Data rows
    flatData.forEach((item) => {
      const row = headers.map((header) => {
        let cell = item[header] ?? "";
  
        // Escape quotes
        if (typeof cell === "string") {
          cell = cell.replace(/"/g, '""');
        }
  
        // Wrap in quotes if contains comma
        if (typeof cell === "string" && cell.includes(",")) {
          cell = `"${cell}"`;
        }
  
        return cell;
      });
  
      csvRows.push(row.join(","));
    });
  
    // Create Blob and trigger download
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  export const generateSurgeryPDF = (surgeryRecord) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = 20;
  
    // Helper function to add text with auto-wrap
    const addText = (text, x, y, fontSize = 10, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? 'bold' : 'normal');
      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
      doc.text(lines, x, y);
      return y + (lines.length * fontSize * 0.5) + 5;
    };
  
    // Helper to check page break
    const checkPageBreak = (requiredSpace = 30) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };
  
    // Add section header
    const addSectionHeader = (title) => {
      checkPageBreak(20);
      doc.setFillColor(6, 182, 212);
      doc.rect(margin, yPosition, pageWidth - 2 * margin, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(title, margin + 5, yPosition + 7);
      doc.setTextColor(0, 0, 0);
      yPosition += 15;
    };
  
    const formatDate = (dateString) => {
      if (!dateString) return 'Not recorded';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    };
  
    const formatTime = (dateString) => {
      if (!dateString) return 'Not recorded';
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    };
  
    const doctorName = typeof surgeryRecord.doctor === 'object' 
      ? surgeryRecord.doctor?.fullname 
      : surgeryRecord.doctor || 'Not specified';
  
    // Title Header
    doc.setFillColor(6, 182, 212);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('SURGERY RECORD', pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(surgeryRecord.procedure, pageWidth / 2, 25, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Record ID: ${surgeryRecord.surgeryId}`, pageWidth / 2, 33, { align: 'center' });
  
    doc.setTextColor(0, 0, 0);
    yPosition = 50;
  
    // Basic Information
    addSectionHeader('PATIENT & SURGERY INFORMATION');
    yPosition = addText(`Patient Name: ${surgeryRecord.patientName}`, margin, yPosition, 10, true);
    yPosition = addText(`Age: ${surgeryRecord.patientAge} years  |  Gender: ${surgeryRecord.gender}`, margin, yPosition);
    yPosition = addText(`Surgery Type: ${surgeryRecord.surgeryType}`, margin, yPosition, 10, true);
    yPosition = addText(`Procedure: ${surgeryRecord.procedure}`, margin, yPosition);
    yPosition = addText(`Surgeon: ${doctorName}`, margin, yPosition, 10, true);
    yPosition = addText(`Date: ${formatDate(surgeryRecord.date)}  |  Time: ${surgeryRecord.time || formatTime(surgeryRecord.date)}`, margin, yPosition);
    yPosition = addText(`Status: ${surgeryRecord.status}`, margin, yPosition);
    yPosition += 5;
  
    // Clinical Presentation (Move earlier for better flow)
    if (surgeryRecord.formData?.symptoms) {
      addSectionHeader('CLINICAL PRESENTATION');
      const formatSymptom = (val) => {
        const mapping = {
          'never': 'Never',
          'less_than_once_month': 'Less than once a month',
          'less_than_once_week': 'Less than once a week',
          '1_6_days_per_week': '1-6 days per week',
          'every_day': 'Every day'
        };
        return mapping[val] || 'Not recorded';
      };
      yPosition = addText(`Pain: ${formatSymptom(surgeryRecord.formData.symptoms.pain)}`, margin, yPosition);
      yPosition = addText(`Itching: ${formatSymptom(surgeryRecord.formData.symptoms.itching)}`, margin, yPosition);
      yPosition = addText(`Bleeding: ${formatSymptom(surgeryRecord.formData.symptoms.bleeding)}`, margin, yPosition);
      yPosition = addText(`Soiling: ${formatSymptom(surgeryRecord.formData.symptoms.soiling)}`, margin, yPosition);
      yPosition = addText(`Prolapsing: ${formatSymptom(surgeryRecord.formData.symptoms.prolapsing)}`, margin, yPosition);
      yPosition += 5;
    }
  
    // VAS Score
    if (surgeryRecord.formData?.vasScore !== undefined) {
      addSectionHeader('VAS SCORE (PAIN ASSESSMENT)');
      yPosition = addText(`Visual Analog Scale: ${surgeryRecord.formData.vasScore}/10`, margin, yPosition, 10, true);
      let painLevel = 'No Pain';
      if (surgeryRecord.formData.vasScore >= 7) painLevel = 'Severe Pain';
      else if (surgeryRecord.formData.vasScore >= 4) painLevel = 'Moderate Pain';
      else if (surgeryRecord.formData.vasScore >= 1) painLevel = 'Mild Pain';
      yPosition = addText(`Pain Level: ${painLevel}`, margin, yPosition);
      yPosition += 5;
    }
  
    // Diagnostics
    if (surgeryRecord.formData?.diagnostics) {
      addSectionHeader('DIFFERENTIAL DIAGNOSTICS');
      const diagnosticLabels = {
        fissure: 'Fissure',
        skinTags: 'Skin Tags',
        leftoverHematoma: 'Leftover Hematoma',
        fistula: 'Fistula',
        cryptitis: 'Cryptitis',
        analRectumProlapse: 'Anal Rectum Prolapse',
        analStenosis: 'Anal Stenosis',
        analEczema: 'Anal Eczema',
        analVeinThrombosis: 'Anal Vein Thrombosis',
        others: 'Others'
      };
  
      Object.entries(surgeryRecord.formData.diagnostics).forEach(([key, value]) => {
        if (value.observed || value.treated) {
          const diagName = diagnosticLabels[key] || key.replace(/([A-Z])/g, ' $1').trim();
          const status = `${value.observed ? 'Observed' : 'Not Observed'} | ${value.treated ? 'Treated' : 'Not Treated'}`;
          yPosition = addText(`${diagName}: ${status}`, margin, yPosition);
          if (key === 'others' && value.description) {
            yPosition = addText(`  Description: ${value.description}`, margin, yPosition);
          }
        }
      });
      yPosition += 5;
    }
  
    // Treatment Methods
    if (surgeryRecord.formData?.treatmentMethods) {
      addSectionHeader('TREATMENT METHODS');
      const treatmentLabels = {
        medication: 'Medication',
        sclerosation: 'Sclerosation',
        infraredCoagulation: 'Infrared Coagulation',
        rubberBandLigation: 'Rubber Band Ligation',
        halDghal: 'HAL/DGHAL',
        surgery: 'Surgery',
        longo: 'Longo Procedure',
        radioFrequencyAblation: 'Radio Frequency Ablation'
      };
  
      const appliedTreatments = Object.entries(surgeryRecord.formData.treatmentMethods)
        .filter(([_, value]) => value === true)
        .map(([key, _]) => treatmentLabels[key] || key);
  
      if (appliedTreatments.length > 0) {
        yPosition = addText(`Applied Treatments: ${appliedTreatments.join(', ')}`, margin, yPosition);
      } else {
        yPosition = addText('No specific treatment methods recorded', margin, yPosition);
      }
      yPosition += 5;
    }
  
    // Anaesthesia
    if (surgeryRecord.formData) {
      addSectionHeader('ANAESTHESIA DETAILS');
      yPosition = addText(`Spinal Anaesthesia: ${surgeryRecord.formData.spinalAnaesthesia === 'yes' ? 'Yes' : 'No'}`, margin, yPosition);
      yPosition = addText(`Saddle Block: ${surgeryRecord.formData.saddleBlock === 'yes' ? 'Yes' : 'No'}`, margin, yPosition);
      yPosition = addText(`Pudendus Block: ${surgeryRecord.formData.pudendusBlock === 'yes' ? 'Yes' : 'No'}`, margin, yPosition);
      yPosition = addText(`General Anaesthesia: ${surgeryRecord.formData.generalAnaesthesia === 'yes' ? 'Yes' : 'No'}`, margin, yPosition);
      yPosition = addText(`Regional Anaesthesia: ${surgeryRecord.formData.regionalAnaesthesia === 'yes' ? 'Yes' : 'No'}`, margin, yPosition);
      yPosition = addText(`Local Anaesthesia: ${surgeryRecord.formData.localAnaesthesia === 'yes' ? 'Yes' : 'No'}`, margin, yPosition);
      
      // Previous Operation
      if (surgeryRecord.formData.hasPreviousOp === 'yes' && surgeryRecord.formData.previousOperation) {
        yPosition = addText(`Previous Operation: ${surgeryRecord.formData.previousOperation}`, margin, yPosition, 10, true);
      }
      yPosition += 5;
    }
  
    // Laser Settings (if Laser Surgery)
    if (surgeryRecord.surgeryType === 'Laser Surgery' && surgeryRecord.formData) {
      addSectionHeader('LASER SETTINGS');
      yPosition = addText(`Wavelength: ${surgeryRecord.formData.laserWavelength || 'N/A'}`, margin, yPosition);
      yPosition = addText(`Power: ${surgeryRecord.formData.laserPower || 'N/A'}`, margin, yPosition);
      yPosition = addText(`Pulse Mode: ${surgeryRecord.formData.laserPulseMode || 'N/A'}`, margin, yPosition);
      yPosition = addText(`Pre-op Medication: ${surgeryRecord.formData.medication || 'None'}`, margin, yPosition);
      yPosition += 5;
    }
  
    // Intra Operative Data (Enhanced with HAL and Mucupex)
    if (surgeryRecord.formData?.intraOperativeData?.length > 0) {
      addSectionHeader('INTRA OPERATIVE DATA');
      
      const totalEnergy = surgeryRecord.formData.intraOperativeData.reduce(
        (sum, item) => sum + parseFloat(item.energy || 0), 0
      );
  
      surgeryRecord.formData.intraOperativeData.forEach((item, index) => {
        checkPageBreak();
        yPosition = addText(`Entry #${index + 1}:`, margin, yPosition, 10, true);
        yPosition = addText(
          `  Position: ${item.position} o'clock  |  Grade: ${item.grade}  |  Energy: ${item.energy} J`, 
          margin, 
          yPosition
        );
        
        // Add HAL and Mucupex info
        const procedures = [];
        if (item.hal === 'yes') procedures.push('HAL');
        if (item.mucupex === 'yes') procedures.push('Mucupex');
        
        if (procedures.length > 0) {
          yPosition = addText(`  Procedures: ${procedures.join(', ')}`, margin, yPosition);
        } else {
          yPosition = addText(`  Procedures: None`, margin, yPosition);
        }
        
        yPosition += 2;
      });
      
      yPosition = addText(`Total Energy Applied: ${totalEnergy.toFixed(2)} J`, margin, yPosition, 10, true);
      yPosition += 5;
    }
  
    // Postoperative Medication
    if (surgeryRecord.formData?.postoperativeMedication) {
      addSectionHeader('POSTOPERATIVE MEDICATION');
      yPosition = addText(surgeryRecord.formData.postoperativeMedication, margin, yPosition);
      yPosition += 5;
    }
  
    // Follow-Up Schedule (Enhanced with symptoms and VAS scores)
    if (surgeryRecord.formData?.followUp) {
      addSectionHeader('FOLLOW-UP SCHEDULE');
      const followUpPeriods = [
        { key: 'twoWeeks', label: '2 Weeks' },
        { key: 'sixWeeks', label: '6 Weeks' },
        { key: 'threeMonths', label: '3 Months' },
        { key: 'sixMonths', label: '6 Months' },
        { key: 'twelveMonths', label: '12 Months' },
        { key: 'twoYears', label: '2 Years' },
        { key: 'threeYears', label: '3 Years' },
        { key: 'fiveYears', label: '5 Years' }
      ];
  
      followUpPeriods.forEach(period => {
        const followUp = surgeryRecord.formData.followUp[period.key];
        if (followUp?.completed) {
          checkPageBreak(40);
          yPosition = addText(`${period.label} Follow-Up:`, margin, yPosition, 10, true);
          yPosition = addText(`  Date: ${followUp.date ? formatDate(followUp.date) : 'Not recorded'}`, margin, yPosition);
          
          // VAS Score
          if (followUp.vasScore !== undefined && followUp.vasScore !== '') {
            yPosition = addText(`  VAS Score: ${followUp.vasScore}/10`, margin, yPosition);
          }
          
          // Symptoms
          if (followUp.symptoms) {
            const symptomsList = [];
            if (followUp.symptoms.pain === 'yes') symptomsList.push('Pain');
            if (followUp.symptoms.itching === 'yes') symptomsList.push('Itching');
            if (followUp.symptoms.bleeding === 'yes') symptomsList.push('Bleeding');
            if (followUp.symptoms.soiling === 'yes') symptomsList.push('Soiling');
            if (followUp.symptoms.prolapsing === 'yes') symptomsList.push('Prolapsing');
            
            if (symptomsList.length > 0) {
              yPosition = addText(`  Symptoms Present: ${symptomsList.join(', ')}`, margin, yPosition);
            } else {
              yPosition = addText(`  Symptoms Present: None`, margin, yPosition);
            }
          }
          
          // Notes
          if (followUp.notes) {
            yPosition = addText(`  Notes: ${followUp.notes}`, margin, yPosition);
          }
          yPosition += 3;
        }
      });
  
      const completedCount = followUpPeriods.filter(p =>
        surgeryRecord.formData.followUp[p.key]?.completed
      ).length;
      yPosition = addText(
        `Follow-Up Progress: ${completedCount}/${followUpPeriods.length} completed`, 
        margin, 
        yPosition, 
        10, 
        true
      );
      yPosition += 5;
    }
  
    // Footer
    const timestamp = new Date().toLocaleString();
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on: ${timestamp}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  
    // Save PDF
    doc.save(`Surgery_Record_${surgeryRecord.surgeryId}_${surgeryRecord.patientName.replace(/\s+/g, '_')}.pdf`);
  };
  

// export const generateSurgeryPDF = (surgeryRecord) => {

//   const doc = new jsPDF();
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();
//   const margin = 20;
//   let yPosition = 20;

//   // Helper function to add text with auto-wrap
//   const addText = (text, x, y, fontSize = 10, isBold = false) => {
//     doc.setFontSize(fontSize);
//     doc.setFont(undefined, isBold ? 'bold' : 'normal');
//     const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
//     doc.text(lines, x, y);
//     return y + (lines.length * fontSize * 0.5) + 5;
//   };

//   // Helper to check page break
//   const checkPageBreak = (requiredSpace = 30) => {
//     if (yPosition + requiredSpace > pageHeight - margin) {
//       doc.addPage();
//       yPosition = margin;
//       return true;
//     }
//     return false;
//   };

//   // Add section header
//   const addSectionHeader = (title) => {
//     checkPageBreak(20);
//     doc.setFillColor(6, 182, 212);
//     doc.rect(margin, yPosition, pageWidth - 2 * margin, 10, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(12);
//     doc.setFont(undefined, 'bold');
//     doc.text(title, margin + 5, yPosition + 7);
//     doc.setTextColor(0, 0, 0);
//     yPosition += 15;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };

//   const doctorName = typeof surgeryRecord.doctor === 'object' 
//     ? surgeryRecord.doctor?.fullname 
//     : surgeryRecord.doctor || 'Not specified';

//   // Title Header
//   doc.setFillColor(6, 182, 212);
//   doc.rect(0, 0, pageWidth, 40, 'F');
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(20);
//   doc.setFont(undefined, 'bold');
//   doc.text('SURGERY RECORD', pageWidth / 2, 15, { align: 'center' });
//   doc.setFontSize(12);
//   doc.text(surgeryRecord.procedure, pageWidth / 2, 25, { align: 'center' });
//   doc.setFontSize(10);
//   doc.text(`Record ID: ${surgeryRecord.surgeryId}`, pageWidth / 2, 33, { align: 'center' });

//   doc.setTextColor(0, 0, 0);
//   yPosition = 50;

//   // Basic Information
//   addSectionHeader('PATIENT & SURGERY INFORMATION');
//   yPosition = addText(`Patient Name: ${surgeryRecord.patientName}`, margin, yPosition, 10, true);
//   yPosition = addText(`Age: ${surgeryRecord.patientAge} years  |  Gender: ${surgeryRecord.gender}`, margin, yPosition);
//   yPosition = addText(`Surgery Type: ${surgeryRecord.surgeryType}`, margin, yPosition, 10, true);
//   yPosition = addText(`Procedure: ${surgeryRecord.procedure}`, margin, yPosition);
//   yPosition = addText(`Surgeon: ${doctorName}`, margin, yPosition, 10, true);
//   yPosition = addText(`Date: ${formatDate(surgeryRecord.date)}  |  Time: ${formatTime(surgeryRecord.date)}`, margin, yPosition);
//   yPosition = addText(`Status: ${surgeryRecord.status}`, margin, yPosition);
//   yPosition += 5;

//   // VAS Score
//   if (surgeryRecord.formData?.vasScore !== undefined) {
//     addSectionHeader('VAS SCORE (PAIN ASSESSMENT)');
//     yPosition = addText(`Visual Analog Scale: ${surgeryRecord.formData.vasScore}/10`, margin, yPosition, 10, true);
//     let painLevel = 'No Pain';
//     if (surgeryRecord.formData.vasScore >= 7) painLevel = 'Severe Pain';
//     else if (surgeryRecord.formData.vasScore >= 4) painLevel = 'Moderate Pain';
//     else if (surgeryRecord.formData.vasScore >= 1) painLevel = 'Mild Pain';
//     yPosition = addText(`Pain Level: ${painLevel}`, margin, yPosition);
//     yPosition += 5;
//   }

//   // Laser Settings (if Laser Surgery)
//   if (surgeryRecord.surgeryType === 'Laser Surgery' && surgeryRecord.formData) {
//     addSectionHeader('LASER SETTINGS');
//     yPosition = addText(`Wavelength: ${surgeryRecord.formData.laserWavelength || 'N/A'}`, margin, yPosition);
//     yPosition = addText(`Power: ${surgeryRecord.formData.laserPower || 'N/A'}`, margin, yPosition);
//     yPosition = addText(`Pulse Mode: ${surgeryRecord.formData.laserPulseMode || 'N/A'}`, margin, yPosition);
    
//     const totalEnergy = surgeryRecord.formData.intraOperativeData?.reduce(
//       (sum, item) => sum + parseFloat(item.energy || 0), 0
//     ) || 0;
//     yPosition = addText(`Total Applied Energy: ${totalEnergy.toFixed(2)} J`, margin, yPosition, 10, true);
//     yPosition = addText(`Pre-op Medication: ${surgeryRecord.formData.medication || 'None'}`, margin, yPosition);
//     yPosition += 5;

//     // Diagnostics
//     if (surgeryRecord.formData.diagnostics) {
//       addSectionHeader('DIFFERENTIAL DIAGNOSTICS');
//       Object.entries(surgeryRecord.formData.diagnostics).forEach(([key, value]) => {
//         if (key !== 'others' && (value.observed || value.treated)) {
//           const diagName = key.replace(/([A-Z])/g, ' $1').trim();
//           const status = `${value.observed ? 'Observed' : 'Not Observed'} | ${value.treated ? 'Treated' : 'Not Treated'}`;
//           yPosition = addText(`${diagName}: ${status}`, margin, yPosition);
//         }
//       });
//       yPosition += 5;
//     }

//     // Anaesthesia
//     addSectionHeader('ANAESTHESIA DETAILS');
//     yPosition = addText(`General: ${surgeryRecord.formData.generalAnaesthesia === 'yes' ? 'Yes' : 'No'}`, margin, yPosition);
//     yPosition = addText(`Regional: ${surgeryRecord.formData.regionalAnaesthesia === 'yes' ? 'Yes' : 'No'}`, margin, yPosition);
//     yPosition = addText(`Local: ${surgeryRecord.formData.localAnaesthesia === 'yes' ? 'Yes' : 'No'}`, margin, yPosition);
//     yPosition += 5;

//     // Intra Operative Data
//     if (surgeryRecord.formData.intraOperativeData?.length > 0) {
//       addSectionHeader('INTRA OPERATIVE DATA');
//       surgeryRecord.formData.intraOperativeData.forEach((item) => {
//         checkPageBreak();
//         yPosition = addText(
//           `Position ${item.position} o'clock - Grade ${item.grade} - Energy: ${item.energy} J`, 
//           margin, 
//           yPosition
//         );
//       });
//       yPosition = addText(`Total Energy Applied: ${totalEnergy.toFixed(2)} J`, margin, yPosition, 10, true);
//       yPosition += 5;
//     }

//     // Clinical Presentation
//     if (surgeryRecord.formData.symptoms) {
//       addSectionHeader('CLINICAL PRESENTATION');
//       const formatSymptom = (val) => {
//         const mapping = {
//           'never': 'Never',
//           'less_than_once_month': 'Less than once a month',
//           'less_than_once_week': 'Less than once a week',
//           '1_6_days_per_week': '1-6 days per week',
//           'every_day': 'Every day'
//         };
//         return mapping[val] || 'Not recorded';
//       };
//       yPosition = addText(`Pain: ${formatSymptom(surgeryRecord.formData.symptoms.pain)}`, margin, yPosition);
//       yPosition = addText(`Itching: ${formatSymptom(surgeryRecord.formData.symptoms.itching)}`, margin, yPosition);
//       yPosition = addText(`Bleeding: ${formatSymptom(surgeryRecord.formData.symptoms.bleeding)}`, margin, yPosition);
//       yPosition = addText(`Soiling: ${formatSymptom(surgeryRecord.formData.symptoms.soiling)}`, margin, yPosition);
//       yPosition = addText(`Prolapsing: ${formatSymptom(surgeryRecord.formData.symptoms.prolapsing)}`, margin, yPosition);
//       yPosition += 5;
//     }

//     // Postoperative Medication
//     if (surgeryRecord.formData.postoperativeMedication) {
//       addSectionHeader('POSTOPERATIVE MEDICATION');
//       yPosition = addText(surgeryRecord.formData.postoperativeMedication, margin, yPosition);
//       yPosition += 5;
//     }

//     // Follow-Up Schedule
//     if (surgeryRecord.formData.followUp) {
//       addSectionHeader('FOLLOW-UP SCHEDULE');
//       const followUpPeriods = [
//         { key: 'twoWeeks', label: '2 Weeks' },
//         { key: 'sixWeeks', label: '6 Weeks' },
//         { key: 'threeMonths', label: '3 Months' },
//         { key: 'sixMonths', label: '6 Months' },
//         { key: 'twelveMonths', label: '12 Months' },
//         { key: 'twoYears', label: '2 Years' },
//         { key: 'threeYears', label: '3 Years' },
//         { key: 'fiveYears', label: '5 Years' }
//       ];

//       followUpPeriods.forEach(period => {
//         const followUp = surgeryRecord.formData.followUp[period.key];
//         if (followUp?.completed) {
//           checkPageBreak();
//           yPosition = addText(`${period.label} Follow-Up:`, margin, yPosition, 10, true);
//           yPosition = addText(`  Date: ${followUp.date ? formatDate(followUp.date) : 'Not recorded'}`, margin, yPosition);
//           if (followUp.notes) {
//             yPosition = addText(`  Notes: ${followUp.notes}`, margin, yPosition);
//           }
//           yPosition += 3;
//         }
//       });

//       const completedCount = followUpPeriods.filter(p =>
//         surgeryRecord.formData.followUp[p.key]?.completed
//       ).length;
//       yPosition = addText(
//         `Follow-Up Progress: ${completedCount}/${followUpPeriods.length} completed`, 
//         margin, 
//         yPosition, 
//         10, 
//         true
//       );
//     }
//   }

//   // Footer
//   const timestamp = new Date().toLocaleString();
//   doc.setFontSize(8);
//   doc.setTextColor(128, 128, 128);
//   doc.text(`Generated on: ${timestamp}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

//   // Save PDF
//   doc.save(`Surgery_Record_${surgeryRecord.surgeryId}_${surgeryRecord.patientName.replace(/\s+/g, '_')}.pdf`);
// };