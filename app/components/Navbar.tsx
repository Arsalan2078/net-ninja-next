import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <h1>Net Ninja Next Tutorial</h1>
      <Link href={`/`}>Dashboard</Link>
      <Link href={`/tickets`}>Tickets</Link>
    </nav>
  );
}
