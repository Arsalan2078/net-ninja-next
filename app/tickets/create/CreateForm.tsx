"use client";

import { TicketProps } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, SelectHTMLAttributes, useState } from "react";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket: TicketProps = {
      title,
      body,
      priority,
      user_email: email,
    };

    const response = await fetch(`http://localhost:4000/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });

    if (response.status === 201) {
      router.push("/tickets");
    }
  };

  function handleTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleBody(e: ChangeEvent<HTMLInputElement>) {
    setBody(e.target.value);
  }

  function handlePriority(e: ChangeEvent<HTMLSelectElement>) {
    setPriority(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input required type="text" onChange={handleTitle} value={title} />
      </label>

      <label>
        <span>Email:</span>
        <input required type="email" onChange={handleEmail} value={email} />
      </label>

      <label>
        <span>Body:</span>
        <input required type="text" onChange={handleBody} value={body} />
      </label>

      <label>
        <span>Priority:</span>
        <select required onChange={handlePriority} value={priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>

      <button className="btn-primary" disabled={isLoading}>
        {isLoading ? <span>Adding...</span> : <span>Add Ticket</span>}
      </button>
    </form>
  );
}
