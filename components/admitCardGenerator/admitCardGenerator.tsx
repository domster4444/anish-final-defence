//@ts-nocheck

import { saveAs } from "file-saver";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { globalConstant } from "constant/constant";

export const admitCardGenerator = async (schoolName, fullName, examName, className, sectionName, schoolFolderName, selectedTemplate, principalSignature) => {
  //! https://www.pdf2go.com/jpg-to-pdf to convert your image to pdf for template

  const createFrontIdCard = async (schoolName, fullName, examName, className, sectionName, schoolFolderName, selectedTemplate, principalSignature) => {
    const existingPdfBytes = await fetch(`${globalConstant.serverURL}/storage/${schoolFolderName}/${selectedTemplate}`).then((res) => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    //get font
    const MontserratMediumFile = await fetch(`${globalConstant.serverURL}/storage/Montserrat-Medium.otf`).then((res) => res.arrayBuffer());
    const MontserratBoldFile = await fetch(`${globalConstant.serverURL}/storage/Montserrat-Bold.ttf`).then((res) => res.arrayBuffer());

    // Embed our custom font in the document
    const MontserratMedium = await pdfDoc.embedFont(MontserratMediumFile);
    const MontserratBold = await pdfDoc.embedFont(MontserratBoldFile);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const centerXAxis = firstPage.getWidth() / 2 - 270;

    const positionCenterToText = (text, fontSize) => {
      const textWidth = MontserratMedium.widthOfTextAtSize(text, fontSize);
      return (firstPage.getWidth() - textWidth) / 2;
    };

    // Draw a string of text diagonally across the first page
    firstPage.drawText(schoolName.toUpperCase(), {
      y: 500,
      x: positionCenterToText(schoolName, 30),
      size: 30,
      font: MontserratBold,
      color: rgb(0, 0, 0.0),
    });
    firstPage.drawText(fullName, {
      y: 330,
      x: 190,
      size: 22,
      font: MontserratMedium,
      color: rgb(0, 0, 0.0),
    });
    firstPage.drawText(examName, {
      y: 265,
      x: 190,
      size: 22,
      font: MontserratMedium,
      color: rgb(0, 0, 0.0),
    });
    firstPage.drawText(className, {
      y: 205,
      x: 190,
      size: 22,
      font: MontserratMedium,
      color: rgb(0, 0, 0.0),
    });

    firstPage.drawText(sectionName, {
      y: 205,
      x: 555,
      size: 22,
      font: MontserratMedium,
      color: rgb(0, 0, 0.0),
    });
    firstPage.drawText("Class Teacher", {
      y: 21,
      x: 80,
      size: 22,
      font: MontserratMedium,
      color: rgb(0, 0, 0.0),
    });

    const setImageToPdfWithBorder = async (ImageUrl, xCoordinate, yCoordinate, width) => {
      const findImageType = (ImageUrl) => {
        const imageType = ImageUrl.split(".").pop();
        return imageType;
      };

      const ImageType = findImageType(ImageUrl);

      // Draw the image on the first page
      const imageBytes = await fetch(ImageUrl).then(async (res) => {
        const constantArrayBuffer = await res.arrayBuffer();
        console.log(constantArrayBuffer);
        return constantArrayBuffer;
      });

      let image;

      if ((ImageType === "jpg") | (ImageType === "jpeg") | (ImageType === "JPG") | (ImageType === "JPEG")) {
        image = await pdfDoc.embedJpg(imageBytes);
      }

      if (ImageType === "png") {
        image = await pdfDoc.embedPng(imageBytes);
      }
      // Calculate the aspect ratio of the image
      const aspectRatio = image.width / image.height;

      // Set the desired width of the image on the PDF page
      // const desiredWidth = 192;
      const desiredWidth = width;

      // Calculate the corresponding height to maintain the aspect ratio
      const desiredHeight = desiredWidth / aspectRatio;

      // Draw the image on the first page
      firstPage.drawImage(image, { x: xCoordinate, y: yCoordinate, width: desiredWidth, height: desiredHeight });
    };

    await setImageToPdfWithBorder(`${globalConstant.serverURL}/storage/${schoolFolderName}/${principalSignature}`, 90, 0, 150);

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    console.log("Done creating");
    // this was for creating uri and showing in iframe

    // *****************add second page starts here*****************

    var file = new File([pdfBytes], `admit-card.pdf`, {
      type: "application/pdf;charset=utf-8",
    });
    saveAs(file);
  };
  createFrontIdCard(schoolName, fullName, examName, className, sectionName, schoolFolderName, selectedTemplate, principalSignature);
};
