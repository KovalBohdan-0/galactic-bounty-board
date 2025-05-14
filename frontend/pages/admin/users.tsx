import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface User {
  id: number;
  email: string;
  role: string;
  acceptedBounties: {
    id: number;
    title: string;
    planet: string;
    reward: number;
  }[];
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user.role === "ADMIN") {
      axios
        .get("http://localhost:3000/admin/users", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((res) => setUsers(res.data))
        .catch((err) => console.error("Failed to fetch users", err));
    }
  }, [status, session]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (session?.user.role !== "ADMIN") {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin - All Users</h1>
      {users.map((user) => (
        <div key={user.id} style={{ marginBottom: "1rem" }}>
          <h3>
            {user.email} ({user.role})
          </h3>
          <p>Accepted Bounties:</p>
          <ul>
            {user.acceptedBounties.map((bounty) => (
              <li key={bounty.id}>
                {bounty.title} — {bounty.planet} (${bounty.reward})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
