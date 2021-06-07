package com.rmit.cloudcomputing.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;

import java.io.InputStream;

@Service
public class BucketService {

    @Autowired
    private AmazonS3 s3Client;

    private static String bucketName = "cookingsystem-recipe-images";

    public String isFileValid(MultipartFile file) {
        String fileType = file.getContentType();
        if(fileType != null) {
            if (fileType.equals("image/gif") || fileType.equals("image/jpeg")
                    || fileType.equals("image/png")) {
                String fileName = file.getOriginalFilename();
                return FilenameUtils.getExtension(fileName);
            }
        }
        return null;
    }

    public boolean isFileTooBig(MultipartFile file) {
        double size = file.getSize() * 0.001;
        return size >= 200;
    }

    public boolean uploadImage(MultipartFile file, String name) {
        boolean uploaded = true;
        try {
            InputStream input = file.getInputStream();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            PutObjectRequest uploadRequest = new PutObjectRequest(bucketName, name, input, metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead);
            s3Client.putObject(uploadRequest);
        } catch (Exception e) {
            uploaded = false;
        }
        return uploaded;
    }

    public String downloadImage(String keyName) {
        ObjectListing objects = s3Client.listObjects(bucketName);
        String objectName = "";
        for (S3ObjectSummary object : objects.getObjectSummaries()) {
            String key = object.getKey();
            String fileName = key.replaceFirst("[.][^.]+$", "");
            if(fileName.equals(keyName)) {
                objectName = key;
            }
        }
        return s3Client.getUrl(bucketName, objectName).toExternalForm();
    }
}