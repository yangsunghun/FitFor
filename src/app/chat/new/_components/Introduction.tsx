const Introduction: React.FC<{ formReturn: any }> = ({ formReturn }) => {
  const { register } = formReturn;

  return (
    <div>
      <h2>채팅방 소개</h2>
      <input
        {...register("title", { required: "채팅방 제목을 입력해주세요." })}
        className="w-full rounded border p-2"
        placeholder="채팅방 제목"
      />
    </div>
  );
};

export default Introduction;
