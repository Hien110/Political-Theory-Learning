import React from "react";
import Header from "../components/Header";
import SidebarLecturer from "../components/SidebarLecturer";

import { Button } from "../components/ui/button"; // Thêm dòng này


function ScrollToTopButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <Button
        onClick={scrollToTop}
        variant="default"
        size="icon"
        round="full"
        className="fixed bottom-8 right-8 z-50 bg-custom-blue text-white shadow-lg hover:bg-custom-bluehover2 transition"
        aria-label="Lên đầu trang"
      >
        <span className="text-2xl">↑</span>
      </Button>
    )
  );
}

function LecturerLayout({ children }) {
  return (
    <div>
      <Header />
      <SidebarLecturer className="z-40">
        <div className="p-6 pt-25">
          {children}
        </div>
        </SidebarLecturer>
      <ScrollToTopButton />
    </div>
  );
}

export default LecturerLayout;
