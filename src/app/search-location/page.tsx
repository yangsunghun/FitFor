import { Suspense } from "react";
import LocationContents from "./_components/LocationContents";

const LocationPage = () => {
  return (
    <div className="inner relative pb-40 pt-10 tb:pb-10 tb:pt-[60px]">
      <Suspense fallback={<p></p>}>
        <LocationContents />
      </Suspense>
    </div>
  );
};
export default LocationPage;
