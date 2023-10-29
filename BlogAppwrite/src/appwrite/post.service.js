/* eslint-disable no-useless-catch */
import appwriteConfig from "../config/appwrite.config";
import { Client, Databases, Query } from "appwrite";

export class PostService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(appwriteConfig.Url)
      .setProject(appwriteConfig.ProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        appwriteConfig.DatabaseId,
        appwriteConfig.CollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(`PostService :: createPost :: ${error}`);
      return null;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        appwriteConfig.DatabaseId,
        appwriteConfig.CollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log(`PostService :: updatePost :: ${error}`);
      return null;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        appwriteConfig.DatabaseId,
        appwriteConfig.CollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(`PostService :: deletePost :: ${error}`);
      return false;
    }
  }

  async getPostById(slug) {
    try {
      return await this.databases.getDocument(
        appwriteConfig.DatabaseId,
        appwriteConfig.CollectionId,
        slug
      );
    } catch (error) {
      console.log(`PostService :: getPostById :: ${error}`);
      return null;
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        appwriteConfig.DatabaseId,
        appwriteConfig.CollectionId,
        queries
      );
    } catch (error) {
      console.log(`PostService :: getAllPosts :: ${error}`);
      return null;
    }
  }
}

const postService = new PostService();

export default postService;
