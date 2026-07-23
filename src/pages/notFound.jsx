import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="project-page-not-found">
      <p>Page not found.</p>
      <Link to="/">Back home</Link>
    </div>
  );
}

export default NotFound;