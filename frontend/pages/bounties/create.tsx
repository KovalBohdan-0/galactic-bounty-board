import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";
import api from "@/lib/api";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function CreateBounty() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", targetName: "", planet: "", reward: 0, status: "OPEN", imageUrl: "" });
  useAuthRedirect();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedForm = { ...form };
    submittedForm.reward = parseInt(submittedForm.reward.toString());
    await api.post("/bounties", submittedForm);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Bounty</h1>
      <div className="space-y-4">
        <form onSubmit={create} className="flex gap-4 flex-col">
          <input 
            name="title" 
            onChange={handleChange} 
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input 
            name="description" 
            onChange={handleChange} 
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input 
            name="targetName" 
            onChange={handleChange} 
            placeholder="Target Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input 
            name="planet" 
            onChange={handleChange} 
            placeholder="Planet"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input 
            name="reward" 
            type="number" 
            onChange={handleChange} 
            placeholder="Reward"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
           required
          />
          <input 
            name="imageUrl" 
            onChange={handleChange} 
            placeholder="Image URL (optional)"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <input 
            name="status" 
            hidden
            value="OPEN"
          />
          <button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition-colors"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}