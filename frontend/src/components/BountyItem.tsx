import React from "react";
import api from "@/lib/api";

interface Bounty {
  id: number;
  title: string;
  status: string;
  planet: string;
  reward: number;
  createdBy?: {
    id: number;
    email: string;
  };
  acceptedBy?: {
    id: number;
    email: string;
  } | null;
}

interface BountyItemProps {
  bounty: Bounty;
  onBountyAccepted?: (bountyId: number) => void;
}

const BountyItem: React.FC<BountyItemProps> = ({ bounty, onBountyAccepted }) => {
  const handleAcceptBounty = async () => {
    try {
      await api.post(`/bounties/${bounty.id}/accept`);
      alert("Bounty accepted successfully!");
      if (onBountyAccepted) {
        onBountyAccepted(bounty.id);
      }
    } catch (err) {
      console.error("Error accepting bounty:", err);
      alert("Failed to accept bounty.");
    }
  };

  return (
    <li className="shadow p-4 rounded border border-gray-200 bg-white">
      <div className="flex justify-between items-center">
        <span className="font-medium text-lg">{bounty.title}</span>
        <span
          className={`text-sm px-2 py-1 rounded ${
            bounty.status === "OPEN"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {bounty.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">
        Planet: <strong>{bounty.planet}</strong> · Reward:{" "}
        <strong>{bounty.reward}₡</strong>
      </p>
      {bounty.status === "OPEN" && (
        <div className="flex justify-end">
          <button
            onClick={handleAcceptBounty}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          >
            Accept Bounty
          </button>
        </div>
      )}
    </li>
  );
};

export default BountyItem;