import { useState } from "react";

interface TabProps {
  labels: string[];
  children: React.ReactNode[];
}

const Tabs = ({ labels, children }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mx-auto w-[996px]">
      {/* Tab Navigation */}
      <nav className="flex h-14 border-b border-[#e8e8e8] bg-white">
        {labels.map((label, index) => (
          <div
            key={index}
            className={`flex flex-1 items-center justify-center ${
              activeTab === index ? "border-b-2 border-[#1a1a1a]" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            <div
              className={`text-lg text-center font-medium leading-[27px] ${
                activeTab === index ? "text-[#1a1a1a]" : "text-[#b8b8b8]"
              }`}
            >
              {label}
            </div>
          </div>
        ))}
      </nav>
      {/* Tab Content */}
      <div className="py-4">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
