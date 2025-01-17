import { fetchUser } from "@/lib/utils/auth/auth";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => fetchUser()
  });

  // const mutation = useMutation({
  //   mutationFn
  // })
  return { user: data, isPending, isError };
};
