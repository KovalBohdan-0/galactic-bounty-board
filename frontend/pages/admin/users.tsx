import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  exp: number;
}

interface Bounty {
  id: number;
  title: string;
  planet: string;
  reward: number;
}

interface User {
  id: number;
  email: string;
  role: string;
  acceptedBounties: Bounty[];
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
      return;
    }
    setToken(storedToken);

    try {
      const decoded = jwtDecode<DecodedToken>(storedToken);
      setRole(decoded.role);
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (token && role === "admin") {
        try {
          const res = await api.get("/admin/users");
          setUsers(res.data);
        } catch (err) {
          console.error("Failed to fetch users", err);
        }
      }
    };

    fetchUsers();
  }, [token, role]);

  if (!token || role === null) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (role !== "admin") {
    return (
      <p className="text-center mt-10">Access denied. Admins only.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin - All Users</h1>
      {users.length === 0 ? (
        <p className="text-base text-gray-700">No users to display.</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="mb-6 p-4 shadow rounded bg-white">
            <h3 className="text-xl font-semibold">
              {user.email} <span className="text-gray-500">({user.role})</span>
            </h3>
            <p className="mt-2 font-medium">Accepted Bounties:</p>
            {user.acceptedBounties && user.acceptedBounties.length > 0 ? (
              <ul className="list-disc list-inside">
                {user.acceptedBounties.map((bounty) => (
                  <li key={bounty.id} className="text-gray-700">
                    {bounty.title} — {bounty.planet} ($
                    {bounty.reward})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No accepted bounties.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}