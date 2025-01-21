import { Button } from "@/components/ui/Button";

type ServiceContentProps = {
  closeModal: () => void;
};

const ServiceContent = ({ closeModal }: ServiceContentProps) => {
  return (
    <div className="flex w-[27rem] flex-col gap-4">
      <p className="text-title1 font-bold">서비스 이용 약관</p>
      <ol className="space-y-4 break-keep text-subtitle font-medium text-text-03">
        <li>
          <strong className="text-black">목적</strong>
          <p>
            본 약관은 서비스 이용자가 제공되는 모든 서비스(이하 서비스)를 이용함에 있어 필요한 권리, 의무 및 책임사항을
            규정합니다.
          </p>
        </li>
        <li>
          <strong className="text-black">서비스 이용</strong>
          <p>
            이용자는 본 약관에 동의함으로써 서비스를 사용할 수 있습니다. 회사는 서비스 제공에 필요한 경우, 서비스의
            일부를 변경하거나 중단할 수 있습니다.
          </p>
        </li>
        <li>
          <strong className="text-black">책임 및 의무</strong>
          <p>
            이용자는 서비스 이용 중 법령 및 공공질서를 준수해야 하며, 불법적이거나 부적절한 활동을 금합니다. 회사는
            서비스 제공과 관련하여 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.
          </p>
        </li>
        <li>
          <strong className="text-black">약관 변경</strong>
          <p>
            본 약관은 필요에 따라 변경될 수 있으며, 변경된 내용은 사전에 공지합니다. 변경 후 서비스를 계속 이용할 경우
            변경된 약관에 동의한 것으로 간주됩니다.
          </p>
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

export default ServiceContent;
