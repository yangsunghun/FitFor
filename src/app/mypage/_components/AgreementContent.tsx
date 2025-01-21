import { Button } from "@/components/ui/Button";

type AgreementContentProps = {
  closeModal: () => void;
};

const AgreementContent = ({ closeModal }: AgreementContentProps) => {
  return (
    <div className="flex w-[27rem] flex-col gap-4">
      <p className="text-title1 font-bold">개인정보 수집 방침</p>
      <ol className="space-y-4 break-keep text-subtitle font-medium text-text-03">
        <li>
          <strong className="text-black">수집 항목</strong>
          <p>이름, 이메일 주소 등 서비스 이용에 필요한 최소한의 개인정보를 수집합니다.</p>
        </li>
        <li>
          <strong className="text-black">수집 목적</strong>
          <p>회원 관리, 서비스 제공, 등.</p>
        </li>
        <li>
          <strong className="text-black">보유 기간</strong>
          <p>
            개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 파기됩니다. 단, 관련 법령에 따라 보존해야 하는 경우에는
            해당 기간 동안 보관합니다.
          </p>
        </li>
        <li>
          <strong className="text-black">동의 거부 권리 및 제한</strong>
          <p>이용자는 개인정보 수집 및 이용 동의를 거부할 수 있으나, 이 경우 서비스 이용에 제한이 있을 수 있습니다.</p>
        </li>
      </ol>
      <div className="flex w-full flex-row gap-3">
        <Button variant="whiteLine" size="lg" className="w-full" onClick={closeModal}>
          확인했습니다.
        </Button>
      </div>
    </div>
  );
};

export default AgreementContent;
