import { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import FormAuthor from "./FormAuthor";

const EditAuthor = (props) => {
  const { id, setAuthors, authors } = props;

  const [inputs, setInputs] = useState({
    name: "",
  });

  useEffect(() => {
    axios.get("/api/authors/" + id).then(({ data }) => {
      setInputs({
        name: data.author.name,
      });
    });
  }, []);

  const handleSubmitCallBack = (
    inputs,
    setAlert,
    setErrors,
    authors,
    setAuthors
  ) => {
    axios
      .put(`/api/authors/${id}`, inputs)
      .then((res) => {
        setAlert({
          open: true,
          status: "success",
          message: "Author was updated!",
        });
        setTimeout(() => {
          setAlert({
            status: "success",
            message: "Author was updated!",
            open: false,
          });
          navigate("/");
        }, 2000);
      })
      .catch(({ response }) => {
        let errors;

        if ("errors" in response.data.error) {
          errors = response.data.error.errors;
        } else {
          errors = {
            [response.data.error.path]: response.data.error,
          };
        }

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

  return (
    <FormAuthor
      handleSubmitCallBack={handleSubmitCallBack}
      setAuthors={setAuthors}
      authors={authors}
      initialInput={inputs}
    />
  );
};

export default EditAuthor;
