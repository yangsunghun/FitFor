import { useAuthStore } from "@/lib/store/authStore"
import { Plus } from "@phosphor-icons/react"

type VerificationSectionProps = {
  isVerified: boolean
}

const VerificationSection = ({ isVerified = false }: VerificationSectionProps) => {
  const {user} = useAuthStore();
  return (
    <div className="bg-gray-100 rounded-lg p-8 mb-8">
      <p className="text-center mb-4">
        {user?.nickname}님, 인증배지를 신청할 수 있어요!
      </p>
      <div className="flex justify-center">
        <button className="gap-2 flex flex-row bg-black text-white rounded-2xl p-4">
          <Plus size={24}/> 인증배지 신청하기
        </button>
      </div>
    </div>
  )
}

export default VerificationSection