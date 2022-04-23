Run with `npm i && npm run dev`

Didn't have time to test, if i did have time, I would have written a main test that:

- Uses React Testing Library to select the input field
- Use userEvent to type commands into the input field in the order listed in the task markdown, and click Enter
- Expected the report() text to be displayed at the end with the correct position
