import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const DetailPageView = async ({ params }: Props) => {
  const postId = params.id;

  return redirect(`/detail/${postId}`);
};

export default DetailPageView;
