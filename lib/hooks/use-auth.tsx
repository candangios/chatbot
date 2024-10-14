
'use client'
import React, { createContext, useContext, useState, useEffect, use } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { set } from 'zod';
import { BASE_URL } from '@/config';

// Định nghĩa kiểu dữ liệu cho người dùng
export interface User {
  telegramId: string;
  username?: string;
  firstName?: string
  lastName?: string
  referralCount: number
  point: number
  rerrerer?: User
  referrals?: [User]
}

interface AuthContextProps {
  user: User | null;
  auth: (initData: string, referrer?: string) => Promise<void>;
  logout: () => void;
  access_token: string | null;
  isAuthenticated: boolean;
}

interface AuthResponse {
  access_token: string;
  user: User;
}


// Tạo context để quản lý trạng thái người dùng
const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;

}

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [access_token, setAccess_token] = useState<string | null>(null);
  const [isCheckedUser, setIsCheckedUser] = useState(false)


  useEffect(() => {
    // Check if the token exists
    const token = Cookies.get('access_token');
    if (token) {
      setAccess_token(token)
    }

  }, []);

  useEffect(() => {
    // console.log('cheking2')
    if (!user && access_token) {
      fetchUser(access_token);
    }
  }, [access_token]);

  // Hàm đăng nhập
  const auth = async (initData: string, referrer?: string): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/auth/telegram`, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ initData, referrer }),
      });

      const responeJson = await res.json();
      const data: AuthResponse = responeJson.data
      // Lưu access_token vào cookies
      if (data.access_token) {
        Cookies.set('access_token', data.access_token, { expires: 30 });
        setAccess_token(data.access_token)
        setUser(data.user);
        Cookies.set('telegramId', data.user.telegramId, { expires: 30 });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error
    }
  };


  // Hàm đăng xuất
  const logout = (): void => {
    Cookies.remove('access_token');
    setUser(null);
    // router.push('/');
  };

  // Lấy thông tin người dùng từ token
  const fetchUser = async (token: string): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/telegram/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUser(data.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    }
  };

  const isAuthenticated = !!user;


  return (
    <AuthContext.Provider value={{ user, auth, logout, access_token, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )

};

