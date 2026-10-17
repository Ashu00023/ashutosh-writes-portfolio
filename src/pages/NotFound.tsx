import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const NotFound = () => (
  <main id="main" className="flex min-h-screen items-center justify-center bg-muted">
    <Helmet>
      <title>Page not found | Ashutosh Writes</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-4 text-xl text-muted-foreground">Page not found</p>
      <p className="text-sm text-muted-foreground">
        <Link to="/" className="text-primary underline hover:text-primary/90">Home</Link>
        {" · "}
        <Link to="/research" className="text-primary underline hover:text-primary/90">Research</Link>
        {" · "}
        <Link to="/services" className="text-primary underline hover:text-primary/90">Services</Link>
        {" · "}
        <Link to="/contact" className="text-primary underline hover:text-primary/90">Contact</Link>
      </p>
    </div>
  </main>
);
export default NotFound;
