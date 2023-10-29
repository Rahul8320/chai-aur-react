/* eslint-disable no-useless-catch */
import appwriteConfig from "../config/appwrite.config";
import { Client, Storage, ID } from "appwrite";

export class FileService {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(appwriteConfig.Url)
      .setProject(appwriteConfig.ProjectId);
    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        appwriteConfig.BucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(appwriteConfig.BucketId, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(appwriteConfig.BucketId, fileId);
  }
}

const fileService = new FileService();

export default fileService;
