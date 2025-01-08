const Details: React.FC<{ formReturn: any }> = ({ formReturn }) => {
  const { register } = formReturn;

  return (
    <div>
      <h2>채팅방 설명</h2>
      <textarea
        {...register("description", { required: "설명을 입력해주세요." })}
        className="w-full rounded border p-2"
        placeholder="채팅방 설명"
      />
    </div>
  );
};

export default Details;
