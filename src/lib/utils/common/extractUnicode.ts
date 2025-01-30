// ✅ 한글 초성만 추출
export const extractUnicode = (text: string): string => {
  const CHOSUNG_START = 0x1100; // 초성 유니코드 시작
  const HANGUL_START = 0xac00; // 한글 유니코드 시작
  const HANGUL_END = 0xd7a3; // 한글 유니코드 끝

  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= HANGUL_START && code <= HANGUL_END) {
        const offset = code - HANGUL_START;
        return String.fromCharCode(CHOSUNG_START + Math.floor(offset / (21 * 28))); // 초성 추출
      }
      return char; // 한글이 아닌 문자는 그대로 반환
    })
    .join("");
};

// ✅ 한글 초성 + 중성 (받침 제거)
export const extractChosungJungSung = (text: string): string => {
  const HANGUL_START = 0xac00;
  const HANGUL_END = 0xd7a3;
  const CHOSUNG_START = 0x1100;
  const JUNG_SUNG_BASE = 28;

  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= HANGUL_START && code <= HANGUL_END) {
        const offset = code - HANGUL_START;
        const chosung = String.fromCharCode(CHOSUNG_START + Math.floor(offset / (21 * 28)));
        const jungsung = String.fromCharCode(0x1161 + Math.floor((offset % (21 * 28)) / 28));
        return chosung + jungsung; // 초성 + 중성만 반환 (받침 제거)
      }
      return char;
    })
    .join("");
};
