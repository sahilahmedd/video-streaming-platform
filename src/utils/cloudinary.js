import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";


// Cloudinay config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});


// File upload config
const uploadOnCoudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null

            // upload the file on cloudinary
            const res = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            // File has been uploaded successfully
            
            // console.log("File is uploaded on cloudinary", res.url);
            fs.unlinkSync(localFilePath)
            return res;
            
        } catch (error) {
            fs.unlinkSync(localFilePath) // Remove the locally stored temporary file as the upload operation got failed
            return null;
        }
}


export { uploadOnCoudinary }