import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

const KakaoIcon = ({ size = 20 }: Props) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.9727 0C5.35763 0 0 4.20957 0 9.45786C0 12.7927 2.24146 15.7449 5.57631 17.4396L4.42825 21.7039C4.37358 21.8132 4.42825 21.9772 4.53759 22.0866C4.59226 22.1412 4.70159 22.1959 4.75626 22.1959C4.81093 22.1959 4.92027 22.1412 4.97494 22.1412L9.84055 18.861C10.5513 18.9704 11.262 19.0251 12.0273 19.0251C18.6424 19.0251 24 14.7608 24 9.5672C24 4.20957 18.6424 0 11.9727 0Z"
        fill="black"
      />
    </svg>
  );
};

export default KakaoIcon;
