import { navigate } from "@reach/router";
import axios from "axios";
import FormAuthor from "./FormAuthor";

function NewAuthor({ setAuthors, authors }) {
  const handleSubmitCallBack = (
    inputs,
    setAlert,
    setErrors,
    authors,
    setAuthors
  ) => {
    axios
      .post("/api/authors/new", {
        data: inputs,
      })
      .then((res) => {
        setAlert({
          open: true,
          status: "success",
          message: "Author was added!",
        });
        setTimeout(() => {
          setAlert({
            status: "success",
            message: "Author was added!",
            open: false,
          });
          navigate("/");
        }, 2000);
        setAuthors([...authors, res.data.author]);
      })
      .catch((error) => {
        const {
          data: {
            error: { errors },
          },
        } = error.response;

        setErrors(errors);
        setAlert({
          open: true,
          status: "error",
          message: "An error occurred, try again",
        });
        setTimeout(() => {
          setAlert({
            status: "error",
            message: "An error occurred, try again",
            open: false,
          });
        }, 2000);
      });
  };

  const initialInput = { name: "" };

  return (
    <>
      <FormAuthor
        handleSubmitCallBack={handleSubmitCallBack}
        setAuthors={setAuthors}
        authors={authors}
        initialInput={initialInput}
      />
    </>
  );
}

export default NewAuthor;
