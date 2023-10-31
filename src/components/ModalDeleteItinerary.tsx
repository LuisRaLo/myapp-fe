import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, Toolbar, Typography } from "@mui/material";
import IItinerary from "../utils/interfaces/IItinerary";
import useDeleteItinerary from "../hooks/useDeleteItinerary";
import { ItinenaryEnum } from "../utils/enums/ItinearyEnum";

type Props = {
  open: boolean;
  handleClose: () => void;
  itinerarySelected: IItinerary;
  type: ItinenaryEnum;
};

export default function ModalDeleteItinerary(props: Props) {
  const { open, handleClose, itinerarySelected, type } = props;

  const { deleteElement } = useDeleteItinerary();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => handleClose()}
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
              Are you secure to erase {itinerarySelected.name}?
            </Typography>
            <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => handleClose()}
              >
                <Typography variant="inherit" noWrap component="div">
                  Cancel
                </Typography>
              </Button>
              &nbsp;
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => deleteElement(type, itinerarySelected)}
              >
                <Typography variant="inherit" noWrap component="div">
                  Delete
                </Typography>
              </Button>
            </Toolbar>
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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
