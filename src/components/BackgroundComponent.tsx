import { Fragment } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SidebarComponent from "./SidebarComponent";

type BackgroundComponentProps = {
  children: JSX.Element | JSX.Element[];
  pageTitle?: string;
};

export default function BackgroundComponent(props: BackgroundComponentProps) {
  const drawerWidth = 240;

  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {props.pageTitle ? props.pageTitle : "Page Title"}
            </Typography>
          </Toolbar>
        </AppBar>

        <SidebarComponent drawerWidth={drawerWidth} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },

          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </Fragment>
  );
}
