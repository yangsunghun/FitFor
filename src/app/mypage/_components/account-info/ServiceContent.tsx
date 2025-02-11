import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";

type ServiceContentProps = {
  closeModal: () => void;
};

const ServiceContent = ({ closeModal }: ServiceContentProps) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex max-h-[550px] w-[25.125rem] flex-col gap-4 tb:max-w-[19.375rem]">
      <p className="text-title1 font-bold tb:text-title2">[핏포 이용약관]</p>
      <ol className="scroll-custom space-y-4 overflow-auto break-keep text-subtitle font-medium text-text-03 tb:h-[40vh] tb:text-body">
        <li>
          <strong className="text-black">제1조 (목적)</strong>
          <p>
            본 약관은 {`"`}핏포{`"`}(이하 {`"`}서비스{`"`}라 함)의 이용자가 제공되는 모든 서비스 이용에 있어 필요한
            권리, 의무 및 책임사항을 규정하며, 특히 위치 정보의 수집 및 이용과 관련된 사항을 포함합니다.
          </p>
        </li>
        <li>
          <strong className="text-black">제2조 (서비스 이용)</strong>
          <p>1. 이용자는 본 약관에 동의함으로써 서비스를 이용할 수 있습니다.</p>
          <p>2. 회사는 서비스 제공에 필요한 경우, 서비스의 일부를 변경하거나 중단할 수 있습니다.</p>
        </li>
        <li>
          <strong className="text-black">제3조 (위치정보의 수집 및 이용)</strong>
          <p>
            1. 본 서비스는 GeoLocation API를 활용하여 이용자의 실시간 위치 정보를 수집하고, 카카오맵 API의 역지오코딩
            기능을 통해 해당 위치의 주소 정보를 제공하는 기능을 포함합니다.
          </p>
          <p> 2. 위치 정보는 오직 주소 정보 제공 목적으로만 사용되며, 이용자의 명시적 동의를 얻은 후 수집됩니다. </p>
          <p>
            3. 수집된 정보는 주소 정보 제공 외의 다른 목적으로 사용되지 않으며, 필요한 경우에만 최소한의 범위 내에서
            일시적으로 처리됩니다.
          </p>
        </li>
        <li>
          <strong className="text-black">제4조 (개인정보 보호)</strong>
          <p>1. 본 서비스는 관련 법령에 따라 이용자의 위치 정보를 포함한 개인정보를 안전하게 관리합니다.</p>
          <p>2. 수집된 개인정보는 서비스 제공 목적 외에는 제3자에게 제공되지 않습니다.</p>
          <p>3. 개인정보 보호에 관한 자세한 사항은 별도의 개인정보 처리방침에 따릅니다.</p>
        </li>
        <li>
          <strong className="text-black">제5조 (책임 및 의무)</strong>
          <p>1. 이용자는 서비스 이용 중 법령 및 공공질서를 준수해야 하며, 불법적이거나 부적절한 활동을 금합니다.</p>
          <p>2. 회사는 서비스 제공과 관련하여 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.</p>
          <p>3. 이용자는 자신의 위치 정보 제공에 따른 결과에 대해 스스로 책임을 집니다.</p>
        </li>
        <li>
          <strong className="text-black">제6조 (약관 변경)</strong>
          <p>1. 본 약관은 서비스 운영상의 필요에 따라 변경될 수 있으며, 변경된 내용은 사전에 공지합니다.</p>
          <p>2. 변경된 약관에 동의하지 않을 경우, 이용자는 서비스 이용을 중단할 수 있습니다.</p>
          <p> 3. 이용자가 변경 후에도 서비스를 계속 이용할 경우, 변경된 약관에 동의한 것으로 간주됩니다.</p>
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

export default ServiceContent;
