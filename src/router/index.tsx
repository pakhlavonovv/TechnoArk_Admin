import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { UserProvider } from '../modules/context';
import App from "../App";
import { SignIn, SignUp, Category, AdminLayout, SubCategory, Brand, BrandCategory, Product, Settings } from "@modules";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="admin-layout" element={<AdminLayout />} >
          <Route index element={<Category />} />
          <Route path="sub-category/:id" element={<SubCategory />} />
          <Route path="brand" element={<Brand />} />
          <Route path="brand-category" element={<BrandCategory />} />
          <Route path="product" element={<Product />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default Index;
