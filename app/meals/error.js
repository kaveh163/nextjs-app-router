'use client';
// when loading data fails
// if our database is offline
// rendered by nextjs whenever an error occurs for the page that sits in the same folder or nested page or layout
// use client is used for capturing errors also in the client side;
// the classes are from globals.css
export default function Error() {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}