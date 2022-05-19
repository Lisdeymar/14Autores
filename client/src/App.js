import "./App.css";
import Main from "./components/Main";
import { Router } from "@reach/router";
import { useState } from "react";
import NewAuthor from "./components/NewAuthor";
import EditAuthor from "./components/EditAuthor";

function App() {
  const [authors, setAuthors] = useState([]);

  const removeFromDom = (authorId) => {
    setAuthors(authors.filter((author) => author._id !== authorId));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl mb-3">Favourite authors</div>
      <Router>
        <Main
          path="/"
          authors={authors}
          setAuthors={setAuthors}
          removeFromDom={removeFromDom}
        />
        <NewAuthor path="/new" setAuthors={setAuthors} authors={authors} />
        <EditAuthor path="edit/:id" setAuthors={setAuthors} authors={authors} />
      </Router>
    </div>
  );
}

export default App;
