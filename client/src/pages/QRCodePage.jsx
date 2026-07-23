import QRCode from "react-qr-code";
import { useRef } from "react";
import { toPng } from "html-to-image";

function QRCodePage() {


  const restaurantId = localStorage.getItem("restaurantId");
    

  const menuUrl =
    `https://cosmic-speculoos-5be412.netlify.app/${restaurantId}` ;

    const qrRef = useRef();

    const downloadQR = () => {
        toPng(qrRef.current)
        .then((dataUrl) => {
            const link =
            document.createElement("a");
            link.download =
            "restaurant-qr.png";
            link.href = dataUrl;
            link.click();
        })
        .catch((err) => {
            console.log(err);
        });
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-6">
        Restaurant QR Code
      </h1>

      <div ref={qrRef}
      className="bg-white p-5 rounded-xl">
        <QRCode value={menuUrl}
        size={250} />
      </div>

      <button onClick={downloadQR}
      className="mt-6 bg-blue-600 text-white px-5 py-2 rounded">Download QR</button>

      <p className="mt-6 text-center">
        Scan this QR to view Menu
      </p>

    </div>
  );
}

export default QRCodePage;