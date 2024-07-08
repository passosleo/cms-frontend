"use client";

import { useAuthContext } from "@/context/AuthContext";
import { CustomLoading } from "../../components/CustomLoading";
import { redirect, usePathname } from "next/navigation";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <CustomLoading isLoading fullScreen />;
  }

  if (!isAuthenticated) {
    return redirect(`/login?redirectTo=${pathname}`);
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      {children}
    </div>
  );
}
