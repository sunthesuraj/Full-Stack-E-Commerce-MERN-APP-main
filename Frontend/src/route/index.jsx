import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/MainPages/Home.jsx";
import SearchPage from "../pages/MainPages/SearchPage.jsx";
import Login from "../pages/UserAuthenticationPages/Login.jsx";
import Register from "../pages/UserAuthenticationPages/Register.jsx";
import ForgotPassword from "../pages/UserAuthenticationPages/ForgotPassword.jsx";
import OtpVerification from "../pages/UserAuthenticationPages/OtpVerification.jsx";
import ResetPassword from "../pages/UserAuthenticationPages/ResetPassword.jsx";
import UserMenuMobile from "../pages/MainPages/UserMenuMobile.jsx";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/UserDashboard/Profile.jsx";
import MyOrders from "../pages/UserDashboard/MyOrders.jsx";
import Address from "../pages/UserDashboard/Address.jsx";
import CategoryPage from "../pages/AdminDashboard/CategoryPage.jsx";
import SubCategoryPage from "../pages/AdminDashboard/SubCategoryPage.jsx";
import UploadProduct from "../pages/SellerDashboard/UploadProduct.jsx";
import ProductAdmin from "../pages/AdminDashboard/ProductAdmin.jsx";
import AdminPermision from "../layouts/AdminPermision";
import ProductListPage from "../pages/QuickDeliveryProducts/ProductListPage.jsx";
import ProductDisplayPage from "../pages/MainPages/ProductDisplayPage.jsx";
import CartMobile from "../pages/MainPages/CartMobile.jsx";
import CheckoutPage from "../pages/MainPages/CheckoutPage.jsx";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import HomeBanner from "../pages/AdminDashboard/HomeBanner.jsx";
import SellerPermission from "../layouts/SellerPermission";
import Seller from "../pages/MainPages/Seller.jsx";
import SellerRegistration from "../pages/UserAuthenticationPages/SellerRegistration.jsx";
import ProductSeller from "../pages/SellerDashboard/ProductSeller.jsx";
import ProductListPageStandard from "../pages/StandardDeliveryProducts/ProductListPageStandard.jsx";
import SubcategoryWiseProductListStandard from "../pages/StandardDeliveryProducts/SubcategoryWiseProductListStandard.jsx";
import WishlistPage from "../pages/MainPages/WishlistPage.jsx";
import AllCategories from "../pages/MainPages/AllCategories.jsx";
import Partner from "../pages/MainPages/Partner.jsx";
import Deliver from "../pages/MainPages/Deliver.jsx";
import  Warehouse  from "../pages/MainPages/Deliver.jsx";
import TechTeam from "../pages/MainPages/TechTeam.jsx";
import AllOrders  from "../pages/AdminDashboard/AllOrders.jsx";
import SellerOrders from "../pages/SellerDashboard/SellerOrders.jsx";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
            {
                path : 'login',
                element : <Login/>
            },
            {
                path : 'wishlist',
                element : <WishlistPage/>
            },
            {
                path : "register",
                element : <Register/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "verification-otp",
                element : <OtpVerification/>
            },
            {
                path : "reset-password",
                element : <ResetPassword/>
            },
            {
                path : "user",
                element : <UserMenuMobile/>
            },
            {
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "myorders",
                        element : <MyOrders/>
                    },
                    {
                        path : "address",
                        element : <Address/>
                    },
                    {
                        path : 'home-banner',
                        element : <AdminPermision><HomeBanner/></AdminPermision>
                    },
                    {
                        path : 'category',
                        element : <AdminPermision><CategoryPage/></AdminPermision>
                    },
                    {
                        path : "subcategory",
                        element : <AdminPermision><SubCategoryPage/></AdminPermision>
                    },
                    {
                        path : 'upload-product',
                        element : <SellerPermission><UploadProduct/></SellerPermission>
                    },
                    {
                        path : 'product',
                        element : <AdminPermision><ProductAdmin/></AdminPermision>
                    },
                    {
                        path : 'all-orders',
                        element : <AdminPermision><AllOrders/></AdminPermision>
                    },
                    {
                        path : 'product-seller',
                        element : <SellerPermission><ProductSeller/></SellerPermission>
                    },
                    {
                        path : 'order-seller',
                        element : <SellerPermission><SellerOrders/></SellerPermission>
                    }
                ]
            },
            {
                path : "quick/:category",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "standard/:category",
                element : <ProductListPageStandard/>
            },
            {
                path : "standard/:category/:subcategory",
                element : <SubcategoryWiseProductListStandard/>
            },
            {
                path : "all-category",
                element : <AllCategories/>
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : 'cart',
                element : <CartMobile/>
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : 'cancel',
                element : <Cancel/>
            },
            {
                path : 'seller',
                element : <Seller/>,
            },
            {
                path : 'seller-registration',
                element : <SellerRegistration/>
            },
            {
                path : 'partner',
                element : <Partner/>
            },
            {
                path : 'deliver',
                element : <Deliver/>
            },
            {
                path : 'warehouse',
                element : <Warehouse/>
            },
            {
                path : 'tech-team',
                element : <TechTeam/>
            }
        ]
    }
])

export default router