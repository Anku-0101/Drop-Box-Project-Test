package com.example.demo.service;

import com.example.demo.entity.FileEntity;
import com.example.demo.repository.FileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FileService {
    @Value("${file.storage.location}")
    private String fileStorageLocation;

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }

    public Optional<FileEntity> getFileByName(String fileName) {
        return Optional.ofNullable(fileRepository.findByFileName(fileName));
    }

    public FileEntity saveFile(MultipartFile file) throws IOException {
        File directory = new File(fileStorageLocation);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = fileStorageLocation + File.separator + file.getOriginalFilename();
        Path destinationPath = Path.of(filePath);
        Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);

        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setFileSize(file.getSize());
        fileEntity.setUploadTime(LocalDateTime.now());

        return fileRepository.save(fileEntity);
    }
}
