import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_KEY_SECRET,
  secure: true
});

export async function uploadImage(filePath: any) {
  return await cloudinary.uploader.upload((filePath), {
    folder: 'sehoes'
  })
}

export async function deleteImage(publicId: any) {
  await cloudinary.uploader.destroy(publicId)
}