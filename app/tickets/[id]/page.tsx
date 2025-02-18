import { TicketProps } from "@/app/lib/types";

interface ParamsProps {
  id: string;
}

interface PageProps {
  params: ParamsProps;
}

async function getTicket(id: string) {
  const response = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 0,
    },
  });
  return response.json();
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const ticket: TicketProps = await getTicket(id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
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
