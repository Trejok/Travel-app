import { handleSubmit } from './formHandler';

test("It should return true", async () => {
  expect(handleSubmit).toBeDefined();
});

test("It should be a function", async () => {
  expect(typeof handleSubmit).toBe("function");
});
