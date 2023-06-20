import { Box, Toolbar, Typography,Grid } from '@mui/material'
import { NavBar, SideBar } from '../../../../inventory/components';

const drawerWidth = 280;


export const ProductLayout = ({children, title = ''}) => {
  return (
        <Grid 
        container
        spacing={0}        
        alignItems="center"
        justifyContent="center"
        sx={{minHeight: '100vh', backgroundColor: 'white', padding:1}}
        >

        <NavBar drawerWidth={drawerWidth}/>
        <SideBar drawerWidth={drawerWidth}/>    

        <Grid item
                className="box-shadow"
        
                sx={{backgroundColor:'white',borderRadius:2,padding:3,width:{md:'100vh'}}}
                >
                <Typography variant="h5"
                        sx={{mb:1}}>
                {title}
                </Typography>
                {children}
        </Grid>
        </Grid>
  )
}

