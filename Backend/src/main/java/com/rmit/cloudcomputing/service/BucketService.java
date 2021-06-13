package com.rmit.cloudcomputing.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
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

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    public boolean uploadImage(MultipartFile multipartFile, String name) {
        boolean uploaded = true;
        try {
            File file = convertMultiPartToFile(multipartFile);
            s3Client.putObject(new PutObjectRequest(bucketName, name, file)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            file.delete();
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