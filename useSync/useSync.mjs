import { reactive as l, ref as v, watch as g } from "vue";
function w(e) {
  return typeof e == "function";
}
function y(e, c) {
  if (!(e instanceof Array) || !(c instanceof Array) || e.length < c.length)
    return !1;
  for (var i = 0, r = c.length; i < r; i++)
    if (!e.includes(c[i]))
      return !1;
  return !0;
}
function E() {
  const e = l({}), c = v([]), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set();
  g(c.value, (t) => {
    o();
  });
  function f(t) {
    c.value.includes(t) ? (h(t), o()) : c.value.push(t);
  }
  function o() {
    i.forEach((t, n) => {
      s(n);
    });
  }
  function s(t) {
    if (y(c.value, t)) {
      let n = l({});
      t.forEach((a) => {
        n[a] = e[a];
      });
      let u = i.get(t);
      if (r.has(t))
        return;
      u(n), r.add(t);
    }
  }
  function h(t) {
    r.forEach((n) => {
      n.includes(t) && r.delete(n);
    });
  }
  function d(t, n) {
    w(n) ? new Promise(n).then((u) => {
      e[t] = u, f(t);
    }).catch((u) => {
      e[t] = u, f(t);
    }) : (e[t] = n, f(t));
  }
  function p(t, n) {
    i.set(t, n), s(t);
  }
  return {
    track: d,
    trigger: p
  };
}
export {
  E as useSync
};
