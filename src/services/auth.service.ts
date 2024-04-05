import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

class AuthenticationService {
  private app: FirebaseApp;
  private auth: Auth;
  private firebaseConfig = {
    apiKey: "AIzaSyB5iDLBcoJQjUVrYlKcmGtTxwF8ss46_ro",
    authDomain: "zalo-mini-app-75fbf.firebaseapp.com",
    projectId: "zalo-mini-app-75fbf",
    storageBucket: "zalo-mini-app-75fbf.appspot.com",
    messagingSenderId: "451324155515",
    appId: "1:451324155515:web:4a4e342cfda2189aeff4de",
  };
  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
  }
  async login(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      // Đăng nhập thành công
      return true;
    } catch (error) {
      console.error("Error logining user:", error);
      return false;
    }
  }

  async register(email: string, password: string): Promise<boolean> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      // Đăng ký thành công
      return true;
    } catch (error) {
      console.error("Error registering user:", error);
      return false;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      // Gửi email đặt lại mật khẩu thành công
    } catch (error) {
      throw error;
    }
  }

  onAuthStateChanged(callback: (user: any) => void): () => void {
    return onAuthStateChanged(this.auth, (user) => {
      callback(user); // Gọi callback function và truyền user vào
    });
  }

  // Hàm đăng xuất
  async signOut(): Promise<boolean> {
    try {
      await this.auth.signOut();
      console.log("Đăng xuất thành công");
      return true; // Trả về true khi đăng xuất thành công
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
      throw error;
    }
  }
}
export default AuthenticationService;
