import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";

type AgreementContentProps = {
  closeModal: () => void;
};

const AgreementContent = ({ closeModal }: AgreementContentProps) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex max-h-[550px] w-[25.125rem] flex-col gap-4 tb:max-w-[19.375rem]">
      <p className="text-title1 font-bold tb:text-title2">[개인정보 수집 처리 방침]</p>
      <ol className="scroll-custom space-y-4 overflow-auto break-keep text-subtitle font-medium text-text-03 tb:h-[40vh] tb:text-body">
        <li>
          <strong className="text-black">1. 수집 항목</strong>
          <p>회사는 서비스 제공에 필요한 최소한의 개인정보를 다음과 같이 수집합니다.</p>
          <ul className="list-disc pl-5">
            <li>
              <strong>필수 항목:</strong> 이름, 이메일 주소
            </li>
            <li>
              <strong>추가 항목:</strong> 이용자가 서비스 이용 중 제공하는 위치 정보(주소 정보 제공을 위한 목적에 한함)
            </li>
          </ul>
        </li>
        <li>
          <strong className="text-black">2. 수집 목적</strong>
          <p>회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.</p>
          <ul className="list-disc pl-5">
            <li>회원 관리 및 본인 식별</li>
            <li>서비스 제공 및 운영</li>
            <li>위치 정보 기반 주소 제공 기능 구현</li>
          </ul>
        </li>
        <li>
          <strong className="text-black">3. 보유 및 이용 기간</strong>
          <ol className="list-decimal pl-5">
            <li>수집된 개인정보는 원칙적으로 개인정보의 수집 및 이용 목적이 달성된 후 지체 없이 파기합니다.</li>
            <li>다만, 관련 법령에 따라 보존할 필요가 있는 경우에는 해당 법령에서 정한 기간 동안 보관합니다.</li>
          </ol>
        </li>
        <li>
          <strong className="text-black">4. 동의 거부 권리 및 제한</strong>
          <ol className="list-decimal pl-5">
            <li>이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.</li>
            <li>다만, 동의를 거부할 경우 서비스 이용에 제한이 있을 수 있습니다.</li>
          </ol>
        </li>
        <li>
          <strong className="text-black">5. 개인정보의 제3자 제공</strong>
          <p>
            회사는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않으며, 제공이 필요한 경우 관련 법령에 따라
            이용자의 사전 동의를 받습니다.
          </p>
        </li>
        <li>
          <strong className="text-black">6. 개인정보 보호를 위한 조치</strong>
          <p>
            회사는 이용자의 개인정보를 안전하게 보호하기 위해 관련 법령에 따른 기술적, 관리적 조치를 취하고 있습니다.
          </p>
        </li>
      </ol>
      <div className="flex w-full flex-row gap-3">
        <Button variant="whiteLine" size={isTabletOrSmaller ? "sm" : "lg"} className="w-full" onClick={closeModal}>
          확인했습니다.
        </Button>
      </div>
    </div>
  );
};

export default AgreementContent;
