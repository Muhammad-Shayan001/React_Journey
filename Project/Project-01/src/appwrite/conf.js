import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/init";
import config from "../config/config";

export class Service {
    
    constructor() {
        // Firebase is initialized in ../firebase/init.js
    }

    async createPost({ title, slug, content, status, userId }) {
        console.log("Firebase Service :: createPost :: payload", { title, slug, content, status, userId });
        if (!userId) {
            console.error("Firebase Service :: createPost :: userId is missing!");
            throw new Error("User ID is missing. Cannot create post.");
        }
        try {
            // Use "articles" collection
            const docRef = doc(db, "articles", slug);
            
            const data = {
                title,
                content,
                status,
                userId,
                authorId: userId,
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
            };

            await setDoc(docRef, data);
            
            return {
                ...data,
                $id: slug
            };

        } catch (error) {
            console.log("Firebase Service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, status }) {
        try {
            const docRef = doc(db, "articles", slug);
            const data = {
                title,
                content,
                status,
                $updatedAt: new Date().toISOString(),
            };
            
            await updateDoc(docRef, data);
            
            return {
                ...data,
                $id: slug
            };
        } catch (error) {
            console.log("Firebase Service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            const docRef = doc(db, "articles", slug);
            await deleteDoc(docRef);
            return true;
        } catch (error) {
            console.log("Firebase Service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const docRef = doc(db, "articles", slug);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                return {
                    ...docSnap.data(),
                    $id: docSnap.id
                };
            } else {
                return false;
            }
        } catch (error) {
            console.log("Firebase Service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = []) {
        try {
            const articlesRef = collection(db, "articles");
            const q = query(articlesRef);
            
            const querySnapshot = await getDocs(q);
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({
                    ...doc.data(),
                    $id: doc.id
                });
            });
            
            return { documents };
            
        } catch (error) {
            console.log("Firebase Service :: getPosts :: error", error);
            return false;
        }
    }
}

const service = new Service();
export default service;
