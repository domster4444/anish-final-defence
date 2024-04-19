import { Inter } from "next/font/google";
import "./styles/global.css";
import { Providers } from "./GlobalRedux/provider";
import NextNProgress from "nextjs-progressbar";
import AuthContext from "app/context/ChatAuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext>
      <div className={inter.className}>
        <NextNProgress color='#e84c3d' startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
        <Providers>{children}</Providers>
      </div>
    </AuthContext>
  );
}
