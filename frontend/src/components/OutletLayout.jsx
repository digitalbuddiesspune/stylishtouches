import Header from "./Header";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import ScrollToTop from "./ScrollToTop";
import { Outlet } from "react-router-dom";

const OutletLayout = () => (
  <div className="flex flex-col min-h-screen">
    <ScrollToTop />
    <Header />
    <main className="grow container mx-auto p-4 pt-12 pb-20 md:pb-4"><Outlet /></main>
    <Footer />
    <MobileBottomNav />
  </div>
);

export default OutletLayout;
