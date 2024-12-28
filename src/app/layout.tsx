import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nook Trip",
  description: "Explore Your Perfect Day Nearby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="beforeInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TBDG5MTB');`}
      </Script>

      {/* Hotjar Tracking Code */}
      <Script id="hotjar" strategy="beforeInteractive">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:5064459,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>

      {/* Google Analytics */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-GLY6PVFCD8" strategy="beforeInteractive" />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GLY6PVFCD8');
        `}
      </Script>

      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TBDG5MTB"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>

        <div className="flex min-h-screen flex-col items-center">
          <div className="flex-1 max-w-4xl flex flex-col gap-6 bg-[#FFFFF0] rounded-lg lg:rounded-3xl mx-4 w-[calc(100%-32px)] my-5 px-5 py-5 sm:my-8 sm:px-8 ">
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster />
          </div>
          <Footer />
        </div>

        {/* Firebase */}
        <Script id="firebase-config" strategy="afterInteractive">
          {`
            import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
            import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

            const firebaseConfig = {
              apiKey: "AIzaSyD2IgasqceMBxTpXNXJjT8vy3Pt-y4Pe-s",
              authDomain: "nooktrip-520ec.firebaseapp.com",
              projectId: "nooktrip-520ec",
              storageBucket: "nooktrip-520ec.appspot.com",
              messagingSenderId: "354894944342",
              appId: "1:354894944342:web:1afedfefb1af09b2df03f7",
              measurementId: "G-7JWW4RE7Z5"
            };

            const app = initializeApp(firebaseConfig);
            const analytics = getAnalytics(app);
          `}
        </Script>
      </body>
    </html>
  );
}
