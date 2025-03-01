import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { uploadFile } from "../api/FileService";

const FileUpload = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        try {
            await uploadFile(selectedFile);
            setSelectedFile(null);
            onUploadSuccess(); // Refresh the file list
        } catch (error) {
            console.error("File upload failed:", error);
        }
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <TextField type="file" onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    );
};

export default FileUpload;
