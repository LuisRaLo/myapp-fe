import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import IItinerary from "../utils/interfaces/IItinerary";
import LoaderComponent from "./LoaderComponent";

type Props = {
  open: boolean;
  handleClose: () => void;
  itinerarySelected: IItinerary;
};

export default function ModalUpdateItinerary(props: Props) {
  const { open, handleClose } = props;

  if (!props.itinerarySelected) {
    return <LoaderComponent />;
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Update {JSON.stringify(props.itinerarySelected.name)} Itinerary
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              variant="body2"
              component="div"
            >
              Please, fill the form to update the itinerary.
            </Typography>

            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  id="itineraryName"
                  label="Name"
                  variant="standard"
                  defaultValue={props.itinerarySelected.name}
                />
              </FormControl>

              <FormControl sx={{ mt: 2 }} fullWidth>
                <TextField
                  size="small"
                  id="itineraryDescription"
                  label="Description"
                  variant="standard"
                  multiline
                  maxRows={4}
                  defaultValue={props.itinerarySelected.description}
                />
              </FormControl>
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "25ch",
                  alignItems: "center",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl sx={{ mt: 2 }} fullWidth>
                <TextField
                  size="small"
                  id="itineraryLocation"
                  label="Location"
                  variant="standard"
                  defaultValue={props.itinerarySelected.location}
                />
              </FormControl>

              <FormControl sx={{ mt: 2 }} fullWidth>
                <TextField
                  size="small"
                  id="itineraryPathImage"
                  label="Path Image"
                  variant="standard"
                  defaultValue={props.itinerarySelected.pathImage}
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleClose}
              >
                <Typography variant="inherit" noWrap component="div">
                  Cancel
                </Typography>
              </Button>
              &nbsp;
              <Button variant="contained" color="success" size="small">
                <Typography variant="inherit" noWrap component="div">
                  Update
                </Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
