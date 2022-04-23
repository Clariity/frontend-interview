`getStepsToSecurePassword()` in index.ts is the main function

tests are in index.spec.ts

Run tests with: `npm i && npm run test`

Assumptions Made:

- Only valid strings are passed to the function (no time for error handling)

Note on getCommonPasswords

- if password is "1234567" then ["12345","123456","1234567"] will match, one change to "A234567" will fix this
- if password is "12345password" then ["12345","password"] will match, 2 changes are required to fix this as they are 2 separate words that do not overlap
- if password is "1234500000" then ["12345","00","0000"] (assumming 00 and 0000 are in the common list), this requires 3 changes, even with overlapping characters
- looked at trying to solve this issue and I could not think of a simple solution in the time frame, so I am instead simplifying and assuming that the number of passwords matched is the number of changes needed.
