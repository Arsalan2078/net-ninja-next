import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="text-center">
        <h2 className="text-3xl">There was a problem.</h2>
        <p>The page could not be found.</p>
        <p>
          Go back to the <Link href={`/`}>Dashboard</Link>
        </p>
      </main>
      <p></p>
    </>
  );
}
