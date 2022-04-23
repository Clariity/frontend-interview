import { COMMON_PASSWORDS } from "./consts";

// test if string has lowercase, uppercase, and digit, return how many missing
export function getNoOfCharacterTypesRequired(password: string): number {
  return [/[a-z]/, /[A-Z]/, /\d/].filter((t: RegExp) => !t.test(password))
    .length;
}

// get number of character clusters and their lengths
export function getCharacterClusters(password: string): number[] {
  // globally match on any character that has 2 previous values the same at least once
  const matches = password.match(/(.)\1\1+/g);
  return matches?.map((m) => m.length) ?? [];
}

// get number of changes required for character clusters
export function getClusterChanges(clusters: number[]): number {
  return (
    clusters.reduce((acc: number, current: number) => {
      return acc + Math.floor(current / 3);
    }, 0) ?? 0
  );
}

// get number of common passwords in the string
export function getCommonPasswords(password: string): number {
  return COMMON_PASSWORDS.filter((p: string) => password.includes(p)).length;
}
