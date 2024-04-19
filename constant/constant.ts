interface globalConstantInterface {
  readonly baseURL: string;
  readonly serverURL: string;
  readonly googleBookApiKey: string;
  readonly production: boolean;
}
export const globalConstant: globalConstantInterface = {
  //*for development
  // serverURL: "https://your-school-backend.onrender.com",
  // baseURL: "https://www.yourschoolsoftware.com",
  serverURL: "http://localhost:5000",
  baseURL: "http://localhost:3000",
  //* google api key for "bookApi" create from "https://developers.google.com/apis-explorer"
  googleBookApiKey: "AIzaSyABziryH7SBkRG74HBSWgL572CcidaFzy8",
  production: false,
};

export const toastConfig: any = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
