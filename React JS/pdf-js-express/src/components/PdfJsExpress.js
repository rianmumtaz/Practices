import WebViewer from "@pdftron/pdfjs-express";
import { useRef, useEffect } from "react";

const PdfJsExpress = ({ file }) => {
  const viewer = useRef(null);

  useEffect(() => {
    if (file !== "") {
      WebViewer(
        {
          path: "../../pdfjs-lib/",
          disabledElements: ["viewControlsButton", "viewControlsOverlay"],
          initialDoc:
            "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
        },
        viewer.current
      ).then((instance) => {
        instance.UI.loadDocument(file);
        const { documentViewer } = instance.Core;
        documentViewer.addEventListener("documentLoaded", () => {
          // perform document operations
        });
      });
    }
  }, [file]);

  return (
    <div>
      <div ref={viewer} style={{ height: 700 }}></div>
    </div>
  );
};

export default PdfJsExpress;
