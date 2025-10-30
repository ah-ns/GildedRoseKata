class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.name == "Aged Brie") {
        if (item.quality < 50) item.quality++;
        if (item.quality < 50 && item.sellIn < 0) item.quality++;
      } else if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (item.sellIn < 0) item.quality = 0;
        else {
          if (item.quality < 50) item.quality++;
          if (item.quality < 50 && item.sellIn <= 10) item.quality++;
          if (item.quality < 50 && item.sellIn <= 5) item.quality++;
        }
      } else if (item.name != "Sulfuras, Hand of Ragnaros") {
        if (item.quality > 0) item.quality--;
        if (item.quality > 0 && item.sellIn < 0) item.quality--;
        if (item.name.split(" ")[0] == "Conjured") {
          if (item.quality > 0) item.quality--;
          if (item.quality > 0 && item.sellIn < 0) item.quality--;
        }
      }
      if (item.name != "Sulfuras, Hand of Ragnaros") item.sellIn--;
      this.items[i] = item;
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
