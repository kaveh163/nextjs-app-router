export default function NotFound() {
    // if in the root folder it will catch all not found errors in app.
    // the classes are from globals.css
    return (
      <main className="not-found">
        <h1>Not found</h1>
        <p>Unfortunately, we could not find the requested page or resource.</p>
      </main>
    );
  }