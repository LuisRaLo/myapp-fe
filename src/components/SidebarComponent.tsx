import { signOut } from "firebase/auth";
import { Fragment } from "react";
import { auth } from "../utils/configs/firebase";
import { useNavigate } from "react-router-dom";
import { ItinenaryEnum } from "../utils/enums/ItinearyEnum";
import { Typography } from "@mui/material";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import LocationIcon from "@mui/icons-material/LocationOn";
import CodeIcon from "@mui/icons-material/Code";
import EventIcon from "@mui/icons-material/Event";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BusinessIcon from "@mui/icons-material/Business";


type SidebarComponentProps = {
  drawerWidth: number;
};

export default function SidebarComponent(props: SidebarComponentProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <Fragment>
      <Drawer
        sx={{
          width: props.drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: props.drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <CodeIcon />
          <Typography variant="h6" noWrap component="div" ml={3} >
          jardin-trip
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/itinerary/1")}>
              <ListItemIcon>
                <LocationIcon />
              </ListItemIcon>
              <ListItemText primary={ItinenaryEnum.places} />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/itinerary/2")}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary={ItinenaryEnum.events} />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/itinerary/3")}>
              <ListItemIcon>
                <RestaurantIcon />
              </ListItemIcon>
              <ListItemText primary={ItinenaryEnum.restaurants} />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/itinerary/4")}>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary={ItinenaryEnum.enterprises} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItemButton>
        </List>
      </Drawer>
    </Fragment>
  );
}
