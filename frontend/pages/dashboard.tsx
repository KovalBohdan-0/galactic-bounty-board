import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/lib/api";
import BountyItem from "@/components/BountyItem";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

interface Bounty {
  id: number;
  title: string;
  status: string;
  planet: string;
  reward: number;
  createdBy: {
    id: number;
    email: string;
  };
  acceptedBy: {
    id: number;
    email: string;
  } | null;
}

export default function Dashboard() {
  const [postedBounties, setPostedBounties] = useState<Bounty[]>([]);
  const [acceptedBounties, setAcceptedBounties] = useState<Bounty[]>([]);
  const router = useRouter();
  useAuthRedirect();

  useEffect(() => {
    const user = localStorage.getItem("user_email");

    const fetchBounties = async () => {
      try {
        const res = await api.get("/bounties/me");
        setPostedBounties(
          res.data.filter((bounty: Bounty) => bounty.createdBy.email === user)
        );
        setAcceptedBounties(
          res.data.filter((bounty: Bounty) => bounty.acceptedBy?.email === user)
        );
      } catch (err) {
        console.error("Error fetching bounties:", err);
        router.push("/login");
      }
    };

      fetchBounties();
  }, [router]);

  const onBountyAccepted = (bountyId: number) => {
    const acceptedBounty = postedBounties.find((bounty) => bounty.id === bountyId);
    if (acceptedBounty) {
      acceptedBounty.status = "ACCEPTED"
      setAcceptedBounties((prev) => [...prev, acceptedBounty]);
    }
    setPostedBounties((prev) => prev.filter((bounty) => bounty.id !== bountyId));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Bounties</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📤 Posted</h2>
        {postedBounties.length === 0 ? (
          <p className="text-base text-gray-700">
            You haven&apos;t posted any bounties.
          </p>
        ) : (
          <ul className="space-y-4">
            {postedBounties.map((bounty) => (
              <BountyItem onBountyAccepted={onBountyAccepted} key={bounty.id} bounty={bounty} />
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">🛠 Accepted</h2>
        {acceptedBounties.length === 0 ? (
          <p className="text-base text-gray-700">
            You haven&apos;t accepted any bounties.
          </p>
        ) : (
          <ul className="space-y-4">
            {acceptedBounties.map((bounty) => (
              <BountyItem key={bounty.id} bounty={bounty} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
