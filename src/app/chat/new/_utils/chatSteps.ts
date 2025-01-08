export const steps = {
  order: ["introduction", "details", "hashTags", "imageUpload", "completion"],
  getNextStep: (current: string) => {
    const currentIndex = steps.order.indexOf(current);
    return currentIndex < steps.order.length - 1 ? steps.order[currentIndex + 1] : null;
  },
  getPrevStep: (current: string) => {
    const currentIndex = steps.order.indexOf(current);
    return currentIndex > 0 ? steps.order[currentIndex - 1] : null;
  }
};
