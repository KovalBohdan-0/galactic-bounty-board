import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);
};
