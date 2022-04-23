import {
  getCharacterClusters,
  getClusterChanges,
  getCommonPasswords,
  getNoOfCharacterTypesRequired,
} from "./functions";
import { LOWER_LIMIT, UPPER_LIMIT } from "./consts";

export function getStepsToSecurePassword(password: string): number {
  const changesRequired = getNoOfCharacterTypesRequired(password);
  const clusters = getCharacterClusters(password);
  const commonPasswords = getCommonPasswords(password);
  const distanceToLowerLimit = LOWER_LIMIT - password.length;
  const distanceToUpperLimit = password.length - UPPER_LIMIT;

  // get number of changes required for character clusters
  const addClusters =
    clusters.reduce((acc: number, current: number) => {
      return acc + Math.floor(current / 3);
    }, 0) ?? 0;

  // as all types of changes can be fixed by adding a character, this is simply a case of what is the most number of changes required
  if (distanceToLowerLimit > 0) {
    return Math.max(
      distanceToLowerLimit,
      changesRequired,
      addClusters,
      commonPasswords
    );
  }

  if (distanceToUpperLimit > 0) {
    // we need to prioritise removing from a cluster or common password over removing any character so that we can reduce the number of steps needed
    let commonPasswordsLeftToSwap = commonPasswords;

    // for each character that needs to be removed
    for (let i = 0; i < distanceToUpperLimit; i++) {
      let clusterShrunk = false;

      // prioritise highest number of changes
      if (getClusterChanges(clusters) >= commonPasswordsLeftToSwap) {
        // see if we can remove 1 from a cluster of 3 to force 1 less change needed on that cluster
        for (let j = 0; j < clusters.length; j++) {
          if (clusters[j] % 3 === 0) {
            clusters[j] = clusters[j] - 1;
            clusterShrunk = true;
            break;
          }
        }
      }

      // if cluster not shrunk and we have common passwords left to fix, remove from a common password, else remove from closest cluster to next hit a factor of 3
      if (!clusterShrunk) {
        if (commonPasswordsLeftToSwap > 0) commonPasswordsLeftToSwap--;
        else {
          const clustersModulo3 = clusters.map((c) => c % 3);
          const closestIndex = clustersModulo3.indexOf(
            Math.min(...clustersModulo3)
          );
          clusters[closestIndex] = clusters[closestIndex] - 1;
        }
      }
    }

    // get new number of changes required for character clusters after removals
    const removeClusters = getClusterChanges(clusters);

    // as we have taken into account all fixes by removal so far, we can use the max of the remaining changes on top of those removals
    return (
      distanceToUpperLimit +
      Math.max(changesRequired, removeClusters, commonPasswordsLeftToSwap)
    );
  }

  // as all types of changes can be fixed with a swap of a character, this is also a case of what is the most number of changes required
  return Math.max(changesRequired, addClusters, commonPasswords);
}
