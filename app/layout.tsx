"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { Store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import AuthContext from "@/utils/AuthContext";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={Store}>
          <AuthContext>
            <Navbar />
            {children}
          </AuthContext>
        </Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
