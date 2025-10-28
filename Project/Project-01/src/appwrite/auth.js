import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase/init";

export class AuthService {
    async createAccount({ email, password, name }) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            if (name) {
                await updateProfile(user, {
                    displayName: name
                });
            }
            
            // Return the user object or login result to match previous behavior
            // The previous code called this.login() which returns a session. 
            // In Firebase, creating a user also signs them in.
            // We can return the user object directly.
            return user;

        } catch (error) {
            console.log("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.log("AuthService :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                if (user) {
                    // Map Firebase user to a structure similar to Appwrite if needed, 
                    // or just return the Firebase user object.
                    // Appwrite user has $id, name, email, etc.
                    // Firebase user has uid, displayName, email, etc.
                    // We might need to adapt this if the app relies on specific fields like $id.
                    // Let's add a $id property to mimic Appwrite for compatibility.
                    const userData = {
                        ...user,
                        $id: user.uid,
                        name: user.displayName
                    };
                    resolve(userData);
                } else {
                    resolve(null);
                }
            }, (error) => {
                console.log("AuthService :: getCurrentUser :: error", error);
                reject(error);
            });
        });
    }

    async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.log("AuthService :: logout :: error", error);
            throw error;
        }
    }
}

const authservice = new AuthService();

export default authservice;