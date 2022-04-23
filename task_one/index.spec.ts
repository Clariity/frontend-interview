import {
  getCharacterClusters,
  getCommonPasswords,
  getNoOfCharacterTypesRequired,
} from "./functions";
import { getStepsToSecurePassword } from "./index";

describe("getNoOfCharacterTypesRequired", () => {
  test("Returns 0 if all criteria met", () => {
    expect(getNoOfCharacterTypesRequired("fOo3")).toBe(0);
  });

  test("Returns 1 for string missing a lowercase", () => {
    expect(getNoOfCharacterTypesRequired("FOO1")).toBe(1);
  });

  test("Returns 1 for string missing an uppercase", () => {
    expect(getNoOfCharacterTypesRequired("foo1")).toBe(1);
  });

  test("Returns 1 for string missing a digit", () => {
    expect(getNoOfCharacterTypesRequired("fooBAR")).toBe(1);
  });

  test("Returns 3 for string missing an uppercase, lowercase and a digit", () => {
    expect(getNoOfCharacterTypesRequired("!,?")).toBe(3);
  });

  test("Returns 3 for an empty string", () => {
    expect(getNoOfCharacterTypesRequired("")).toBe(3);
  });
});

describe("getCharacterClusters", () => {
  test("Returns empty array if no 3 consecutive characters", () => {
    expect(getCharacterClusters("foo")).toStrictEqual([]);
  });

  test("Returns [3] if 3 consecutive characters", () => {
    expect(getCharacterClusters("fooo")).toStrictEqual([3]);
  });

  test("Returns [6,3] if 6 consecutive characters + 3 consecutive characters", () => {
    expect(getCharacterClusters("foooooobaaar")).toStrictEqual([6, 3]);
  });
});

describe("getCommonPasswords", () => {
  test("Returns 0 if no matching passwords", () => {
    expect(getCommonPasswords("thisisaverylongpieceoftext")).toBe(0);
  });

  test("Returns 1 if password contains a matching password", () => {
    expect(getCommonPasswords("1234Test")).toBe(1);
  });

  test("Returns 2 if password contains 2 matching passwords", () => {
    expect(getCommonPasswords("1234password")).toBe(2);
  });
});

describe("getStepsToSecurePassword", () => {
  test("Returns 0 for secure password", () => {
    expect(getStepsToSecurePassword("1377C0d3")).toBe(0);
  });

  test("Returns 7 for empty password", () => {
    // 7 short
    expect(getStepsToSecurePassword("")).toBe(7);
  });

  test("Returns 6 for 6 additions (including upper case and number)", () => {
    // 6 short
    expect(getStepsToSecurePassword("z")).toBe(6);
  });

  test("Returns 4 for 4 additions", () => {
    // 4 short
    expect(getStepsToSecurePassword("aA1")).toBe(4);
  });

  test("Returns 2 for 2 additions (including lower case addition to break consecutive, and digit addition)", () => {
    // 2 short
    expect(getStepsToSecurePassword("HHHHH")).toBe(2);
  });

  test("Returns 2 for 2 consecutive changes (addition upper case and swap to number)", () => {
    // 1 short
    expect(getStepsToSecurePassword("oooooo")).toBe(2);
  });

  test("Returns 1 for 1 removal", () => {
    // 1 long
    expect(getStepsToSecurePassword("Ryangregorytypinglongword1")).toBe(1);
  });

  test("Returns 4 for 2 removals (including removing repetition), 1 upper case change, 1 number change", () => {
    // 2 long
    expect(getStepsToSecurePassword("ryangregooorytypinglongword")).toBe(4);
  });

  test("Returns 3 for 2 removals (including removing common passwords), 1 repetition change (including upper case change)", () => {
    // 2 long
    expect(getStepsToSecurePassword("1234gregooorytypingpassword")).toBe(3);
  });

  test("Returns 4 for 2 removals (including removing common passwords), 1 repetition change (including upper case change), 1 number change", () => {
    // 2 long
    expect(getStepsToSecurePassword("testgregooorytypingpassword")).toBe(4);
  });

  test("Returns 8 for 3 removals (including 3 consecutive changes), 5 consecutive changes (including upper case change, digit change)", () => {
    // 3 long
    expect(getStepsToSecurePassword("aabbabbaaaaaaaaaaaaaaazzzzzz")).toBe(8);
  });
});
