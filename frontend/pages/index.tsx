import { useEffect, useState } from "react";
import api from "@/lib/api";
import BountyItem from "@/components/BountyItem";

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

export default function Home() {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const res = await api.get("/bounties");
        setBounties(res.data);
      } catch (err) {
        console.error("Error fetching bounties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Loading bounties...</p>
      </div>
    );
  }

  const onBountyAccepted = (bountyId: number) => {
    const acceptedBounty = bounties.find((bounty) => bounty.id === bountyId);
    if (acceptedBounty) {
      acceptedBounty.status = "ACCEPTED";
      setBounties((prev) => prev.filter((bounty) => bounty.id !== bountyId));
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Available Bounties</h1>
      {bounties.length === 0 ? (
        <p className="text-base text-gray-700">No bounties available at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {bounties.map((bounty) => (
            <BountyItem onBountyAccepted={onBountyAccepted} key={bounty.id} bounty={bounty} />
          ))}
        </ul>
      )}
    </div>
  );
}
