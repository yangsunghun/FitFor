import { useState } from "react";

interface TabProps {
  labels: string[];
  children: React.ReactNode[];
}

const ChatTabs = ({ labels, children }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Tab Navigation */}
      <nav className="absolute top-14 z-20 flex h-14 w-full border-b border-x-text-02 bg-white">
        {labels.map((label, index) => (
          <div
            key={index}
            className={`flex flex-1 cursor-pointer items-center justify-center ${
              activeTab === index ? "border-b-2 border-text-04" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            <div
              className={`text-center text-title2 font-medium leading-[27px] ${
                activeTab === index ? "text-text-04" : "text-text-02"
              }`}
            >
              {label}
            </div>
          </div>
        ))}
      </nav>
      {/* Tab Content */}
      <div>{children[activeTab]}</div>
    </>
  );
};

export default ChatTabs;
