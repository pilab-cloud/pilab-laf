'use strict';

var chunkDLFBMRS2_cjs = require('./chunk-DLFBMRS2.cjs');
var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function useControllableState({
  value,
  defaultValue,
  onChange
}) {
  const [inner, setInner] = React__namespace.useState(defaultValue);
  const controlled = value !== void 0;
  const current = controlled ? value : inner;
  const ref = React__namespace.useRef(current);
  ref.current = current;
  const set = React__namespace.useCallback(
    (next) => {
      const v = typeof next === "function" ? next(ref.current) : next;
      if (!controlled) setInner(v);
      ref.current = v;
      onChange?.(v);
    },
    [controlled, onChange]
  );
  return [current, set];
}
var format = /* @__PURE__ */ chunkDLFBMRS2_cjs.createFormatters();
function diffLines(before, after) {
  const a = before.split("\n");
  const b = after.split("\n");
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i2 = a.length - 1; i2 >= 0; i2--)
    for (let j2 = b.length - 1; j2 >= 0; j2--) dp[i2][j2] = a[i2] === b[j2] ? dp[i2 + 1][j2 + 1] + 1 : Math.max(dp[i2 + 1][j2], dp[i2][j2 + 1]);
  const out = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) out.push({ type: "same", text: a[i++] }), j++;
    else if (dp[i + 1][j] >= dp[i][j + 1]) out.push({ type: "del", text: a[i++] });
    else out.push({ type: "add", text: b[j++] });
  }
  while (i < a.length) out.push({ type: "del", text: a[i++] });
  while (j < b.length) out.push({ type: "add", text: b[j++] });
  return out;
}
function matchesAccept(file, accept) {
  if (!accept) return true;
  const name = file.name.toLowerCase();
  return accept.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean).some((t) => t.startsWith(".") ? name.endsWith(t) : t.endsWith("/*") ? file.type.toLowerCase().startsWith(t.slice(0, -1)) : file.type.toLowerCase() === t);
}

exports.diffLines = diffLines;
exports.format = format;
exports.matchesAccept = matchesAccept;
exports.useControllableState = useControllableState;
//# sourceMappingURL=chunk-RRFUE2QS.cjs.map
//# sourceMappingURL=chunk-RRFUE2QS.cjs.map