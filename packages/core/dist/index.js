import $e, { useRef as pr, useState as ae, useEffect as ve, useCallback as te } from "react";
const Le = (l, y, E, R) => {
  switch (R) {
    case "brightness":
      return (l + y + E) / 3;
    case "red":
      return l;
    case "green":
      return y;
    case "blue":
      return E;
    case "hue": {
      const g = l / 255, m = y / 255, i = E / 255, a = Math.max(g, m, i), u = Math.min(g, m, i);
      let b = 0;
      return a === u ? b = 0 : a === g ? b = (m - i) / (a - u) : a === m ? b = 2 + (i - g) / (a - u) : b = 4 + (g - m) / (a - u), b *= 60, b < 0 && (b += 360), b;
    }
    case "saturation": {
      const g = l / 255, m = y / 255, i = E / 255, a = Math.max(g, m, i), u = Math.min(g, m, i);
      let b = 0;
      return a === 0 ? b = 0 : b = (a - u) / a, b * 100;
    }
    default:
      return 0;
  }
}, gr = (l, y, E) => {
  const { width: R, height: g, data: m } = l, i = new Uint8ClampedArray(m), { mode: a, thresholdMode: u, thresholdLower: b, thresholdUpper: k, reverse: A, invertMask: j } = y, O = u === "none" ? a : u, P = g, C = R;
  for (let x = 0; x < P; x++) {
    let p = 0, f = 0;
    for (; f < C; ) {
      const V = (T) => {
        const h = i[T], S = i[T + 1], W = i[T + 2];
        if (E) {
          const M = E.data[T];
          if (j) {
            if (M > 128) return !1;
          } else if (M < 128) return !1;
        }
        const U = Le(h, S, W, O);
        return U >= b && U <= k;
      };
      p = f;
      let N = (x * R + p) * 4;
      for (; f < C && !V(N) && (f++, !(f >= C)); )
        N = (x * R + f) * 4;
      if (f >= C) break;
      for (p = f; f < C && (N = (x * R + f) * 4, !!V(N)); )
        f++;
      const L = f - p;
      if (L > 1) {
        const T = [];
        for (let h = 0; h < L; h++) {
          const S = (x * R + (p + h)) * 4, W = i[S], U = i[S + 1], $ = i[S + 2], M = i[S + 3];
          T.push({ r: W, g: U, b: $, a: M, val: Le(W, U, $, a) });
        }
        T.sort((h, S) => A ? S.val - h.val : h.val - S.val);
        for (let h = 0; h < L; h++) {
          const S = (x * R + (p + h)) * 4;
          i[S] = T[h].r, i[S + 1] = T[h].g, i[S + 2] = T[h].b, i[S + 3] = T[h].a;
        }
      }
    }
  }
  return new ImageData(i, R, g);
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
  var l = $e, y = Symbol.for("react.element"), E = Symbol.for("react.fragment"), R = Object.prototype.hasOwnProperty, g = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(a, u, b) {
    var k, A = {}, j = null, O = null;
    b !== void 0 && (j = "" + b), u.key !== void 0 && (j = "" + u.key), u.ref !== void 0 && (O = u.ref);
    for (k in u) R.call(u, k) && !m.hasOwnProperty(k) && (A[k] = u[k]);
    if (a && a.defaultProps) for (k in u = a.defaultProps, u) A[k] === void 0 && (A[k] = u[k]);
    return { $$typeof: y, type: a, key: j, ref: O, props: A, _owner: g.current };
  }
  return z.Fragment = E, z.jsx = i, z.jsxs = i, z;
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
var We;
function br() {
  return We || (We = 1, process.env.NODE_ENV !== "production" && (function() {
    var l = $e, y = Symbol.for("react.element"), E = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), k = Symbol.for("react.suspense_list"), A = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), O = Symbol.for("react.offscreen"), P = Symbol.iterator, C = "@@iterator";
    function x(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = P && e[P] || e[C];
      return typeof r == "function" ? r : null;
    }
    var p = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function f(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++)
          t[s - 1] = arguments[s];
        V("error", e, t);
      }
    }
    function V(e, r, t) {
      {
        var s = p.ReactDebugCurrentFrame, d = s.getStackAddendum();
        d !== "" && (r += "%s", t = t.concat([d]));
        var v = t.map(function(c) {
          return String(c);
        });
        v.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, v);
      }
    }
    var N = !1, L = !1, T = !1, h = !1, S = !1, W;
    W = Symbol.for("react.module.reference");
    function U(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === R || e === m || S || e === g || e === b || e === k || h || e === O || N || L || T || typeof e == "object" && e !== null && (e.$$typeof === j || e.$$typeof === A || e.$$typeof === i || e.$$typeof === a || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === W || e.getModuleId !== void 0));
    }
    function $(e, r, t) {
      var s = e.displayName;
      if (s)
        return s;
      var d = r.displayName || r.name || "";
      return d !== "" ? t + "(" + d + ")" : t;
    }
    function M(e) {
      return e.displayName || "Context";
    }
    function Y(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case R:
          return "Fragment";
        case E:
          return "Portal";
        case m:
          return "Profiler";
        case g:
          return "StrictMode";
        case b:
          return "Suspense";
        case k:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case a:
            var r = e;
            return M(r) + ".Consumer";
          case i:
            var t = e;
            return M(t._context) + ".Provider";
          case u:
            return $(e, e.render, "ForwardRef");
          case A:
            var s = e.displayName || null;
            return s !== null ? s : Y(e.type) || "Memo";
          case j: {
            var d = e, v = d._payload, c = d._init;
            try {
              return Y(c(v));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var B = Object.assign, G = 0, he, pe, ge, me, be, xe, ye;
    function Re() {
    }
    Re.__reactDisabledLog = !0;
    function Ye() {
      {
        if (G === 0) {
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
        G++;
      }
    }
    function Ve() {
      {
        if (G--, G === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: B({}, e, {
              value: he
            }),
            info: B({}, e, {
              value: pe
            }),
            warn: B({}, e, {
              value: ge
            }),
            error: B({}, e, {
              value: me
            }),
            group: B({}, e, {
              value: be
            }),
            groupCollapsed: B({}, e, {
              value: xe
            }),
            groupEnd: B({}, e, {
              value: ye
            })
          });
        }
        G < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var se = p.ReactCurrentDispatcher, ie;
    function Z(e, r, t) {
      {
        if (ie === void 0)
          try {
            throw Error();
          } catch (d) {
            var s = d.stack.trim().match(/\n( *(at )?)/);
            ie = s && s[1] || "";
          }
        return `
` + ie + e;
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
      v = se.current, se.current = null, Ye();
      try {
        if (r) {
          var c = function() {
            throw Error();
          };
          if (Object.defineProperty(c.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(c, []);
            } catch (I) {
              s = I;
            }
            Reflect.construct(e, [], c);
          } else {
            try {
              c.call();
            } catch (I) {
              s = I;
            }
            e.call(c.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (I) {
            s = I;
          }
          e();
        }
      } catch (I) {
        if (I && s && typeof I.stack == "string") {
          for (var o = I.stack.split(`
`), D = s.stack.split(`
`), _ = o.length - 1, w = D.length - 1; _ >= 1 && w >= 0 && o[_] !== D[w]; )
            w--;
          for (; _ >= 1 && w >= 0; _--, w--)
            if (o[_] !== D[w]) {
              if (_ !== 1 || w !== 1)
                do
                  if (_--, w--, w < 0 || o[_] !== D[w]) {
                    var F = `
` + o[_].replace(" at new ", " at ");
                    return e.displayName && F.includes("<anonymous>") && (F = F.replace("<anonymous>", e.displayName)), typeof e == "function" && Q.set(e, F), F;
                  }
                while (_ >= 1 && w >= 0);
              break;
            }
        }
      } finally {
        oe = !1, se.current = v, Ve(), Error.prepareStackTrace = d;
      }
      var J = e ? e.displayName || e.name : "", q = J ? Z(J) : "";
      return typeof e == "function" && Q.set(e, q), q;
    }
    function qe(e, r, t) {
      return je(e, !1);
    }
    function He(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ee(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return je(e, He(e));
      if (typeof e == "string")
        return Z(e);
      switch (e) {
        case b:
          return Z("Suspense");
        case k:
          return Z("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return qe(e.render);
          case A:
            return ee(e.type, r, t);
          case j: {
            var s = e, d = s._payload, v = s._init;
            try {
              return ee(v(d), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var K = Object.prototype.hasOwnProperty, Ee = {}, _e = p.ReactDebugCurrentFrame;
    function re(e) {
      if (e) {
        var r = e._owner, t = ee(e.type, e._source, r ? r.type : null);
        _e.setExtraStackFrame(t);
      } else
        _e.setExtraStackFrame(null);
    }
    function Je(e, r, t, s, d) {
      {
        var v = Function.call.bind(K);
        for (var c in e)
          if (v(e, c)) {
            var o = void 0;
            try {
              if (typeof e[c] != "function") {
                var D = Error((s || "React class") + ": " + t + " type `" + c + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[c] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw D.name = "Invariant Violation", D;
              }
              o = e[c](r, c, s, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_) {
              o = _;
            }
            o && !(o instanceof Error) && (re(d), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", s || "React class", t, c, typeof o), re(null)), o instanceof Error && !(o.message in Ee) && (Ee[o.message] = !0, re(d), f("Failed %s type: %s", t, o.message), re(null));
          }
      }
    }
    var Ge = Array.isArray;
    function le(e) {
      return Ge(e);
    }
    function Ke(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function ze(e) {
      try {
        return we(e), !1;
      } catch {
        return !0;
      }
    }
    function we(e) {
      return "" + e;
    }
    function Ce(e) {
      if (ze(e))
        return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), we(e);
    }
    var ke = p.ReactCurrentOwner, Xe = {
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
          Te || (Te = !0, f("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
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
          Se || (Se = !0, f("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var nr = function(e, r, t, s, d, v, c) {
      var o = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: y,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: c,
        // Record the component responsible for creating this element.
        _owner: v
      };
      return o._store = {}, Object.defineProperty(o._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(o, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.defineProperty(o, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.freeze && (Object.freeze(o.props), Object.freeze(o)), o;
    };
    function ar(e, r, t, s, d) {
      {
        var v, c = {}, o = null, D = null;
        t !== void 0 && (Ce(t), o = "" + t), Qe(r) && (Ce(r.key), o = "" + r.key), Ze(r) && (D = r.ref, er(r, d));
        for (v in r)
          K.call(r, v) && !Xe.hasOwnProperty(v) && (c[v] = r[v]);
        if (e && e.defaultProps) {
          var _ = e.defaultProps;
          for (v in _)
            c[v] === void 0 && (c[v] = _[v]);
        }
        if (o || D) {
          var w = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          o && rr(c, w), D && tr(c, w);
        }
        return nr(e, o, D, d, s, ke.current, c);
      }
    }
    var ce = p.ReactCurrentOwner, Oe = p.ReactDebugCurrentFrame;
    function H(e) {
      if (e) {
        var r = e._owner, t = ee(e.type, e._source, r ? r.type : null);
        Oe.setExtraStackFrame(t);
      } else
        Oe.setExtraStackFrame(null);
    }
    var ue;
    ue = !1;
    function fe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === y;
    }
    function Pe() {
      {
        if (ce.current) {
          var e = Y(ce.current.type);
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
    function ir(e) {
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
        var t = ir(r);
        if (De[t])
          return;
        De[t] = !0;
        var s = "";
        e && e._owner && e._owner !== ce.current && (s = " It was passed a child from " + Y(e._owner.type) + "."), H(e), f('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, s), H(null);
      }
    }
    function Me(e, r) {
      {
        if (typeof e != "object")
          return;
        if (le(e))
          for (var t = 0; t < e.length; t++) {
            var s = e[t];
            fe(s) && Ne(s, r);
          }
        else if (fe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var d = x(e);
          if (typeof d == "function" && d !== e.entries)
            for (var v = d.call(e), c; !(c = v.next()).done; )
              fe(c.value) && Ne(c.value, r);
        }
      }
    }
    function or(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === A))
          t = r.propTypes;
        else
          return;
        if (t) {
          var s = Y(r);
          Je(t, e.props, "prop", s, e);
        } else if (r.PropTypes !== void 0 && !ue) {
          ue = !0;
          var d = Y(r);
          f("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", d || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && f("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function lr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var s = r[t];
          if (s !== "children" && s !== "key") {
            H(e), f("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", s), H(null);
            break;
          }
        }
        e.ref !== null && (H(e), f("Invalid attribute `ref` supplied to `React.Fragment`."), H(null));
      }
    }
    var Ie = {};
    function Ae(e, r, t, s, d, v) {
      {
        var c = U(e);
        if (!c) {
          var o = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var D = sr();
          D ? o += D : o += Pe();
          var _;
          e === null ? _ = "null" : le(e) ? _ = "array" : e !== void 0 && e.$$typeof === y ? (_ = "<" + (Y(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : _ = typeof e, f("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _, o);
        }
        var w = ar(e, r, t, d, v);
        if (w == null)
          return w;
        if (c) {
          var F = r.children;
          if (F !== void 0)
            if (s)
              if (le(F)) {
                for (var J = 0; J < F.length; J++)
                  Me(F[J], e);
                Object.freeze && Object.freeze(F);
              } else
                f("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Me(F, e);
        }
        if (K.call(r, "key")) {
          var q = Y(e), I = Object.keys(r).filter(function(hr) {
            return hr !== "key";
          }), de = I.length > 0 ? "{key: someKey, " + I.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ie[q + de]) {
            var vr = I.length > 0 ? "{" + I.join(": ..., ") + ": ...}" : "{}";
            f(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, de, q, vr, q), Ie[q + de] = !0;
          }
        }
        return e === R ? lr(w) : or(w), w;
      }
    }
    function cr(e, r, t) {
      return Ae(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Ae(e, r, t, !1);
    }
    var fr = ur, dr = cr;
    X.Fragment = R, X.jsx = fr, X.jsxs = dr;
  })()), X;
}
var Ue;
function xr() {
  return Ue || (Ue = 1, process.env.NODE_ENV === "production" ? ne.exports = mr() : ne.exports = br()), ne.exports;
}
var n = xr();
const Rr = ({
  options: l,
  onChange: y,
  onExport: E,
  onReset: R,
  onSelectMask: g,
  hasMask: m
}) => {
  const i = (a, u) => {
    y({ ...l, [a]: u });
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "controls-container", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "control-group", children: [
      /* @__PURE__ */ n.jsx("label", { children: "Sorting Mode" }),
      /* @__PURE__ */ n.jsxs(
        "select",
        {
          value: l.mode,
          onChange: (a) => i("mode", a.target.value),
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
          value: l.thresholdMode,
          onChange: (a) => i("thresholdMode", a.target.value),
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
        l.angle,
        "°)"
      ] }),
      /* @__PURE__ */ n.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "360",
          value: l.angle,
          onChange: (a) => i("angle", Number(a.target.value))
        }
      )
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "control-group", children: [
      /* @__PURE__ */ n.jsxs("label", { children: [
        "Threshold Lower (",
        l.thresholdLower,
        ")"
      ] }),
      /* @__PURE__ */ n.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "255",
          value: l.thresholdLower,
          onChange: (a) => i("thresholdLower", Number(a.target.value))
        }
      )
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "control-group", children: [
      /* @__PURE__ */ n.jsxs("label", { children: [
        "Threshold Upper (",
        l.thresholdUpper,
        ")"
      ] }),
      /* @__PURE__ */ n.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "255",
          value: l.thresholdUpper,
          onChange: (a) => i("thresholdUpper", Number(a.target.value))
        }
      )
    ] }),
    /* @__PURE__ */ n.jsx("div", { className: "control-group checkbox-group", children: /* @__PURE__ */ n.jsxs("label", { children: [
      /* @__PURE__ */ n.jsx(
        "input",
        {
          type: "checkbox",
          checked: l.reverse,
          onChange: (a) => i("reverse", a.target.checked)
        }
      ),
      "Reverse Sort"
    ] }) }),
    /* @__PURE__ */ n.jsxs("div", { className: "control-section", children: [
      /* @__PURE__ */ n.jsx("label", { className: "section-label", children: "Masking" }),
      /* @__PURE__ */ n.jsx("button", { className: "btn-secondary", onClick: g, children: m ? "Update Mask from Selection" : "Use Selection as Mask" }),
      m && /* @__PURE__ */ n.jsx("div", { className: "control-group checkbox-group", style: { marginTop: "8px" }, children: /* @__PURE__ */ n.jsxs("label", { children: [
        /* @__PURE__ */ n.jsx(
          "input",
          {
            type: "checkbox",
            checked: l.invertMask,
            onChange: (a) => i("invertMask", a.target.checked)
          }
        ),
        "Invert Mask"
      ] }) })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "actions", children: [
      /* @__PURE__ */ n.jsx("button", { className: "btn-secondary", onClick: R, children: "Reset Image" }),
      /* @__PURE__ */ n.jsx("button", { className: "btn-primary", onClick: E, children: "Apply to Canvas" })
    ] })
  ] });
}, jr = ({
  imageFile: l,
  maskFile: y,
  options: E,
  isProcessing: R,
  onProcessingChange: g
}) => {
  const m = pr(null), [i, a] = ae(null), [u, b] = ae(null), [k, A] = ae({ width: 0, height: 0 });
  return ve(() => {
    if (!l) return;
    const j = new Image();
    j.onload = () => {
      a(j);
      const O = j.naturalWidth / j.naturalHeight, P = window.innerWidth - 360, C = window.innerHeight - 40;
      let x = j.naturalWidth, p = j.naturalHeight;
      x > P && (x = P, p = x / O), p > C && (p = C, x = p * O), A({ width: x, height: p });
    }, j.src = URL.createObjectURL(l);
  }, [l]), ve(() => {
    if (!y) {
      b(null);
      return;
    }
    const j = new Image(), O = URL.createObjectURL(y);
    return j.onload = () => {
      b(j);
    }, j.src = O, () => {
      URL.revokeObjectURL(O);
    };
  }, [y]), ve(() => {
    if (!i || !m.current) return;
    (async () => {
      g(!0), setTimeout(() => {
        const O = m.current, P = O.getContext("2d", { willReadFrequently: !0 }), C = i.naturalWidth, x = i.naturalHeight;
        O.width = C, O.height = x;
        const p = E.angle * Math.PI / 180, f = Math.abs(Math.cos(p)), V = Math.abs(Math.sin(p)), N = Math.ceil(C * f + x * V), L = Math.ceil(C * V + x * f), T = document.createElement("canvas");
        T.width = N, T.height = L;
        const h = T.getContext("2d", { willReadFrequently: !0 });
        h.save(), h.translate(N / 2, L / 2), h.rotate(p), h.drawImage(i, -C / 2, -x / 2), h.restore();
        const S = h.getImageData(0, 0, N, L);
        let W;
        if (u) {
          const $ = document.createElement("canvas");
          $.width = N, $.height = L;
          const M = $.getContext("2d", { willReadFrequently: !0 });
          M.save(), M.translate(N / 2, L / 2), M.rotate(p), M.drawImage(u, -C / 2, -x / 2, C, x), M.restore(), W = M.getImageData(0, 0, N, L);
        }
        const U = gr(S, E, W);
        h.putImageData(U, 0, 0), P.save(), P.clearRect(0, 0, C, x), P.translate(C / 2, x / 2), P.rotate(-p), P.drawImage(T, -N / 2, -L / 2), P.restore(), g(!1);
      }, 10);
    })();
  }, [E, i, u, g]), l ? /* @__PURE__ */ n.jsxs("div", { className: "canvas-container", style: { width: k.width, height: k.height }, children: [
    /* @__PURE__ */ n.jsx(
      "canvas",
      {
        ref: m,
        className: "editor-canvas"
      }
    ),
    R && /* @__PURE__ */ n.jsxs("div", { className: "processing-overlay", children: [
      /* @__PURE__ */ n.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ n.jsx("span", { children: "Sorting Pixels..." })
    ] })
  ] }) : null;
}, Er = ({ sidebar: l, content: y }) => /* @__PURE__ */ n.jsxs("div", { className: "app-layout", children: [
  /* @__PURE__ */ n.jsxs("aside", { className: "sidebar", children: [
    /* @__PURE__ */ n.jsx("div", { className: "sidebar-header", children: /* @__PURE__ */ n.jsx("h1", { children: "Pixel Sorter" }) }),
    /* @__PURE__ */ n.jsx("div", { className: "sidebar-content", children: l })
  ] }),
  /* @__PURE__ */ n.jsx("main", { className: "main-content", children: y })
] }), _r = ({ onImageUpload: l }) => {
  const [y, E] = ae(!1), R = te((a) => {
    a.preventDefault(), E(!0);
  }, []), g = te((a) => {
    a.preventDefault(), E(!1);
  }, []), m = te((a) => {
    a.preventDefault(), E(!1), a.dataTransfer.files && a.dataTransfer.files[0] && l(a.dataTransfer.files[0]);
  }, [l]), i = te((a) => {
    a.target.files && a.target.files[0] && l(a.target.files[0]);
  }, [l]);
  return /* @__PURE__ */ n.jsx(
    "div",
    {
      className: `image-uploader ${y ? "dragging" : ""}`,
      onDragOver: R,
      onDragLeave: g,
      onDrop: m,
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
            onChange: i,
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
