import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Pages
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const InvestmentAdvisory = lazy(() => import("../pages/InvestmentAdvisory"));
const HolidayHomes = lazy(() => import("../pages/HolidayHomes"));
const InteriorDesign = lazy(() => import("../pages/InteriorDesign"));
const Properties = lazy(() => import("../pages/Properties"));
const Rooms = lazy(() => import("../pages/Rooms"));
const PropertyInner = lazy(() => import("../pages/PropertyInner"));
const Accomplishments = lazy(() => import("../pages/Accomplishments"));
const AccomplishmentsInner = lazy(() =>
  import("../pages/AccomplishmentsInner")
);
const ListYourProperty = lazy(() => import("../pages/ListYourProperty"));
const Blogs = lazy(() => import("../pages/Blogs"));
const BlogInner = lazy(() => import("../pages/BlogInner"));
const Media = lazy(() => import("../pages/Media"));
const MediaInner = lazy(() => import("../pages/MediaInner"));
const Faqs = lazy(() => import("../pages/Faqs"));
const Contact = lazy(() => import("../pages/Contact"));
const RefundPolicy = lazy(() => import("../pages/RefundPolicy"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("../pages/TermsConditions"));
const Bookings = lazy(() => import("../pages/Bookings"));
const Checkout = lazy(() => import("../pages/Checkout"));
const WishList = lazy(() => import("../pages/WishList"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Verification = lazy(() => import("../pages/Verification"));
const Accounts = lazy(() => import("../pages/account"));
const UserBookings = lazy(() => import("../pages/account/user-bookings"));
const BookingDetail = lazy(() => import("../pages/account/booking-detail"));
const ResetPassword = lazy(() => import("../pages/account/reset-password"));
const AccountDetails = lazy(() => import("../pages/account/account-details"));
const Error404 = lazy(() => import("../pages/Error404"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/investment-advisory" element={<InvestmentAdvisory />} />
      <Route path="/holiday-homes" element={<HolidayHomes />} />
      <Route path="/interior-design" element={<InteriorDesign />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:id" element={<Rooms />} />
      <Route path="/properties/:cat/:id" element={<PropertyInner />} />
      <Route path="/accomplishments/:id" element={<Accomplishments />} />
      <Route
        path="/accomplishments/:loca/:id"
        element={<AccomplishmentsInner />}
      />
      <Route path="/list-your-property" element={<ListYourProperty />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/:id" element={<BlogInner />} />
      <Route path="/media" element={<Media />} />
      <Route path="/media/:id" element={<MediaInner />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsConditions />} />

      <Route path="/bookings" element={<Bookings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verification" element={<Verification />} />

      {/* Protected routes */}
      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Accounts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/bookings"
        element={
          <ProtectedRoute>
            <UserBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/booking-details/:id"
        element={
          <ProtectedRoute>
            <BookingDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/account/reset-password"
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/account-details"
        element={
          <ProtectedRoute>
            <AccountDetails />
          </ProtectedRoute>
        }
      />
      {/* Fallback for 404 */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;
