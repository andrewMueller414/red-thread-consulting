import { expect, test, vi } from "vitest";
import {
    listImageObjects,
    uploadImage,
} from "../../features/media/data/get_aws";
import path from "path";
import fs from "fs";

test("Saves image to AWS S3", async () => {
    const testImagePath = path.resolve(
        __dirname,
        "../../public/onboarding/wild_horses.jpg",
    );
    const response = fs.readFileSync(testImagePath);

    // 2. Convert the response to a Blob
    const mimeType = "image/jpg";
    const file = new File([response], "test_file", { type: mimeType });

    // expect(res, "Saves image without throwing an error.");
    await uploadImage("test_image_id", file);

    const responses = await listImageObjects();

    expect(
        responses.Contents?.some((n) => n.Key === "test_image_id"),
        "Responses include the newly saved image.",
    );
});
