/**
 * Locations module
 */

const generatePageLocations = () => {
  const numberOfPages = 6;
  const groupsPerPage = 6;

  const generatePageLocationIds = (firstGroupNum) => {
    const groupLocationIds = [];
    for (let groupCount = 0; groupCount < groupsPerPage; groupCount++) {
      groupLocationIds.push(`GROUP_${firstGroupNum + groupCount}`);
    }

    return groupLocationIds;
  };

  const pageLocations = {};

  for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
    pageLocations[`PAGE_${pageNum}`] = {
      pageId: `PAGE_${pageNum}`,
      name: `PAGE ${pageNum}`,
      locationIds: generatePageLocationIds(numberOfPages * (pageNum - 1) + 1),
    };
  }

  return pageLocations;
};

export const pageLocations = generatePageLocations();

export const staticLocations = {
  ROSTER: {locationId: 'ROSTER', name: 'Roster'},
  NEW_PERSONNEL: {locationId: 'NEW_PERSONNEL', name: 'New Personnel'},
  STAGING: {locationId: 'STAGING', name: 'Staging'},
};
