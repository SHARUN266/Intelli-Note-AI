import Script from "next/script";
import React from "react";

function AdSense({ pId }) {
    // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8880385119289443"
    //  crossorigin="anonymous"></script>
  return (
   
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    
  );
}

export default AdSense;
