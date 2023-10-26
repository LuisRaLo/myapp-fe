import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useItinerary from "../hooks/useItinerary";
import { Button, Toolbar, Typography } from "@mui/material";

type ListItineraryComponentProps = {
  type: number;
};

export default function ListItineraryComponent(
  props: ListItineraryComponentProps
): JSX.Element {
  const { itinerary } = useItinerary(props.type);

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      editable: false,
    },
    {
      field: "location",
      headerName: "Location",
      type: "number",
      width: 100,
      editable: false,
    },
    {
      field: "pathImage",
      headerName: "Image",
      description: "Image of the place",
      sortable: false,
      width: 100,
      renderCell: (params: GridValueGetterParams) => {
        if (params.value.toString() === "") {
          return <Typography variant="body2">No image</Typography>;
        }

        return (
          <img
            src={params.value.toString()}
            alt="image"
            width="100px"
            height="100px"
          />
        );
      },
    },

    {
      field: "actions",
      headerName: "",
      description: "Actions to do",
      sortable: false,
      width: 200,
      renderCell: (params: GridValueGetterParams) => (
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => {
              console.log(params.row);
            }}
          >
            Edit
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              console.log(params.row);
            }}
          >
            Delete
          </Button>
        </Toolbar>
      ),
    },
  ];

  if (itinerary.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={itinerary}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
