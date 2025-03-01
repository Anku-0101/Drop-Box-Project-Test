import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { getAllFiles, downloadFile } from "../api/FileService";

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const data = await getAllFiles();
            setFiles(data);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleDownload = async (fileName) => {
        try {
            const response = await downloadFile(fileName);
            const blob = new Blob([response.data]);
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell>Size(KB)</TableCell>
                        <TableCell>Upload Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.map((file) => (
                        <TableRow key={file.id}>
                            <TableCell>{file.fileName}</TableCell>
                            <TableCell>{file.fileSize/1024}</TableCell>
                            <TableCell>{new Date(file.uploadTime).toLocaleString()}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => handleDownload(file.fileName)}>
                                    Download
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FileList;
