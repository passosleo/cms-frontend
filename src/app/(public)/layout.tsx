"use client";
import { useAuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { CustomLoading } from "../../components/CustomLoading";
import { useRedirectTo } from "@/hooks/useRedirectTo";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const redirectTo = useRedirectTo();
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <CustomLoading isLoading fullScreen />;
  }

  if (isAuthenticated) {
    if (redirectTo) {
      return redirect(redirectTo);
    } else {
      return redirect("/dashboard");
    }
  }

  return (
    <div className="flex">
      <div className="flex w-[70%] items-center justify-center bg-black">
        <h1 className="text-white">CMS</h1>
      </div>
      <div className="w-[30%] border-l">
        <div className="px-[15%]">{children}</div>
      </div>
    </div>
  );
}
