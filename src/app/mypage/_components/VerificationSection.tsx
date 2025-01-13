import { Plus } from "@phosphor-icons/react"

type VerificationSectionProps = {
  nickname: string
  isVerified: boolean
}

const VerificationSection = ({ nickname, isVerified }: VerificationSectionProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-8 mb-8">
      <p className="text-center mb-4">
        {nickname}님, 인증배지를 신청할 수 있어요!
      </p>
      <div className="flex justify-center">
        <button className="gap-2">
          <Plus className="w-4 h-4" />
          인증배지 신청하기
        </button>
      </div>
    </div>
  )
}

export default VerificationSection