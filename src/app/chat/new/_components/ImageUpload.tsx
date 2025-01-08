const ImageUpload: React.FC<{ formReturn: any }> = ({ formReturn }) => {
  const { register } = formReturn;

  return (
    <div>
      <h2>이미지 업로드</h2>
      <input
        type="file"
        {...register("imageFile", { required: "이미지를 업로드해주세요." })}
        className="w-full rounded border p-2"
      />
    </div>
  );
};

export default ImageUpload;
