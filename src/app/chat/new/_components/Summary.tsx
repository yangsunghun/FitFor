import React, { useState } from "react";
import { FormDetails } from "../page";

interface SummaryProps {
  formData: FormDetails;
  onNext: (data: Partial<FormDetails>) => void;
}

export default function Summary({ formData, onNext }: SummaryProps) {
  const [title, setTitle] = useState(formData.title);
  const [subtitle, setSubtitle] = useState(formData.subtitle);
  const [description, setDescription] = useState(formData.description);

  const handleSubmit = () => {
    onNext({ title, subtitle, description });
  };

  return (
    <div>
      <h2>Summary</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtitle" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}
