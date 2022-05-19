import { Link } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";
import ListAuthors from "./ListAuthors";

function Main({ authors, setAuthors, removeFromDom }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("/api/authors/").then(({ data }) => {
      setAuthors(data.authors);
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Link to={`/new`}>
          <span className="text-blue-600 underline">Add an author</span>{" "}
        </Link>
        <span>We have quotes by:</span>
      </div>
      {loaded && (
        <ListAuthors authors={authors} removeFromDom={removeFromDom} />
      )}
    </>
  );
}

export default Main;
