export const handleImageDownload = async (url: string) => {
  try {
    // Fetch 파일 데이터
    const response = await fetch(url);

    // HTTP 요청이 실패한 경우 처리
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Blob 데이터 생성
    const blob = await response.blob();

    // URL에서 파일 이름 추출
    const fileName = url.split("/").pop()?.split("?")[0] || "downloaded-file";

    // Blob URL 생성
    const blobUrl = URL.createObjectURL(blob);

    // 다운로드 트리거
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName; // 추출한 파일 이름 설정
    document.body.appendChild(link);
    link.click();

    // 메모리 정리
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("파일 다운로드 중 문제가 발생했습니다:", error);
  }
};
