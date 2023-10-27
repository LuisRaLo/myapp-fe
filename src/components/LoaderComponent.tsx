import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoaderComponent() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <CircularProgress />
    </Box>
  );
}
