"use client";

import React, { createContext, useContext, useState } from "react";
import { deleteCookie } from "cookies-next";
import { User } from "@/interfaces/user";

interface AuthContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	updateUser: (updates: Partial<User>) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
	children: React.ReactNode;
	initialUser: User | null;
}> = ({ children, initialUser }) => {
	const [user, setUser] = useState<User | null>(initialUser);

	const updateUser = (updates: Partial<User>) => {
		setUser((prevUser) => (prevUser ? { ...prevUser, ...updates } : null));
	};

	const logout = () => {
		setUser(null);
		deleteCookie("authToken");
		window.location.href = "/sign-in";
	};

	return (
		<AuthContext.Provider value={{ user, setUser, updateUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
