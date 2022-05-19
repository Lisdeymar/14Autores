import { Alert, Button, Collapse, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { upperFirst } from "lodash";
import { Link } from "@reach/router";

const FormAuthor = ({
  authors,
  setAuthors,
  handleSubmitCallBack,
  initialInput,
}) => {
  const [inputs, setInputs] = useState(initialInput);

  useEffect(() => {
    setInputs(initialInput);
  }, [initialInput]);

  const [errors, setErrors] = useState({
    name: {
      message: "",
    },
  });

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    if (e.target.value.length < 3 && e.target.value !== "") {
      setErrors({
        ...errors,
        [e.target.name]: {
          message: `${upperFirst(e.target.name)} must be at least 3 characters`,
        },
      });
    } else {
      setErrors({
        ...errors,
        [e.target.name]: { message: "" },
      });
    }
  };

  const [alert, setAlert] = useState({
    messsage: "",
    open: false,
    status: "success",
  });

  const handleSubmit = (e, inputs) => {
    e.preventDefault();
    handleSubmitCallBack(inputs, setAlert, setErrors, authors, setAuthors);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => handleSubmit(e, inputs)}
    >
      <Collapse in={alert.open}>
        <Alert
          severity={alert.status}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert({ ...alert, open: false });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alert.message}
        </Alert>
      </Collapse>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        name="name"
        onChange={onChange}
        value={inputs.name}
        error={!!errors.name?.message}
        helperText={errors.name?.message}
      />
      <Button variant="contained" type="submit">
        Enviar
      </Button>
      <Link to="/">
        <Button variant="contained" color="error" fullWidth>
          Cancelar
        </Button>
      </Link>
    </form>
  );
};

export default FormAuthor;
