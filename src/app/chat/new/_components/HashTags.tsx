const HashTags: React.FC<{ formReturn: any }> = ({ formReturn }) => {
  const { register } = formReturn;

  return (
    <div>
      <h2>해시태그</h2>
      <input
        {...register("hashTags")}
        className="w-full rounded border p-2"
        placeholder="해시태그를 쉼표로 구분하여 입력해주세요. 예: #운동, #건강"
      />
    </div>
  );
};

export default HashTags;
