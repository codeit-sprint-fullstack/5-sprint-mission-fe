export function getOffset(activePage, limit) {
  return activePage * limit;
}

export function getTotalPageList(dataTotalCount, limit) {
  return Array.from(
    { length: Math.ceil(dataTotalCount / limit) },
    (_, index) => index
  );
}

export function isActiveNextPageGroupChangeButton(
  dataTotalCount,
  limit,
  currentStartPage,
  groupSize
) {
  const totalPageList = getTotalPageList(dataTotalCount, limit);
  const lastPage = totalPageList[totalPageList.length - 1];
  return currentStartPage + groupSize <= lastPage;
}
