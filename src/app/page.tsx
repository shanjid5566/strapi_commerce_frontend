"use client";

import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import CustomerLayout from "@/components/layout/CustomerLayout";
import AdminLayout from "@/components/layout/AdminLayout";

import HomePage from "@/components/pages/HomePage";
import CatalogPage from "@/components/pages/CatalogPage";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import CartPage from "@/components/pages/CartPage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import AboutPage from "@/components/pages/AboutPage";
import ContactPage from "@/components/pages/ContactPage";
import FAQPage from "@/components/pages/FAQPage";
import ShippingPage from "@/components/pages/ShippingPage";
import ReturnsPage from "@/components/pages/ReturnsPage";
import CareersPage from "@/components/pages/CareersPage";
import BlogPage from "@/components/pages/BlogPage";
import BlogDetailPage from "@/components/pages/BlogDetailPage";
import PrivacyPage from "@/components/pages/PrivacyPage";
import TermsPage from "@/components/pages/TermsPage";
import CookiesPage from "@/components/pages/CookiesPage";
import UserDashboard from "@/components/pages/UserDashboard";
import AdminDashboardPage from "@/components/pages/AdminDashboardPage";
import AdminProductsPage from "@/components/pages/AdminProductsPage";
import AdminOrdersPage from "@/components/pages/AdminOrdersPage";
import AdminBrandsPage from "@/components/pages/AdminBrandsPage";
import AdminCustomersPage from "@/components/pages/AdminCustomersPage";
import AdminCouponsPage from "@/components/pages/AdminCouponsPage";
import AdminBlogsPage from "@/components/pages/AdminBlogsPage";
import AdminPagesEditor from "@/components/pages/AdminPagesEditor";
import AdminStaffPage from "@/components/pages/AdminStaffPage";
import AdminSettingsPage from "@/components/pages/AdminSettingsPage";
import AdminProfilePage from "@/components/pages/AdminProfilePage";

export default function RootPage() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<number | null>(null);
  const [selectedAdminPage, setSelectedAdminPage] = useState("about");

  const navigate = useCallback((page: string, id?: number) => {
    if (page === "product" && id !== undefined) {
      setSelectedProductId(id);
      setCurrentPage("product");
    } else if (page === "blog-detail" && id !== undefined) {
      setSelectedBlogPostId(id);
      setCurrentPage("blog-detail");
    } else if (page.startsWith("admin-page-")) {
      setSelectedAdminPage(page.replace("admin-page-", ""));
      setCurrentPage(page);
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (user && user.role !== "customer") {
      if (user.role === "super_admin") setCurrentPage("admin-dashboard");
      else if (user.role === "product_manager") setCurrentPage("admin-products");
      else if (user.role === "order_manager") setCurrentPage("admin-orders");
      else if (user.role === "content_editor") setCurrentPage("admin-page-about");
      else if (user.role === "blog_manager") setCurrentPage("admin-blogs");
    } else if (user && user.role === "customer") {
      setCurrentPage("dashboard");
    } else if (!user) {
      setCurrentPage("home");
    }
  }, [user]);

  const isAdmin = currentPage.startsWith("admin");

  const renderPage = () => {
    if (currentPage.startsWith("admin-page-")) {
      return <AdminPagesEditor page={selectedAdminPage} onNavigate={navigate} />;
    }

    switch (currentPage) {
      case "home": return <HomePage onNavigate={navigate} />;
      case "catalog": return <CatalogPage onNavigate={navigate} />;
      case "product": return <ProductDetailPage productId={selectedProductId} onNavigate={navigate} />;
      case "cart": return <CartPage onNavigate={navigate} />;
      case "checkout": return <CheckoutPage onNavigate={navigate} />;
      case "dashboard": return user ? <UserDashboard onNavigate={navigate} /> : <HomePage onNavigate={navigate} />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      case "faq": return <FAQPage />;
      case "shipping": return <ShippingPage />;
      case "returns": return <ReturnsPage />;
      case "careers": return <CareersPage />;
      case "privacy": return <PrivacyPage />;
      case "terms": return <TermsPage />;
      case "cookies": return <CookiesPage />;
      case "blog": return <BlogPage onNavigate={navigate} />;
      case "blog-detail": return <BlogDetailPage postId={selectedBlogPostId} onNavigate={navigate} />;
      case "admin-dashboard": return <AdminDashboardPage />;
      case "admin-products": return <AdminProductsPage />;
      case "admin-orders": return <AdminOrdersPage />;
      case "admin-brands": return <AdminBrandsPage />;
      case "admin-customers": return <AdminCustomersPage />;
      case "admin-coupons": return <AdminCouponsPage />;
      case "admin-blogs": return <AdminBlogsPage />;
      case "admin-staff": return <AdminStaffPage />;
      case "admin-settings": return <AdminSettingsPage />;
      case "admin-profile": return <AdminProfilePage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased">
      {isAdmin ? (
        <AdminLayout currentPage={currentPage} onNavigate={navigate}>{renderPage()}</AdminLayout>
      ) : (
        <CustomerLayout currentPage={currentPage} onNavigate={navigate}>{renderPage()}</CustomerLayout>
      )}
    </div>
  );
}
