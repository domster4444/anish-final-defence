//@ts-nocheck

import { saveAs } from "file-saver";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { globalConstant } from "constant/constant";

export const IdCardGenerator = async (fullName, role, batch, standard, section, rollNo, dob, address, imageName, schoolFolderName, selectedIdCardFrontTemplate) => {
  //! https://www.pdf2go.com/jpg-to-pdf to convert your image to pdf for template

  // const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());

  const createFrontIdCard = async (fullName, role, batch, standard, section, rollNo, dob, address) => {
    const existingPdfBytes = await fetch(`${globalConstant.serverURL}/storage/${schoolFolderName}/${selectedIdCardFrontTemplate}`).then((res) => res.arrayBuffer());

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

    const centerXAxis = firstPage.getWidth() / 2 - 120;

    // Draw a string of text diagonally across the first page
    firstPage.drawText(fullName.toUpperCase(), {
      y: 305,
      x: centerXAxis,
      size: 32,
      font: MontserratBold,
      color: rgb(0.050980392156862744, 0.23137254901960785, 0.4),
    });
    firstPage.drawText(role.charAt(0).toUpperCase() + role.slice(1), {
      y: 275,
      x: 210,
      size: 23,
      font: MontserratMedium,
      color: rgb(0.050980392156862744, 0.23137254901960785, 0.4),
    });
    firstPage.drawText(batch, {
      y: 242,
      x: 195,
      size: 18,
      font: MontserratMedium,
      color: rgb(0.050980392156862744, 0.23137254901960785, 0.4),
    });
    firstPage.drawText(standard.charAt(0).toUpperCase() + standard.slice(1), {
      y: 208,
      x: 195,
      size: 18,
      font: MontserratMedium,
      color: rgb(0.050980392156862744, 0.23137254901960785, 0.4),
    });
    firstPage.drawText(section, {
      y: 174,
      x: 195,
      size: 18,
      font: MontserratMedium,
      color: rgb(0.050980392156862744, 0.23137254901960785, 0.4),
    });
    firstPage.drawText(rollNo, {
      y: 145,
      x: 195,
      size: 18,
      font: MontserratMedium,
      color: rgb(0.050980392156862744, 0.23137254901960785, 0.4),
    });

    // Date of Birth
    firstPage.drawText(dob, {
      y: 110,
      x: 195,
      size: 18,
      font: MontserratMedium,
      color: rgb(0.050980392156862744, 0.23137254901960785, 0.4),
    });

    // Address
    firstPage.drawText(address, {
      y: 76,
      x: 195,
      size: 18,
      font: MontserratMedium,
      color: rgb(0.050980392156862744, 0.23137254901960785, 0.4),
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
      firstPage.drawImage(image, { x: 170, y: 345, width: desiredWidth, height: desiredHeight });

      // Add a border around the image
      const borderWidth = 4; // Set the desired width for the border

      firstPage.drawRectangle({
        x: xCoordinate - borderWidth, // Adjust the x-coordinate to include the border
        y: yCoordinate - borderWidth, // Adjust the y-coordinate to include the border
        width: desiredWidth + 2 * borderWidth,
        height: desiredHeight + 2 * borderWidth,
        borderColor: rgb(0.050980392156862744, 0.23137254901960785, 0.4), // Set the color of the border (black in this case)
        borderWidth: borderWidth, // Set the width of the border
        opacity: 1, // Set the opacity of the border (1 means fully opaque)
      });
    };

    await setImageToPdfWithBorder(`${globalConstant.serverURL}/storage/${schoolFolderName}/${imageName}`, 170, 345, 160);

    async function setImageToPDFWithoutBorder(pdfDoc, firstPage, imageUrlII, xCoordinate, yCoordinate, desiredWidthII) {
      const imageBytes = await fetch(imageUrlII).then(async (res) => {
        const constantArrayBuffer = await res.arrayBuffer();
        return constantArrayBuffer;
      });

      // Assuming the image type based on the file extension, you may need to modify this logic
      const imageTypeII = imageUrlII.toLowerCase().endsWith(".png") ? "png" : "jpg";

      let imageII;

      if (imageTypeII === "png") {
        imageII = await pdfDoc.embedPng(imageBytes);
      } else if ((imageTypeII === "jpg") | (imageTypeII === "jpeg") | (imageTypeII === "JPG") | (imageTypeII === "JPEG")) {
        imageII = await pdfDoc.embedJpg(imageBytes);
      }

      const aspectRatioII = imageII.width / imageII.height;
      const desiredHeightII = desiredWidthII / aspectRatioII;

      firstPage.drawImage(imageII, { x: xCoordinate, y: yCoordinate, width: desiredWidthII, height: desiredHeightII });
    }

    await setImageToPDFWithoutBorder(pdfDoc, firstPage, `${globalConstant.serverURL}/storage/schoolLogo.png`, 63, 570, 125);
    // await setImageToPDFWithoutBorder(pdfDoc, firstPage, `${globalConstant.serverURL}/storage/barcode.JPG`, 45, 60, 170);

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    console.log("Done creating");

    // this was for creating uri and showing in iframe

    // *****************add second page starts here*****************

    var file = new File([pdfBytes], `${fullName}-${batch}-${rollNo}.pdf`, {
      type: "application/pdf;charset=utf-8",
    });
    saveAs(file);
  };
  createFrontIdCard(fullName, role, batch, standard, section, rollNo, dob, address);
};
