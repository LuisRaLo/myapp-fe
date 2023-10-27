import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import IItinerary from "../utils/interfaces/IItinerary";
import { SyntheticEvent, useEffect, useState } from "react";
import MapPickerComponent from "./MapPickerComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useUpdateItinerary from "../hooks/useUpdateItinerary";
import { ItinenaryEnum } from "../utils/enums/ItinearyEnum";

type Props = {
  type: ItinenaryEnum;
  open: boolean;
  itinerarySelected: IItinerary;
  handleClose: () => void;
};

export default function ModalUpdateItinerary(props: Props) {
  const { open, itinerarySelected, handleClose, type } = props;

  const [expanded, setExpanded] = useState<string | false>(false);

  const { itineraryObjectForm, setItineraryObjectForm, updateData } =
    useUpdateItinerary();

  useEffect(() => {
    if (itinerarySelected === undefined) return;
    setExpanded("panel1");
    setItineraryObjectForm({
      name: itinerarySelected.name ?? "",
      description: itinerarySelected.description ?? "",
      location: {
        lat: parseInt(itinerarySelected.location.split(",")[0]) ?? 0,
        lng: parseInt(itinerarySelected.location.split(",")[1]) ?? 0,
      },
      pathImage: undefined
    });
  }, [itinerarySelected]);

  const handleChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  if (itinerarySelected === undefined || itinerarySelected === null) {
    return <div></div>;
  }

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

            <Box component="form" noValidate autoComplete="off">
              <FormControl sx={{ mt: 2 }} fullWidth>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Name
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        type="text"
                        size="small"
                        variant="standard"
                        defaultValue={itinerarySelected.name}
                        onChange={(e) =>
                          setItineraryObjectForm({
                            ...itineraryObjectForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Description
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        type="text"
                        size="small"
                        variant="standard"
                        defaultValue={itinerarySelected.description}
                        multiline
                        maxRows={6}
                        onChange={(e) =>
                          setItineraryObjectForm({
                            ...itineraryObjectForm,
                            description: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Location
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      In this section you can change the location.
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <MapPickerComponent />
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Image
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setItineraryObjectForm({
                            ...itineraryObjectForm,
                            pathImage: e.target.files![0],
                          });
                        }}
                      />
                    </Button>
                  </AccordionDetails>
                </Accordion>
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
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={(e) => updateData(e, itinerarySelected, type)}
              >
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
  bgcolor: "background.paper",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "85%",
  display: "block",
  boxShadow: 24,
  p: 4,

  overflow: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};
