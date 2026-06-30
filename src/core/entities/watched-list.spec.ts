import { WatchedList } from "./watched-list";

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}


describe("WatchedList", () => {
  it("should initialize with the correct items", () => {
    const list = new NumberWatchedList([1, 2, 3])
    expect(list.currentItems).toEqual([1, 2, 3])
  })
  it("should add items with the correct items", () => {
    const list = new NumberWatchedList([1, 2, 3])
    list.add(4)
    expect(list.currentItems).toEqual([1, 2, 3, 4])
    expect(list.getNewItems()).toEqual([4])
  })


  it("should be able to add an item even if it was removed before", () => {
    const list = new NumberWatchedList([1, 2, 3])
    list.add(2)

    list.remove(2)
    expect(list.currentItems).toEqual([1, 3])
    expect(list.getNewItems()).toEqual([])
  })


  it("should be able to update its items", () => {
    const list = new NumberWatchedList([1, 2, 3])
    list.update([4, 5, 6])
    expect(list.currentItems).toEqual([4, 5, 6])
    expect(list.getNewItems()).toEqual([4, 5, 6])
    expect(list.getRemovedItems()).toEqual([1, 2, 3])
  })
})  