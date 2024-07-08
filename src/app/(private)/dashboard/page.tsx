"use client";
import { CustomButton } from "@/components/CustomButton";
import { useAuthContext } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuthContext();
  return (
    <div>
      <h1>Logged in as {user?.name}</h1>
      <h2>Email: {user?.email}</h2>
      <CustomButton onClick={logout}>Logout</CustomButton>
    </div>
  );
}
