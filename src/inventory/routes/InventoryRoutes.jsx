import { Routes, Route, Navigate } from "react-router-dom";
import { InventoryPages } from "../pages/InventoryPages";
import {
  CreateCompanyPage,
  ListCompanyPage,
  UpdateCompanyPage,
} from "../../ui/components/company/pages";
import {
  ListProductPage,
  CreateProductPage,
  UpdateProductPage,
} from "../../ui/components/product/pages";
import { CreateInventoryPage } from "../../ui/components/inventory/pages";

export const InventoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InventoryPages />} />

      <Route path="/company" element={<ListCompanyPage />} />
      <Route path="/company/create" element={<CreateCompanyPage />} />
      <Route path="/company/view/:companyId" element={<UpdateCompanyPage />} />

      <Route path="/product" element={<ListProductPage />} />
      <Route path="/product/create" element={<CreateProductPage />} />
      <Route path="/product/view/:productId" element={<UpdateProductPage />} />

      <Route path="/inventory" element={<CreateInventoryPage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
