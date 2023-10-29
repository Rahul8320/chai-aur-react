/* eslint-disable no-useless-catch */
import appwriteConfig from "../config/appwrite.config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(appwriteConfig.Url)
      .setProject(appwriteConfig.ProjectId);
    this.account = new Account(this.client);
  }

  // create new user account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call login method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(`AuthService :: createAccount :: ${error}`);
      return null;
    }
  }

  // login to user account
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log(`AuthService :: login :: ${error}`);
      return null;
    }
  }

  // get current login user account
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(`AuthService :: getCurrentUser :: ${error}`);
      return null;
    }
  }

  // logout user account
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(`AuthService :: logout :: ${error}`);
      return null;
    }
  }
}

const authService = new AuthService();

export default authService;
