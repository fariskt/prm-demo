"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div>
      <h1>Project Management System</h1>
    </div>
  );
}
