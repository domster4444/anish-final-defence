//@ts-nocheck
//library for export
import xlsx from "json-as-xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

//! -------------------------- export excel table logic starts here
export const excelExport = async (option, tableData) => {
  //* option ====== [{ label: "title", value: "title" }, // Top level data]
  //* tableData ====== tableData
  let data = [
    {
      sheet: "Sheet1",
      columns: option,
      content: tableData,
    },
  ];

  let settings = {
    fileName: "TableExcelExport", // Name of the resulting spreadsheet
    extraLength: 5, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
  };

  await xlsx(data, settings);
};
//! -------------------------- export excel table logic ends here

//! -------------------------- export pdf table logic starts here

export const pdfExport = (orientation: string = "landscape", title: string = "Table", columnArray, option, tableData) => {
  //* orientation = "landscape" or "portrait"
  //* title = "Table Name"
  //* eg:- columnArray(Heading Column Name) ====== ["Title", "ISBN", "Publisher", "Pages", "Location", "Edition", "Price", "Copies", "Checked Out", "On Hold", "Reserved", "Lost", "Damaged", "Reference Only", "Restricted Access"]
  //* eg:-  option ====== ["title", "isbn", "publisher", "noOfPages", "location", "edition", "price", "copies", "checkedOut", "onHold", "reserved", "lost", "damaged", "referenceOnly", "restrictedAccess"];
  //* eg:- tableData === tableData
  const doc = new jsPDF(orientation);
  doc.text(title, 10, 10);
  autoTable(doc, {
    head: [columnArray],
    body: tableData.map((item) => {
      let row = [];
      option.forEach((element) => {
        row.push(item[element]);
      });
      return row;
    }),
  });
  doc.save("TablePdfExport.pdf");
};
//! -------------------------- export pdf table logic ends here

//! -------------------------- print table logic starts here

export const printTable = (orientation: string = "landscape", title: string = "Table", columnArray, option, tableData) => {
  //* orientation = "landscape" or "portrait"
  //* title = "Table Name"
  //* eg:- columnArray(Heading Column Name) ====== ["Title", "ISBN", "Publisher", "Pages", "Location", "Edition", "Price", "Copies", "Checked Out", "On Hold", "Reserved", "Lost", "Damaged", "Reference Only", "Restricted Access"]
  //* eg:-  option ====== ["title", "isbn", "publisher", "noOfPages", "location", "edition", "price", "copies", "checkedOut", "onHold", "reserved", "lost", "damaged", "referenceOnly", "restrictedAccess"];
  //* eg:- tableData === tableData
  const doc = new jsPDF(orientation);
  doc.text(title, 10, 10);
  autoTable(doc, {
    head: [columnArray],
    body: tableData.map((item) => {
      let row = [];
      option.forEach((element) => {
        row.push(item[element]);
      });
      return row;
    }),
  });

  doc.autoPrint();
  const printWindow = window.open("", "_blank");
  printWindow.document.write('<html><head><title>Library Books</title></head><body><embed width="100%" height="100%" name="plugin" id="plugin" src="' + doc.output("datauristring") + '" type="application/pdf"></body></html>');
};
//! -------------------------- print table logic ends here
