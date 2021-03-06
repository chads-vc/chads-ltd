import BigNumber from "bignumber.js/bignumber";

import card1 from "../../assets/cards/1.json";
import card2 from "../../assets/cards/2.json";
import card3 from "../../assets/cards/3.json";
import card4 from "../../assets/cards/4.json";
import card5 from "../../assets/cards/5.json";
import card6 from "../../assets/cards/6.json";
import card7 from "../../assets/cards/7.json";
import card8 from "../../assets/cards/8.json";
import card9 from "../../assets/cards/9.json";
import card10 from "../../assets/cards/10.json";
import card11 from "../../assets/cards/11.json";
import card12 from "../../assets/cards/12.json";
import card13 from "../../assets/cards/13.json";
import card14 from "../../assets/cards/14.json";
import card15 from "../../assets/cards/15.json";
import card16 from "../../assets/cards/16.json";
import card17 from "../../assets/cards/17.json";

export const SUBTRACT_GAS_LIMIT = 100000;

const ONE_MINUTE_IN_SECONDS = new BigNumber(60);
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60);
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24);
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365);

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber("4294967295"), // 2**32-1
  ONES_127: new BigNumber("340282366920938463463374607431768211455"), // 2**128-1
  ONES_255: new BigNumber(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber("1e18"),
};

export const addressMap = {
  uniswapFactory: "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95",
  uniswapFactoryV2: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  YFI: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
  YCRV: "0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8",
  UNIAmpl: "0xc5be99a02c6857f9eac67bbce58df5572498f40c",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  UNIRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
  SNX: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
  COMP: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
  LEND: "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
  YAMYCRV: "0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726",
  CHADSETH: "0xEC81c9eB83E464499b09b38510f967d97363745b",
};

export const chadletsCards = [
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
  card10,
  card11,
  card12,
  card13,
  card14,
  card15,
  card16,
  card17
];
