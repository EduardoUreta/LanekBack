import AWS from 'aws-sdk';
import { v4 as uuidv4 } from "uuid";
import path from 'path';

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3();

export const uploadFileToS3 = (file, bucketName) => {
  const fileExtension = path.extname(file.originalname);
  const fileName = `${uuidv4()}${fileExtension}`;

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  return s3.upload(params).promise(); // devuelve una Promise
};
