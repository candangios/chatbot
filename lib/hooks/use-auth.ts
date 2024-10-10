// hooks/useAuth.ts
'use client'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  telegramId: string;
  username?: string;
  firstName?: string
  lastName?: string
  referralCount: number
  point: number
  rerrerer?: User
  referrals?: [User]
}

interface AuthResponse {
  access_token: string;
  user: User;
}
const BASE_URL = 'https://api.chatgm.com/api'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [access_token, setAccess_token] = useState<string | null>(null);


  // const router = useRouter();

  // Kiểm tra người dùng có access_token khi tải trang không
  useEffect(() => {
    const token = Cookies.get('access_token');
    console.log(access_token)
    if (token) {
      if (token != access_token) {
        setAccess_token(token)
        fetchUser(token);
      }

    }
  }, [access_token]);

  // Hàm đăng nhập
  const auth = async (initData: string, referrer?: string): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/auth/telegram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData, referrer }),
      });

      const responeJson = await res.json();
      const data: AuthResponse = responeJson.data

      // Lưu access_token vào cookies
      if (data.access_token) {
        Cookies.set('access_token', data.access_token, { expires: 1 });
        // setUser(data.user);
        // router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
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

  return { user, auth, logout };
};

export default useAuth;
