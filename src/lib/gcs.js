import { Storage } from '@google-cloud/storage';

/**
 * Google Cloud Storage Integration
 * Demonstrates backend storage capabilities for user documents (e.g., voter ID scans).
 */

const storage = new Storage({
  projectId: 'civiq-app',
  // In production, credentials would be injected via environment
});

const BUCKET_NAME = 'civiq-secure-uploads';

/**
 * Uploads a document securely to Google Cloud Storage
 * @async
 * @param {string} filename - The name of the file to save
 * @param {Buffer|string} buffer - The file content
 * @returns {Promise<string>} The public URL or path of the uploaded file
 */
export async function uploadDocument(filename, buffer) {
  try {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(filename);
    
    await file.save(buffer, {
      metadata: {
        contentType: 'application/pdf',
      },
      resumable: false
    });
    
    return `gs://${BUCKET_NAME}/${filename}`;
  } catch (error) {
    console.error("GCS Upload failed:", error);
    throw error;
  }
}
