export const steps = {
  // 진행될 step의 순서, Funnel 컴포넌트 안에 Step 컴포넌트 순서는 상관 없음
  order: ["introduction", "profileImage", "hashTags", "careers", "completion"],
  hasPrev(step: string): boolean {
    return this.getIndex(step) !== 0;
  },
  // 다음 단계를 판단할 때 completion은 고려하지 않음
  // completion 전 단계가 마지막 단계
  hasNext(step: string): boolean {
    return this.getIndex(step) + 2 < this.order.length;
  },
  getNextStep(step: string): string | null {
    const currentIndex = this.getIndex(step);
    if (this.hasNext(step)) {
      return this.order[currentIndex + 1];
    }
    return null;
  },
  getPrevStep(step: string): string | null {
    const currentIndex = this.getIndex(step);
    if (this.hasPrev(step)) {
      return this.order[currentIndex - 1];
    }
    return null;
  },
  getIndex(targetStep: string): number {
    return this.order.findIndex((step) => step === targetStep);
  }
};
