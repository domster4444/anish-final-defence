//@ts-nocheck

import { globalConstant } from "constant/constant";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = ({ pdfLink }: { pdfLink: string }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
      <div style={{ height: "750px" }}>
        <Viewer
          // thumbnail open  by default
          fileUrl={
            // if pdf link then use `${globalConstant.serverURL}/storage/11/demo.pdf` link using ternary operator
            pdfLink ? `${globalConstant.serverURL}/storage${pdfLink}` : `${globalConstant.serverURL}/storage/PdfOpenInstruction.pdf`
          }
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
};

export default PdfViewer;
