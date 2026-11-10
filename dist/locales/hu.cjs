"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/locales/hu.ts
var hu_exports = {};
__export(hu_exports, {
  hu: () => hu
});
module.exports = __toCommonJS(hu_exports);
var hu = {
  close: "Bez\xE1r\xE1s",
  noResults: "Nincs tal\xE1lat",
  loading: "Bet\xF6lt\xE9s",
  search: "Keres\xE9s",
  commandPalette: "Parancspaletta",
  command: "Parancs",
  commandPlaceholder: "\xCDrjon be egy parancsot\u2026",
  searchUsers: "Felhaszn\xE1l\xF3k keres\xE9se\u2026",
  users: "Felhaszn\xE1l\xF3k",
  showPassword: "Jelsz\xF3 megjelen\xEDt\xE9se",
  hidePassword: "Jelsz\xF3 elrejt\xE9se",
  capsLock: "A Caps Lock be van kapcsolva",
  copy: "M\xE1sol\xE1s",
  copied: "M\xE1solva",
  removeItem: (name) => `${name} elt\xE1vol\xEDt\xE1sa`,
  removeRow: (n) => `${n}. sor elt\xE1vol\xEDt\xE1sa`,
  previousMonth: "El\u0151z\u0151 h\xF3nap",
  nextMonth: "K\xF6vetkez\u0151 h\xF3nap",
  pagination: "Lapoz\xE1s",
  previousPage: "El\u0151z\u0151 oldal",
  nextPage: "K\xF6vetkez\u0151 oldal",
  showing: (from, to, total) => `${from}\u2013${to} / ${total}`,
  pageOf: (page, count) => `${page}. oldal / ${count}`,
  selectAllRows: "\xD6sszes sor kijel\xF6l\xE9se",
  selectRow: "Sor kijel\xF6l\xE9se",
  acknowledge: "Tudom\xE1sul v\xE9tel",
  unsupportedType: (n) => `${n} f\xE1jl t\xEDpusa nem t\xE1mogatott`,
  exceedsSize: (n) => `${n} f\xE1jl meghaladja a m\xE9retkorl\xE1tot`,
  autoRefresh: "Automatikus friss\xEDt\xE9s"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hu
});
//# sourceMappingURL=hu.cjs.map