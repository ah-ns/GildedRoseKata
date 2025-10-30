const { Shop, Item } = require("./gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

test("brie increase quality", function () {
  let gildedRose = new Shop([new Item("Aged Brie", 6, 1)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(2);
  gildedRose.updateQuality();
  gildedRose.updateQuality();
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(5);
});

test("negative brie sellIn", function () {
  let gildedRose = new Shop([new Item("Aged Brie", -1, 1)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(3);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(5);
});

test("backstage pass quality", function () {
  let gildedRose = new Shop([
    new Item("Backstage passes to a TAFKAL80ETC concert", 6, 1),
  ]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(3);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(6);
});

test("backstage pass quality after sellIn", function () {
  let gildedRose = new Shop([
    new Item("Backstage passes to a TAFKAL80ETC concert", -1, 1),
  ]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(0);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(0);
});

test("backstage pass > 10 sellIn", function () {
  let gildedRose = new Shop([
    new Item("Backstage passes to a TAFKAL80ETC concert", 12, 1),
  ]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(2);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(3);
});

test("backstage pass <= 10 sellIn, > 50 quality", function () {
  let gildedRose = new Shop([
    new Item("Backstage passes to a TAFKAL80ETC concert", 6, 51),
  ]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(51);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(51);
});

test("empty shop", function () {
  let gildedRose = new Shop();
  expect(gildedRose.items.length).toBe(0);
});

test("backstage pass quality > 50", function () {
  let gildedRose = new Shop([
    new Item("Backstage passes to a TAFKAL80ETC concert", 12, 51),
  ]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(51);
});

test("quality not < 0", function () {
  let gildedRose = new Shop([new Item("A", -1, 1)]);
  gildedRose.updateQuality();
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(0);
});

test("positive quality negative sellin", function () {
  let gildedRose = new Shop([new Item("A", -1, 5)]);
  gildedRose.updateQuality();
  gildedRose.updateQuality();
  expect(gildedRose.items[0].sellIn).toBe(-3);
});

test("sulfuras quality", function () {
  let gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(80);
});

test("conjuring items degrade twice as fast", function () {
  let gildedRose = new Shop([new Item("Conjured Staff", 0, 7)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(5);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(1);
});

test("conjuring items should not degrade past 0", function () {
  let gildedRose = new Shop([new Item("Conjured Staff", 0, 5)]);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(3);
  gildedRose.updateQuality();
  expect(gildedRose.items[0].quality).toBe(0);
});
