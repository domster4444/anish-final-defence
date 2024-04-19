//@ts-nocheck

import { globalConstant } from "constant/constant";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ManualBook = ({ pdfLink }: { pdfLink: string }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <main className='rounded-lg overflow-hidden'>
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
        <div style={{ height: "600px" }}>
          <Viewer defaultScale={0.9} fileUrl={pdfLink ? `${globalConstant.serverURL}/storage${pdfLink}` : `${globalConstant.serverURL}/storage/PdfOpenInstruction.pdf`} plugins={[defaultLayoutPluginInstance]} />
        </div>
      </Worker>
    </main>
  );
};

export default ManualBook;
