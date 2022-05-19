import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@reach/router";
import axios from "axios";

const Listauthors = ({ authors, removeFromDom }) => {
  const deleteAuthor = (authorId) => {
    axios.delete("/api/authors/" + authorId).then((res) => {
      removeFromDom(authorId);
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Link to={`/edit/${params.row._id}`}>
            <Button variant="contained">Edit</Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              deleteAuthor(params.row._id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        height: 400,
        width: "500px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <DataGrid
        rows={authors}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(elem) => elem._id}
        sx={{
          "& .MuiDataGrid-cell'": {
            textAlign: "center",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </div>
  );
};

export default Listauthors;
