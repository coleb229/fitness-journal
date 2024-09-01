import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import prisma from '@/lib/prisma'

export async function POST(request: Request, formData: FormData) {
  const { filename, contentType, id } = await request.json()

  try {
    const client = new S3Client({ region: process.env.AWS_REGION })
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: uuidv4(),
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })

    await prisma.image.create({
      data: {
        url: url + fields.key,
        filename: filename,
        contentType: contentType,
        progressEntryId: id
      }
    })

    return Response.json({ url, fields })
  } catch (error) {
    return Response.json({ error: (error as Error).message })
  }
}