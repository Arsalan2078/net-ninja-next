import Image from "next/image";
import Link from "next/link";
import logo from "@/public/dojo-logo.png";

export default function Navbar() {
  return (
    <nav>
      <Image
        src={logo}
        alt={`Dojo Helpdesk Logo`}
        width={72}
        quality={100}
        placeholder={`empty`}
      />

      <h1>Net Ninja Next Tutorial</h1>
      <Link href={`/`}>Dashboard</Link>
      <Link href={`/tickets`}>Tickets</Link>
    </nav>
  );
}
