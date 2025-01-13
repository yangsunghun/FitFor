import { useState } from "react";

interface TabProps {
  labels: string[];
  children: React.ReactNode[];
}

const Tabs = ({ labels, children }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b">
        {labels.map((label, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${activeTab === index ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-4">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
