import { useState } from "react";
import PdfJsExpress from "./components/PdfJsExpress";
import "./App.css";

function App() {
  const [file, setFile] = useState("");

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />
      <PdfJsExpress file={file} />
    </div>
  );
}

export default App;
