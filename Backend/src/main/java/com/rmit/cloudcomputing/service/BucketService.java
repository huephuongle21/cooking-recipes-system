package com.rmit.cloudcomputing.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class BucketService {

    @Autowired
    private AmazonS3 s3Client;

    private static String bucketName = "cookingsystem-recipe-images";

    public boolean uploadImage(MultipartFile file, String id) {
        boolean uploaded = true;
        try {
            InputStream input = file.getInputStream();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/jpg");
            metadata.setContentLength(file.getSize());
            PutObjectRequest uploadRequest = new PutObjectRequest(bucketName, id, input, metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead);
            s3Client.putObject(uploadRequest);
        } catch (Exception e) {
            uploaded = false;
        }
        return uploaded;
    }

    public String downloadImage(String keyName) {
        return s3Client.getUrl(bucketName, keyName).toExternalForm();
    }
}