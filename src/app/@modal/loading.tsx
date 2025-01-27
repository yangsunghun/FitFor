import ModalBg from "./(.)detail/[id]/view/ModalBg";

export default function Loading() {
  return (
    <ModalBg>
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
    </ModalBg>

    // <div className="fixed inset-0 z-[50] bg-bg-01"></div>
  );
}
