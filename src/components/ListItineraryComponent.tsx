import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useItinerary from "../hooks/useItinerary";
import { Button, Toolbar, Typography } from "@mui/material";
import IItinerary from "../utils/interfaces/IItinerary";
import LoaderComponent from "./LoaderComponent";

type ListItineraryComponentProps = {
  type: number;
  handleOpenUpdate: () => void;
  handleOpenDelete: () => void;
  handleSetItinerarySelected: (itinerary: IItinerary) => void;
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
      renderCell: (params: GridValueGetterParams) => {
        return (
          <a
            href={`https://www.google.com/maps/place/${params.value.lat},${params.value.lng}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="contained" color="primary" size="small">
              <Typography variant="inherit" noWrap component="div">
                Location
              </Typography>
            </Button>
          </a>
        );
      },
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
              props.handleSetItinerarySelected(params.row as IItinerary);
              props.handleOpenUpdate!();
            }}
          >
            <Typography variant="inherit" noWrap component="div">
              Update
            </Typography>
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              props.handleSetItinerarySelected(params.row as IItinerary);
              props.handleOpenDelete!();
            }}
          >
            <Typography variant="inherit" noWrap component="div">
              Delete
            </Typography>
          </Button>
        </Toolbar>
      ),
    },
  ];

  if (!itinerary) {
    return <LoaderComponent />;
  }

  if (itinerary.length === 0) {
    return (
      <Box>
        <Typography variant="h6" noWrap component="div">
          No itinerary
        </Typography>
      </Box>
    );
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
