import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useAuthStore } from "../../hooks";
import { Link as RouterLink } from "react-router-dom"

export const SideBar = ({drawerWidth = 240}) => {

  const { user } = useAuthStore();

    
  return (
    <Box component='nav'
    sx={{width:{sm: drawerWidth},flexShrink:{sm:0}}}>

        <Drawer variant="permanent"
                open
                sx={{
                    display:{ xs: 'block'},
                    '& .MuiDrawer-paper': { boxSizing: 'border-box',width: drawerWidth}
                }}
                >

                    <Toolbar>
                        <Typography variant="h6" noWrap component='div'>
                            {user.fullName}
                        </Typography>
                    </Toolbar>

                    <Divider />

                     <List>
                        {
                            ['product','company','inventory'].map( text => (


          
                                <Link color="inherit"
                                            to={`/${text}`}
                                            component={RouterLink}
                                            key={ text } >                             
                                    
                                <ListItem disablePadding>
                                    <ListItemButton >
                                        <ListItemIcon>
                                            <TurnedInNot />
                                        </ListItemIcon>
                                        <Grid container>
                                            <ListItemText primary={ text } />
                                        </Grid>
                                    </ListItemButton>
                                </ListItem>
                                </Link>
                            ))
                        }
                    </List>

        </Drawer>

    </Box>
  )
}