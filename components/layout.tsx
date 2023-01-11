import Header from "./Header";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "100"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${roboto.className} bg-111 min-h-screen overflow-x-clip`}>
      <Header />
      {children}
    </div>
  );
}
