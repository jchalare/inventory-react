import { Grid, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { ProductLayout } from "../layout/ProductLayout";
import { useProductStore } from "../../../../hooks";

export const UpdateProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { pathOneProduct, products, getOneProduct, errorMessage, status } =
    useProductStore();

  const mappingProductData = () => {
   return products.map((product) => {
      if (product.id === productId) {
        return {...product};
      }
    });
  };

  const [name, setName] = useState(mappingProductData().name);
  const [amount, setAmount] = useState(mappingProductData().amount);
  const [price, setPrice] = useState(mappingProductData().price);
  const [description, setDesc] = useState(mappingProductData().description);

  const onChangeInputsValues = (event) => {
    event.preventDefault();
    const inputChanged = event.target.name;

    switch (inputChanged) {
      case "name":
        setName(event.target.value);
        break;
      case "amount":
        setAmount(event.target.value);
        break;
      case "price":
        setPrice(event.target.value);
        break;
      case "description":
        setDesc(event.target.value);
        break;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    pathOneProduct({ productId, name, amount, price, description });
  };

  useEffect(() => {
    getOneProduct(productId);
    if (errorMessage !== null) {
      Swal.fire("Authentication error ", errorMessage, "error");
    }

    if (status === "updated") {
      Swal.fire("Product updated", "", "success");
    }
  }, [errorMessage, status]);

  return (
    <ProductLayout title="Product information">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={onChangeInputsValues}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Amount"
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={onChangeInputsValues}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Price"
              type="number"
              name="price"
              value={price}
              onChange={onChangeInputsValues}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Description"
              type="text"
              name="description"
              value={description}
              multiline
              rows={3}
              onChange={onChangeInputsValues}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </ProductLayout>
  );
};
