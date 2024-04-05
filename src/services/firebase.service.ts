import { FirebaseApp, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { User } from "../interface/user";

class FirebaseService {
  private app: FirebaseApp;
  private firestore: Firestore;
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
    this.firestore = getFirestore(this.app);
  }

  /** Hàm thực hiện lấy dữ liệu từ tên collections
   *
   * @param collectionName
   * @returns
   */
  public async getCollection(collectionName: string): Promise<User[]> {
    try {
      const collectionRef = collection(this.firestore, collectionName);
      const dataFromFirebase = await getDocs(collectionRef);
      const items: any[] = dataFromFirebase.docs.map((doc: any) => {
        return { ...doc.data(), id: doc.id }; // Thêm id vào dữ liệu của mỗi document
      });
      return items;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  /** Hàm thực hiện thêm dữ liệu vào một collections bất kỳ
   *
   * @param collectionName
   * @param items
   */
  public async addCollection(
    collectionName: string,
    items: Partial<any>,
  ): Promise<void> {
    try {
      const collectionRef = collection(this.firestore, collectionName);
      await addDoc(collectionRef, items);
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  }

  /** Hàm thực hiện cập nhật dữ liệu với id bất kỳ
   *
   * @param collectionName
   * @param itemId
   * @param updatedItemData
   */
  public async updateCollection(
    collectionName: string,
    itemId: string,
    updatedItemData: Partial<any>,
  ): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, collectionName, itemId);
      await updateDoc(userDocRef, updatedItemData);
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  /** Hàm thực hiện xóa dữ liệu với id bất kỳ
   *
   * @param collectionName
   * @param itemId
   */
  public async deleteCollection(
    collectionName: string,
    itemId: string,
  ): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, collectionName, itemId);
      await deleteDoc(userDocRef);
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }
}
export default FirebaseService;
