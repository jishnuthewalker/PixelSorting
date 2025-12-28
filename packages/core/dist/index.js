import $e, { useRef as pr, useState as ve, useEffect as de, useCallback as te } from "react";
const Le = (c, b, y, x) => {
  switch (x) {
    case "brightness":
      return (c + b + y) / 3;
    case "red":
      return c;
    case "green":
      return b;
    case "blue":
      return y;
    case "hue": {
      const h = c / 255, p = b / 255, o = y / 255, a = Math.max(h, p, o), f = Math.min(h, p, o);
      let g = 0;
      return a === f ? g = 0 : a === h ? g = (p - o) / (a - f) : a === p ? g = 2 + (o - h) / (a - f) : g = 4 + (h - p) / (a - f), g *= 60, g < 0 && (g += 360), g;
    }
    case "saturation": {
      const h = c / 255, p = b / 255, o = y / 255, a = Math.max(h, p, o), f = Math.min(h, p, o);
      let g = 0;
      return a === 0 ? g = 0 : g = (a - f) / a, g * 100;
    }
    default:
      return 0;
  }
}, gr = (c, b, y) => {
  const { width: x, height: h, data: p } = c, o = new Uint8ClampedArray(p), { mode: a, thresholdMode: f, thresholdLower: g, thresholdUpper: m, reverse: _, invertMask: w } = b, T = f === "none" ? a : f, N = h, M = x;
  for (let A = 0; A < N; A++) {
    let k = 0, i = 0;
    for (; i < M; ) {
      const L = (S) => {
        const R = o[S], C = o[S + 1], W = o[S + 2];
        if (y) {
          const Y = y.data[S];
          if (w) {
            if (Y > 128) return !1;
          } else if (Y < 128) return !1;
        }
        const P = Le(R, C, W, T);
        return P >= g && P <= m;
      };
      k = i;
      let U = (A * x + k) * 4;
      for (; i < M && !L(U) && (i++, !(i >= M)); )
        U = (A * x + i) * 4;
      if (i >= M) break;
      for (k = i; i < M && (U = (A * x + i) * 4, !!L(U)); )
        i++;
      const I = i - k;
      if (I > 1) {
        const S = [];
        for (let R = 0; R < I; R++) {
          const C = (A * x + (k + R)) * 4, W = o[C], P = o[C + 1], G = o[C + 2], Y = o[C + 3];
          S.push({ r: W, g: P, b: G, a: Y, val: Le(W, P, G, a) });
        }
        S.sort((R, C) => _ ? C.val - R.val : R.val - C.val);
        for (let R = 0; R < I; R++) {
          const C = (A * x + (k + R)) * 4;
          o[C] = S[R].r, o[C + 1] = S[R].g, o[C + 2] = S[R].b, o[C + 3] = S[R].a;
        }
      }
    }
  }
  return new ImageData(o, x, h);
};
var ne = { exports: {} }, z = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function mr() {
  if (Fe) return z;
  Fe = 1;
  var c = $e, b = Symbol.for("react.element"), y = Symbol.for("react.fragment"), x = Object.prototype.hasOwnProperty, h = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(a, f, g) {
    var m, _ = {}, w = null, T = null;
    g !== void 0 && (w = "" + g), f.key !== void 0 && (w = "" + f.key), f.ref !== void 0 && (T = f.ref);
    for (m in f) x.call(f, m) && !p.hasOwnProperty(m) && (_[m] = f[m]);
    if (a && a.defaultProps) for (m in f = a.defaultProps, f) _[m] === void 0 && (_[m] = f[m]);
    return { $$typeof: b, type: a, key: w, ref: T, props: _, _owner: h.current };
  }
  return z.Fragment = y, z.jsx = o, z.jsxs = o, z;
}
var X = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ue;
function br() {
  return Ue || (Ue = 1, process.env.NODE_ENV !== "production" && function() {
    var c = $e, b = Symbol.for("react.element"), y = Symbol.for("react.portal"), x = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), a = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), T = Symbol.for("react.offscreen"), N = Symbol.iterator, M = "@@iterator";
    function A(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = N && e[N] || e[M];
      return typeof r == "function" ? r : null;
    }
    var k = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function i(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++)
          t[s - 1] = arguments[s];
        L("error", e, t);
      }
    }
    function L(e, r, t) {
      {
        var s = k.ReactDebugCurrentFrame, d = s.getStackAddendum();
        d !== "" && (r += "%s", t = t.concat([d]));
        var v = t.map(function(u) {
          return String(u);
        });
        v.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, v);
      }
    }
    var U = !1, I = !1, S = !1, R = !1, C = !1, W;
    W = Symbol.for("react.module.reference");
    function P(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === x || e === p || C || e === h || e === g || e === m || R || e === T || U || I || S || typeof e == "object" && e !== null && (e.$$typeof === w || e.$$typeof === _ || e.$$typeof === o || e.$$typeof === a || e.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === W || e.getModuleId !== void 0));
    }
    function G(e, r, t) {
      var s = e.displayName;
      if (s)
        return s;
      var d = r.displayName || r.name || "";
      return d !== "" ? t + "(" + d + ")" : t;
    }
    function Y(e) {
      return e.displayName || "Context";
    }
    function $(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && i("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case x:
          return "Fragment";
        case y:
          return "Portal";
        case p:
          return "Profiler";
        case h:
          return "StrictMode";
        case g:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case a:
            var r = e;
            return Y(r) + ".Consumer";
          case o:
            var t = e;
            return Y(t._context) + ".Provider";
          case f:
            return G(e, e.render, "ForwardRef");
          case _:
            var s = e.displayName || null;
            return s !== null ? s : $(e.type) || "Memo";
          case w: {
            var d = e, v = d._payload, u = d._init;
            try {
              return $(u(v));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var V = Object.assign, H = 0, he, pe, ge, me, be, xe, ye;
    function Re() {
    }
    Re.__reactDisabledLog = !0;
    function Ye() {
      {
        if (H === 0) {
          he = console.log, pe = console.info, ge = console.warn, me = console.error, be = console.group, xe = console.groupCollapsed, ye = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Re,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        H++;
      }
    }
    function Ve() {
      {
        if (H--, H === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: V({}, e, {
              value: he
            }),
            info: V({}, e, {
              value: pe
            }),
            warn: V({}, e, {
              value: ge
            }),
            error: V({}, e, {
              value: me
            }),
            group: V({}, e, {
              value: be
            }),
            groupCollapsed: V({}, e, {
              value: xe
            }),
            groupEnd: V({}, e, {
              value: ye
            })
          });
        }
        H < 0 && i("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ae = k.ReactCurrentDispatcher, se;
    function Z(e, r, t) {
      {
        if (se === void 0)
          try {
            throw Error();
          } catch (d) {
            var s = d.stack.trim().match(/\n( *(at )?)/);
            se = s && s[1] || "";
          }
        return `
` + se + e;
      }
    }
    var oe = !1, Q;
    {
      var Be = typeof WeakMap == "function" ? WeakMap : Map;
      Q = new Be();
    }
    function je(e, r) {
      if (!e || oe)
        return "";
      {
        var t = Q.get(e);
        if (t !== void 0)
          return t;
      }
      var s;
      oe = !0;
      var d = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var v;
      v = ae.current, ae.current = null, Ye();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (D) {
              s = D;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (D) {
              s = D;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (D) {
            s = D;
          }
          e();
        }
      } catch (D) {
        if (D && s && typeof D.stack == "string") {
          for (var l = D.stack.split(`
`), O = s.stack.split(`
`), j = l.length - 1, E = O.length - 1; j >= 1 && E >= 0 && l[j] !== O[E]; )
            E--;
          for (; j >= 1 && E >= 0; j--, E--)
            if (l[j] !== O[E]) {
              if (j !== 1 || E !== 1)
                do
                  if (j--, E--, E < 0 || l[j] !== O[E]) {
                    var F = `
` + l[j].replace(" at new ", " at ");
                    return e.displayName && F.includes("<anonymous>") && (F = F.replace("<anonymous>", e.displayName)), typeof e == "function" && Q.set(e, F), F;
                  }
                while (j >= 1 && E >= 0);
              break;
            }
        }
      } finally {
        oe = !1, ae.current = v, Ve(), Error.prepareStackTrace = d;
      }
      var J = e ? e.displayName || e.name : "", B = J ? Z(J) : "";
      return typeof e == "function" && Q.set(e, B), B;
    }
    function qe(e, r, t) {
      return je(e, !1);
    }
    function Je(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ee(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return je(e, Je(e));
      if (typeof e == "string")
        return Z(e);
      switch (e) {
        case g:
          return Z("Suspense");
        case m:
          return Z("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            return qe(e.render);
          case _:
            return ee(e.type, r, t);
          case w: {
            var s = e, d = s._payload, v = s._init;
            try {
              return ee(v(d), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var K = Object.prototype.hasOwnProperty, Ee = {}, _e = k.ReactDebugCurrentFrame;
    function re(e) {
      if (e) {
        var r = e._owner, t = ee(e.type, e._source, r ? r.type : null);
        _e.setExtraStackFrame(t);
      } else
        _e.setExtraStackFrame(null);
    }
    function Ge(e, r, t, s, d) {
      {
        var v = Function.call.bind(K);
        for (var u in e)
          if (v(e, u)) {
            var l = void 0;
            try {
              if (typeof e[u] != "function") {
                var O = Error((s || "React class") + ": " + t + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              l = e[u](r, u, s, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (j) {
              l = j;
            }
            l && !(l instanceof Error) && (re(d), i("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", s || "React class", t, u, typeof l), re(null)), l instanceof Error && !(l.message in Ee) && (Ee[l.message] = !0, re(d), i("Failed %s type: %s", t, l.message), re(null));
          }
      }
    }
    var He = Array.isArray;
    function ie(e) {
      return He(e);
    }
    function Ke(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function ze(e) {
      try {
        return Ce(e), !1;
      } catch {
        return !0;
      }
    }
    function Ce(e) {
      return "" + e;
    }
    function we(e) {
      if (ze(e))
        return i("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), Ce(e);
    }
    var ke = k.ReactCurrentOwner, Xe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Te, Se;
    function Ze(e) {
      if (K.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Qe(e) {
      if (K.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function er(e, r) {
      typeof e.ref == "string" && ke.current;
    }
    function rr(e, r) {
      {
        var t = function() {
          Te || (Te = !0, i("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function tr(e, r) {
      {
        var t = function() {
          Se || (Se = !0, i("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var nr = function(e, r, t, s, d, v, u) {
      var l = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: b,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: u,
        // Record the component responsible for creating this element.
        _owner: v
      };
      return l._store = {}, Object.defineProperty(l._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(l, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.defineProperty(l, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.freeze && (Object.freeze(l.props), Object.freeze(l)), l;
    };
    function ar(e, r, t, s, d) {
      {
        var v, u = {}, l = null, O = null;
        t !== void 0 && (we(t), l = "" + t), Qe(r) && (we(r.key), l = "" + r.key), Ze(r) && (O = r.ref, er(r, d));
        for (v in r)
          K.call(r, v) && !Xe.hasOwnProperty(v) && (u[v] = r[v]);
        if (e && e.defaultProps) {
          var j = e.defaultProps;
          for (v in j)
            u[v] === void 0 && (u[v] = j[v]);
        }
        if (l || O) {
          var E = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          l && rr(u, E), O && tr(u, E);
        }
        return nr(e, l, O, d, s, ke.current, u);
      }
    }
    var le = k.ReactCurrentOwner, Oe = k.ReactDebugCurrentFrame;
    function q(e) {
      if (e) {
        var r = e._owner, t = ee(e.type, e._source, r ? r.type : null);
        Oe.setExtraStackFrame(t);
      } else
        Oe.setExtraStackFrame(null);
    }
    var ce;
    ce = !1;
    function ue(e) {
      return typeof e == "object" && e !== null && e.$$typeof === b;
    }
    function Pe() {
      {
        if (le.current) {
          var e = $(le.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function sr(e) {
      return "";
    }
    var De = {};
    function or(e) {
      {
        var r = Pe();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ne(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = or(r);
        if (De[t])
          return;
        De[t] = !0;
        var s = "";
        e && e._owner && e._owner !== le.current && (s = " It was passed a child from " + $(e._owner.type) + "."), q(e), i('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, s), q(null);
      }
    }
    function Me(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ie(e))
          for (var t = 0; t < e.length; t++) {
            var s = e[t];
            ue(s) && Ne(s, r);
          }
        else if (ue(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var d = A(e);
          if (typeof d == "function" && d !== e.entries)
            for (var v = d.call(e), u; !(u = v.next()).done; )
              ue(u.value) && Ne(u.value, r);
        }
      }
    }
    function ir(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === _))
          t = r.propTypes;
        else
          return;
        if (t) {
          var s = $(r);
          Ge(t, e.props, "prop", s, e);
        } else if (r.PropTypes !== void 0 && !ce) {
          ce = !0;
          var d = $(r);
          i("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", d || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && i("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function lr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var s = r[t];
          if (s !== "children" && s !== "key") {
            q(e), i("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", s), q(null);
            break;
          }
        }
        e.ref !== null && (q(e), i("Invalid attribute `ref` supplied to `React.Fragment`."), q(null));
      }
    }
    var Ie = {};
    function Ae(e, r, t, s, d, v) {
      {
        var u = P(e);
        if (!u) {
          var l = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = sr();
          O ? l += O : l += Pe();
          var j;
          e === null ? j = "null" : ie(e) ? j = "array" : e !== void 0 && e.$$typeof === b ? (j = "<" + ($(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : j = typeof e, i("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", j, l);
        }
        var E = ar(e, r, t, d, v);
        if (E == null)
          return E;
        if (u) {
          var F = r.children;
          if (F !== void 0)
            if (s)
              if (ie(F)) {
                for (var J = 0; J < F.length; J++)
                  Me(F[J], e);
                Object.freeze && Object.freeze(F);
              } else
                i("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Me(F, e);
        }
        if (K.call(r, "key")) {
          var B = $(e), D = Object.keys(r).filter(function(hr) {
            return hr !== "key";
          }), fe = D.length > 0 ? "{key: someKey, " + D.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ie[B + fe]) {
            var vr = D.length > 0 ? "{" + D.join(": ..., ") + ": ...}" : "{}";
            i(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, fe, B, vr, B), Ie[B + fe] = !0;
          }
        }
        return e === x ? lr(E) : ir(E), E;
      }
    }
    function cr(e, r, t) {
      return Ae(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Ae(e, r, t, !1);
    }
    var fr = ur, dr = cr;
    X.Fragment = x, X.jsx = fr, X.jsxs = dr;
  }()), X;
}
var We;
function xr() {
  return We || (We = 1, process.env.NODE_ENV === "production" ? ne.exports = mr() : ne.exports = br()), ne.exports;
}
var n = xr();
const Rr = ({
  options: c,
  onChange: b,
  onExport: y,
  onReset: x,
  onSelectMask: h,
  hasMask: p
}) => {
  const o = (a, f) => {
    b({ ...c, [a]: f });
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "controls-container", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "control-group", children: [
      /* @__PURE__ */ n.jsx("label", { children: "Sorting Mode" }),
      /* @__PURE__ */ n.jsxs(
        "select",
        {
          value: c.mode,
          onChange: (a) => o("mode", a.target.value),
          children: [
            /* @__PURE__ */ n.jsx("option", { value: "brightness", children: "Brightness" }),
            /* @__PURE__ */ n.jsx("option", { value: "hue", children: "Hue" }),
            /* @__PURE__ */ n.jsx("option", { value: "saturation", children: "Saturation" }),
            /* @__PURE__ */ n.jsx("option", { value: "red", children: "Red Channel" }),
            /* @__PURE__ */ n.jsx("option", { value: "green", children: "Green Channel" }),
            /* @__PURE__ */ n.jsx("option", { value: "blue", children: "Blue Channel" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "control-group", children: [
      /* @__PURE__ */ n.jsx("label", { children: "Threshold Mode" }),
      /* @__PURE__ */ n.jsxs(
        "select",
        {
          value: c.thresholdMode,
          onChange: (a) => o("thresholdMode", a.target.value),
          children: [
            /* @__PURE__ */ n.jsx("option", { value: "none", children: "Same as Sorting Mode" }),
            /* @__PURE__ */ n.jsx("option", { value: "brightness", children: "Brightness" }),
            /* @__PURE__ */ n.jsx("option", { value: "hue", children: "Hue" }),
            /* @__PURE__ */ n.jsx("option", { value: "saturation", children: "Saturation" }),
            /* @__PURE__ */ n.jsx("option", { value: "red", children: "Red Channel" }),
            /* @__PURE__ */ n.jsx("option", { value: "green", children: "Green Channel" }),
            /* @__PURE__ */ n.jsx("option", { value: "blue", children: "Blue Channel" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "control-group", children: [
      /* @__PURE__ */ n.jsxs("label", { children: [
        "Angle (",
        c.angle,
        "°)"
      ] }),
      /* @__PURE__ */ n.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "360",
          value: c.angle,
          onChange: (a) => o("angle", Number(a.target.value))
        }
      )
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "control-group", children: [
      /* @__PURE__ */ n.jsxs("label", { children: [
        "Threshold Lower (",
        c.thresholdLower,
        ")"
      ] }),
      /* @__PURE__ */ n.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "255",
          value: c.thresholdLower,
          onChange: (a) => o("thresholdLower", Number(a.target.value))
        }
      )
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "control-group", children: [
      /* @__PURE__ */ n.jsxs("label", { children: [
        "Threshold Upper (",
        c.thresholdUpper,
        ")"
      ] }),
      /* @__PURE__ */ n.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "255",
          value: c.thresholdUpper,
          onChange: (a) => o("thresholdUpper", Number(a.target.value))
        }
      )
    ] }),
    /* @__PURE__ */ n.jsx("div", { className: "control-group checkbox-group", children: /* @__PURE__ */ n.jsxs("label", { children: [
      /* @__PURE__ */ n.jsx(
        "input",
        {
          type: "checkbox",
          checked: c.reverse,
          onChange: (a) => o("reverse", a.target.checked)
        }
      ),
      "Reverse Sort"
    ] }) }),
    /* @__PURE__ */ n.jsxs("div", { className: "control-section", children: [
      /* @__PURE__ */ n.jsx("label", { className: "section-label", children: "Masking" }),
      /* @__PURE__ */ n.jsx("button", { className: "btn-secondary", onClick: h, children: p ? "Update Mask from Selection" : "Use Selection as Mask" }),
      p && /* @__PURE__ */ n.jsx("div", { className: "control-group checkbox-group", style: { marginTop: "8px" }, children: /* @__PURE__ */ n.jsxs("label", { children: [
        /* @__PURE__ */ n.jsx(
          "input",
          {
            type: "checkbox",
            checked: c.invertMask,
            onChange: (a) => o("invertMask", a.target.checked)
          }
        ),
        "Invert Mask"
      ] }) })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "actions", children: [
      /* @__PURE__ */ n.jsx("button", { className: "btn-secondary", onClick: x, children: "Reset Image" }),
      /* @__PURE__ */ n.jsx("button", { className: "btn-primary", onClick: y, children: "Apply to Canvas" })
    ] })
  ] });
}, jr = ({
  imageFile: c,
  maskFile: b,
  options: y,
  isProcessing: x,
  onProcessingChange: h
}) => {
  const p = pr(null), [o, a] = ve(null), [f, g] = ve(null);
  return de(() => {
    if (!c) return;
    const m = new Image();
    m.onload = () => {
      a(m);
    }, m.src = URL.createObjectURL(c);
  }, [c]), de(() => {
    if (!b) {
      g(null);
      return;
    }
    const m = new Image(), _ = URL.createObjectURL(b);
    return m.onload = () => {
      g(m);
    }, m.src = _, () => {
      URL.revokeObjectURL(_);
    };
  }, [b]), de(() => {
    if (!o || !p.current) return;
    (async () => {
      h(!0), setTimeout(() => {
        const _ = p.current, w = _.getContext("2d", { willReadFrequently: !0 }), T = o.naturalWidth, N = o.naturalHeight;
        _.width = T, _.height = N;
        const M = y.angle * Math.PI / 180, A = Math.abs(Math.cos(M)), k = Math.abs(Math.sin(M)), i = Math.ceil(T * A + N * k), L = Math.ceil(T * k + N * A), U = document.createElement("canvas");
        U.width = i, U.height = L;
        const I = U.getContext("2d", { willReadFrequently: !0 });
        I.save(), I.translate(i / 2, L / 2), I.rotate(M), I.drawImage(o, -T / 2, -N / 2), I.restore();
        const S = I.getImageData(0, 0, i, L);
        let R;
        if (f) {
          const W = document.createElement("canvas");
          W.width = i, W.height = L;
          const P = W.getContext("2d", { willReadFrequently: !0 });
          P.save(), P.translate(i / 2, L / 2), P.rotate(M), P.drawImage(f, -T / 2, -N / 2, T, N), P.restore(), R = P.getImageData(0, 0, i, L);
        }
        const C = gr(S, y, R);
        I.putImageData(C, 0, 0), w.save(), w.clearRect(0, 0, T, N), w.translate(T / 2, N / 2), w.rotate(-M), w.drawImage(U, -i / 2, -L / 2), w.restore(), h(!1);
      }, 10);
    })();
  }, [y, o, f, h]), c ? /* @__PURE__ */ n.jsxs("div", { className: "canvas-container", children: [
    /* @__PURE__ */ n.jsx(
      "canvas",
      {
        ref: p,
        className: "editor-canvas"
      }
    ),
    x && /* @__PURE__ */ n.jsxs("div", { className: "processing-overlay", children: [
      /* @__PURE__ */ n.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ n.jsx("span", { children: "Sorting Pixels..." })
    ] })
  ] }) : null;
}, Er = ({ sidebar: c, content: b }) => /* @__PURE__ */ n.jsxs("div", { className: "app-layout", children: [
  /* @__PURE__ */ n.jsxs("aside", { className: "sidebar", children: [
    /* @__PURE__ */ n.jsx("div", { className: "sidebar-header", children: /* @__PURE__ */ n.jsx("h1", { children: "Pixel Sorter" }) }),
    /* @__PURE__ */ n.jsx("div", { className: "sidebar-content", children: c })
  ] }),
  /* @__PURE__ */ n.jsx("main", { className: "main-content", children: b })
] }), _r = ({ onImageUpload: c }) => {
  const [b, y] = ve(!1), x = te((a) => {
    a.preventDefault(), y(!0);
  }, []), h = te((a) => {
    a.preventDefault(), y(!1);
  }, []), p = te((a) => {
    a.preventDefault(), y(!1), a.dataTransfer.files && a.dataTransfer.files[0] && c(a.dataTransfer.files[0]);
  }, [c]), o = te((a) => {
    a.target.files && a.target.files[0] && c(a.target.files[0]);
  }, [c]);
  return /* @__PURE__ */ n.jsx(
    "div",
    {
      className: `image-uploader ${b ? "dragging" : ""}`,
      onDragOver: x,
      onDragLeave: h,
      onDrop: p,
      children: /* @__PURE__ */ n.jsxs("div", { className: "upload-content", children: [
        /* @__PURE__ */ n.jsxs("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ n.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
          /* @__PURE__ */ n.jsx("polyline", { points: "17 8 12 3 7 8" }),
          /* @__PURE__ */ n.jsx("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
        ] }),
        /* @__PURE__ */ n.jsx("p", { children: "Drag & drop an image here, or click to select" }),
        /* @__PURE__ */ n.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            onChange: o,
            className: "file-input"
          }
        )
      ] })
    }
  );
};
export {
  jr as CanvasEditor,
  Rr as Controls,
  _r as ImageUploader,
  Er as Layout,
  gr as sortPixels
};
