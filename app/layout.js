
import '@styles/globals.css'
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';



export const metadata = {
  title: "Promptopia",
  description: "Generate AI prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
          <Suspense>
        <Provider>
        <div className="main">
          <div className="gradient"/>
        </div>
        <main className="app">

          <Toaster/>
          <Navbar/>
        {children}
        </main>
        </Provider>
          </Suspense>
      </body>
    </html>
  );
}
