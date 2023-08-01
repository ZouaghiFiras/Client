export const urlLastSegment = (href: string): string => {
  return href.substring(href.lastIndexOf('/') + 1);
};
