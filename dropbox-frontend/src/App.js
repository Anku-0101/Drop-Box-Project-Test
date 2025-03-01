import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";

const App = () => {
  const [refreshFiles, setRefreshFiles] = useState(false);

  const handleUploadSuccess = () => {
    setRefreshFiles((prev) => !prev);
  };

  return (
    <div>
      <h1>DropBox Frontend</h1>
      <FileUpload onUploadSuccess={handleUploadSuccess} />
      <FileList key={refreshFiles} />
    </div>
  );
};

export default App;
