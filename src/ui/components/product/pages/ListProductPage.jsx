import { Link,Button, Paper, Table, TableCell, TableHead, TableRow, TableBody,TableContainer} from '@mui/material';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewIcon from '@mui/icons-material/RateReview';
import {  Link as RouterLink, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


import { useProductStore } from '../../../../hooks';
import { ProductLayout } from '../layout/ProductLayout';



 
export const ListProductPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAllProducts,products,deleteOneProduct,status } = useProductStore();
  
  const onDeleteProduct = (productId) => {
     deleteOneProduct(productId);
  } 

   useEffect(() => {
      dispatch(getAllProducts);

       if(status === 'deleted'){
         Swal.fire('Product was deleted','','success');
      }
  }, [status]); 
 

  return (
    <ProductLayout title="Products">
           <IconButton
        onClick={ () =>{ navigate('/product/create/') } }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'primary.main',
          ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { products.map((product) => (
                <TableRow key={product.id}  >
                  <TableCell  component="th" scope="row">{product.name}</TableCell>

                  <TableCell> 
                      <Link color="inherit"
                                    to={`/product/view/${product.id}`}
                                    component={RouterLink}>
                              <Button >
                                <RateReviewIcon  sx={{
                                      color: 'success.main',
                                      backgroundColor: 'white'}}/>                              
                             </Button>
                        </Link>
                     
                  </TableCell>

                  <TableCell>
                    
                    <Button onClick={()=>onDeleteProduct(product.id)}>
                             <DeleteIcon sx={{
                                              color: 'error.main',
                                              backgroundColor: 'white'}}/>                              
                        </Button>
                    
                 </TableCell>
                </TableRow>     
                  )) }                    
            </TableBody>
        </Table>
        
      </TableContainer>
      
  
      </ProductLayout>
 
  )
}

