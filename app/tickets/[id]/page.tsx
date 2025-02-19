import { TicketProps } from "@/app/lib/types";
import Loading from "@/app/loading";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch(`http://localhost:4000/tickets`);

  const tickets: TicketProps[] = await response.json();

  return tickets.map((ticket) => ({ id: ticket.id }));
}

interface ParamsProps {
  id: string;
}

interface PageProps {
  params: ParamsProps;
}

async function getTicket(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const ticket: TicketProps = await getTicket(id);

  return (
    <main>
      <nav>
        <div>
          <h2>Ticket Details</h2>
          <p>
            <small>More information bout the Ticket</small>
          </p>
        </div>
      </nav>

        <div className="card">
          <h3>{ticket.title}</h3>
          <small>Created by {ticket.user_email}</small>
          <p>{ticket.body}</p>
          <div className={`pill ${ticket.priority}`}>
            {ticket.priority} priority
          </div>
        </div>
    </main>
  );
}
