"use client";

import { useState } from "react";
import Card from "@/app/_components/Card";

interface UserInfo {
  name: string;
  email: string;
  state: string;
}

function getUserInfoFromStorage(): UserInfo | null {
  if (typeof window === "undefined") return null;
  const storedUserInfo = localStorage.getItem("user_info");
  return storedUserInfo ? JSON.parse(storedUserInfo) : null;
}

export default function ProfilePage() {
  const [userInfo] = useState<UserInfo | null>(getUserInfoFromStorage);

  if (!userInfo) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-center py-8 px-32 w-full h-full">
      <div className="w-1/2">
        <Card className="flex flex-col gap-8 px-4 py-6">
          <h1 className="text-lg font-space-grotesk font-bold text-neutral-100">
            {userInfo.name}
          </h1>
          <h1 className="text-md font-space-grotesk font-normal text-neutral-100">
            {userInfo.email}
          </h1>
          <h1 className="text-md font-space-grotesk font-bold text-primary">
            {userInfo.state}
          </h1>
        </Card>
      </div>
    </div>
  );
}
