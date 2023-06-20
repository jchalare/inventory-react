import {
  Select,
  MenuItem,
  ListSubheader,
  InputLabel,
  OutlinedInput,
  Box,
  Chip,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { InventoryLayout } from "../layout/InventoryLayout";
import {
  useCompanyStore,
  useInventoryStore,
  useProductStore,
} from "../../../../hooks";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CreateInventoryPage = () => {
  const dispatch = useDispatch();
  const { getAllCompanies, companies } = useCompanyStore();
  const { getAllProducts, products } = useProductStore();
  const { postOneInventory } = useInventoryStore();

  const [productsSelected, setProducts] = useState([]);
  const [companyId, setCompanyId] = useState([]);
  const [amount, setAmount] = useState(0);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProducts(typeof value === "string" ? value.split(",") : value);
  };

  const handleAmountChange = (event) => {
    const {
      target: { value },
    } = event;
    setAmount(value);
  };

  const getSelectedProducsId = () => {
    let info = [];
    productsSelected.forEach((productSelected) => {
      products.find((product) => {
        if (product.name === productSelected) {
          info.push(product.id);
        }
      });
    });

    return info;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ productsSelected, companyId });
    const selectedProductsId = getSelectedProducsId();

    selectedProductsId.forEach((product) => {
      const data = {
        company: { id: companyId },
        product: { id: product },
        amount: amount,
      };
      postOneInventory(data);
    });
  };

  const handleCompanyChange = (event) => {
    const {
      target: { value },
    } = event;
    setCompanyId(value);
  };

  useEffect(() => {
    dispatch(getAllProducts);
    dispatch(getAllCompanies);
  }, []);

  return (
    <InventoryLayout title="Assign products to the company">
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12}>
            <InputLabel>Company</InputLabel>
            <Select onChange={handleCompanyChange} value={companyId}>
              <ListSubheader>Select a company</ListSubheader>
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Products</InputLabel>
          <Select
            labelId="selected-products"
            id="selected-products"
            multiple
            value={productsSelected}
            onChange={handleChange}
            input={<OutlinedInput id="selected-products" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {products.map((product) => (
              <MenuItem key={product.id} name={product.id} value={product.name}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid container>
          <Grid item xs={3} sx={{ mt: 2 }}>
            <TextField
              label="amount"
              type="number"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
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
    </InventoryLayout>
  );
};
