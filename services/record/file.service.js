const File = require("../../model/files.repository.js");
const { supabase } = require("../../config/supabase.js");
const NotFoundError = require("../../errors/not-found.error.js");

class FileService {
  static async create({ files, recordId }) {
    if (!files || files.length === 0) {
      return;
    }

    const fileRows = [];

    for (const file of files) {
      const filename = `${Date.now()}-${file.originalname}`;
      const storagePath = `records/${recordId}/${filename}`;

      const { error } = await supabase.storage
        .from(process.env.BUCKET_NAME)
        .upload(storagePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        throw new Error(`Failed to upload file: ${error.message}`);
      }

      fileRows.push({
        record_id: recordId,
        filename,
        original_name: file.originalname,
        path: storagePath,
        mimetype: file.mimetype,
        size: file.size,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return File.create(fileRows);
  }

  static async removeMany({ deletedFiles }) {
    if (!deletedFiles || deletedFiles.length === 0) {
      return;
    }

    const removedFiles = await File.removeMany(deletedFiles);

    await this.deleteFromStorage(removedFiles);

    return removedFiles;
  }

  static async getByRecordId(recordId) {
    return File.getByRecordId(recordId);
  }

  static async getByCollection(collectionId) {
    return File.getByCollectionId(collectionId);
  }

  static async getByWorkspace(workspaceId) {
    return File.getByWorkspaceId(workspaceId);
  }

  static async deleteFromStorage(files) {
    if (!files || files.length === 0) {
      return;
    }

    const paths = files.map((file) => file.path);

    const { error } = await supabase.storage
      .from(process.env.BUCKET_NAME)
      .remove(paths);

    if (error) {
      console.error(`Failed to delete files: ${error.message}`);
    }
  }
  static async getDownloadUrl(path) {
    const { data, error } = await supabase.storage
      .from(process.env.BUCKET_NAME)
      .createSignedUrl(path, 60 * 5);

    if (error) {
      throw new Error(`Failed to create download URL: ${error.message}`);
    }

    return data.signedUrl;
  }
}

module.exports = FileService;
