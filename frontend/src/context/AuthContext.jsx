import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Map Firebase user to app user structure if needed, or just use it
                const userData = {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    role: 'User', // Default role, might need logic for Admin
                    photo: currentUser.photoURL,
                    uid: currentUser.uid
                };

                // Special check for Admin (hardcoded for now based on email, or check DB)
                if (currentUser.email === 'admin@demojk.com') {
                    userData.role = 'Start'; // Or 'admin'
                }

                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                // Keep local admin login if active? Or fully switch to Firebase?
                // For now, let's respect the manual admin login existing logic but also allow Firebase.
                // If manual admin is set, don't clear it on firebase null (unless we unify).
                // Let's unify: If not firebase user, check local storage for manually logged admin.
                const storedAdmin = localStorage.getItem('adminUser');
                if (storedAdmin) {
                    setUser(JSON.parse(storedAdmin));
                } else {
                    setUser(null);
                }
            }
            setLoading(false); // Set loading to false once auth check is done
        });
        return () => unsubscribe();
    }, []);

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Log Login Event
            try {
                await fetch(`${import.meta.env.VITE_API_URL}/api/logs`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'LOGIN_GOOGLE',
                        performer: user.email,
                        role: 'User',
                        details: 'User logged in via Google'
                    })
                });
            } catch (e) {
                console.error("Logging failed", e);
            }

            toast.success(`Welcome, ${user.displayName}!`);
            return user;
        } catch (error) {
            console.error("Google Sign In Error", error);
            const errorMessage = error.code ? error.code.replace('auth/', '').replace('-', ' ') : error.message;
            toast.error(`Login Failed: ${errorMessage}`);
            throw error;
        }
    };

    const login = async (email, password) => {
        // Mock Login Logic
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (email === 'admin@demojk.com' && password === 'admin123') {
                    const userData = { name: 'Admin', email: 'admin@demojk.com', role: 'admin' };
                    setUser(userData);
                    localStorage.setItem('adminUser', JSON.stringify(userData));
                    toast.success('Welcome back, Admin!');

                    // Log Login Event
                    try {
                        await fetch(`${import.meta.env.VITE_API_URL}/api/logs`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                action: 'LOGIN',
                                performer: email,
                                role: 'Admin',
                                details: 'Admin logged in successfully'
                            })
                        });
                    } catch (e) {
                        console.error("Logging failed", e);
                    }

                    resolve(userData);
                } else {
                    toast.error('Invalid email or password');
                    reject(new Error('Invalid email or password'));
                }
            }, 1000);
        });
    };

    const logout = async () => {
        try {
            await signOut(auth);
            if (user) {
                // Log Logout Event
                try {
                    await fetch(`${import.meta.env.VITE_API_URL}/api/logs`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            action: 'LOGOUT',
                            performer: user.email,
                            role: user.role || 'User',
                            details: 'User logged out'
                        })
                    });
                } catch (e) { console.error("Logging failed", e); }
            }
            setUser(null);
            localStorage.removeItem('adminUser');
            localStorage.removeItem('user');
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Error logging out');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, googleLogin, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
