import HeaderContent from "@/components/layout/HeaderContent";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="tb:hidden fixed left-0 top-0 z-50 w-full">
      <Suspense fallback={<p></p>}>
        <HeaderContent />
      </Suspense>
    </header>
  );
};

export default Header;
