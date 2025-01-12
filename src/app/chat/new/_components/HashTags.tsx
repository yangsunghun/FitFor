import React from "react";
import { FormDetails } from "../page";

interface HashTagsProps {
  formData: FormDetails;
  setFormData: React.Dispatch<React.SetStateAction<FormDetails>>;
  onPrev: () => void;
  onCreateChatRoom: () => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export default function HashTags({
  formData,
  setFormData,
  onPrev,
  onCreateChatRoom,
  loading,
  error,
  success,
}: HashTagsProps) {
  const [hashtags, setHashtags] = React.useState<string[]>(formData.hashtags || []);

  const handleAddTag = (tag: string) => {
    if (tag && !hashtags.includes(tag)) {
      const updatedTags = [...hashtags, tag];
      setHashtags(updatedTags);
  
      // formData 업데이트
      setFormData((prev) => {
        const newFormData = { ...prev, hashtags: updatedTags };
        return newFormData;
      });
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    const updatedTags = hashtags.filter((t) => t !== tag);
    setHashtags(updatedTags);
  
    // formData 업데이트
      setFormData((prev) => {
        const newFormData = { ...prev, hashtags: updatedTags };
        return newFormData;
      });
  };

  React.useEffect(() => {
    setHashtags(formData.hashtags || []);
  }, [formData.hashtags]);

  return (
    <div>
      <h2>HashTags</h2>
      <p>
        <strong>Title:</strong> {formData.title}
      </p>
      <p>
        <strong>Subtitle:</strong> {formData.subtitle}
      </p>
      <div>
        {hashtags.map((tag) => (
          <span key={tag} onClick={() => handleRemoveTag(tag)}>
            #{tag} ✕
          </span>
        ))}
      </div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTag(e.currentTarget.value.trim());
            e.currentTarget.value = "";
          }
        }}
        placeholder="Add a hashtag"
      />
      <button onClick={onPrev} disabled={loading}>
        Previous
      </button>
      <button onClick={onCreateChatRoom} disabled={loading}>
        {loading ? "Creating..." : "Create Chat Room"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Chat room created successfully!</p>}
    </div>
  );
}