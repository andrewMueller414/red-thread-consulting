import {
    S3Client,
    ListObjectsCommand,
    ListObjectsOutput,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getActiveResourcesInfo } from "process";

export const getAws = () => {
    console.log("process.env.AWS_REGION: ", process.env.AWS_REGION);
    return new S3Client({
        region: process.env.AWS_REGION!,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });
};

export const listImageObjects = async (): Promise<ListObjectsOutput> => {
    const aws = getAws();
    const command = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
    });

    return await aws.send(command);
};

export const uploadImage = async (imageId: string, file: File) => {
    const aws = getAws();
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: imageId,
    });
    const signedUrl = await getSignedUrl(aws, command, {
        expiresIn: 60,
    });

    await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });
    return true;
};

export const deleteImage = async (imageId: string) => {
    const aws = getAws();
    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: imageId,
    });
    return await aws.send(command);
};
