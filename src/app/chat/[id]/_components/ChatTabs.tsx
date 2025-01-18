import { useState } from "react";

interface TabProps {
  labels: string[];
  children: React.ReactNode[];
}

const ChatTabs = ({ labels, children }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mx-auto w-[996px]">
      {/* Tab Navigation */}
      <nav className="flex h-14 border-b border-x-text-02 bg-white">
        {labels.map((label, index) => (
          <div
            key={index}
            className={`flex flex-1 items-center justify-center cursor-pointer ${
              activeTab === index ? "border-b-2 border-text-04" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            <div
              className={`text-title2 text-center font-medium leading-[27px] ${
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
    </div>
  );
};

export default ChatTabs;
