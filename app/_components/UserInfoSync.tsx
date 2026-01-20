"use client";

import { useEffect } from "react";

const USER_INFO_KEY = "user_info";
const USER_INFO_COOKIE = "user_info";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export default function UserInfoSync() {
  useEffect(() => {
    const userInfoCookie = getCookie(USER_INFO_COOKIE);

    if (userInfoCookie) {
      try {
        const userInfo = decodeURIComponent(userInfoCookie);
        localStorage.setItem(USER_INFO_KEY, userInfo);
        deleteCookie(USER_INFO_COOKIE);
      } catch (error) {
        console.error("Failed to sync user info to localStorage:", error);
      }
    }
  }, []);

  return null;
}
