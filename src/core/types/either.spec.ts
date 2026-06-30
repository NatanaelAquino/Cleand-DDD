import { left, right, type Either } from "./either"

function doSomething(shouldSucceed: boolean): Either<string, string> {
  if (shouldSucceed) {
    return right('Success')
  }
  return left('Error')
}
test('error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toEqual(true)
  expect(result.isRight()).toEqual(false)
})

test('success result', () => {
  const result = doSomething(true)

  expect(result.isRight()).toEqual(true)
  expect(result.isLeft()).toEqual(false)
})