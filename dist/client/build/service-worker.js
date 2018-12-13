"use strict";
var precacheConfig = [["/index.html", "d474201eb3d3d69776a43f5a2cfba128"], ["/static/css/main.14fea13d.css", "9d8321a5a50c0505f988add39e0fcbb1"], ["/static/js/main.cc965854.js", "7fffa79da2230fecba2c800099fe8fc7"], ["/static/media/doctor-image.d44ad7f4.jpg", "d44ad7f449f2b3ffa2826c5c167d21d4"], ["/static/media/dr_avatar.9bb60b36.png", "9bb60b36bccf22698edde9f980c23d93"], ["/static/media/errorImage.13e176f8.png", "13e176f8cc52e05d03ab8c7af5a4c566"], ["/static/media/people.31142013.png", "31142013fdfad5d133afbf6b0f447a41"]],
    cacheName = "sw-precache-v3-sw-precache-webpack-plugin-" + (self.registration ? self.registration.scope : ""),
    ignoreUrlParametersMatching = [/^utm_/],
    addDirectoryIndex = function addDirectoryIndex(e, t) {
  var n = new URL(e);return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString();
},
    cleanResponse = function cleanResponse(t) {
  return t.redirected ? ("body" in t ? Promise.resolve(t.body) : t.blob()).then(function (e) {
    return new Response(e, { headers: t.headers, status: t.status, statusText: t.statusText });
  }) : Promise.resolve(t);
},
    createCacheKey = function createCacheKey(e, t, n, r) {
  var a = new URL(e);return r && a.pathname.match(r) || (a.search += (a.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(n)), a.toString();
},
    isPathWhitelisted = function isPathWhitelisted(e, t) {
  if (0 === e.length) return !0;var n = new URL(t).pathname;return e.some(function (e) {
    return n.match(e);
  });
},
    stripIgnoredUrlParameters = function stripIgnoredUrlParameters(e, n) {
  var t = new URL(e);return t.hash = "", t.search = t.search.slice(1).split("&").map(function (e) {
    return e.split("=");
  }).filter(function (t) {
    return n.every(function (e) {
      return !e.test(t[0]);
    });
  }).map(function (e) {
    return e.join("=");
  }).join("&"), t.toString();
},
    hashParamName = "_sw-precache",
    urlsToCacheKeys = new Map(precacheConfig.map(function (e) {
  var t = e[0],
      n = e[1],
      r = new URL(t, self.location),
      a = createCacheKey(r, hashParamName, n, /\.\w{8}\./);return [r.toString(), a];
}));function setOfCachedUrls(e) {
  return e.keys().then(function (e) {
    return e.map(function (e) {
      return e.url;
    });
  }).then(function (e) {
    return new Set(e);
  });
}self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(cacheName).then(function (r) {
    return setOfCachedUrls(r).then(function (n) {
      return Promise.all(Array.from(urlsToCacheKeys.values()).map(function (t) {
        if (!n.has(t)) {
          var e = new Request(t, { credentials: "same-origin" });return fetch(e).then(function (e) {
            if (!e.ok) throw new Error("Request for " + t + " returned a response with status " + e.status);return cleanResponse(e).then(function (e) {
              return r.put(t, e);
            });
          });
        }
      }));
    });
  }).then(function () {
    return self.skipWaiting();
  }));
}), self.addEventListener("activate", function (e) {
  var n = new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function (t) {
    return t.keys().then(function (e) {
      return Promise.all(e.map(function (e) {
        if (!n.has(e.url)) return t.delete(e);
      }));
    });
  }).then(function () {
    return self.clients.claim();
  }));
}), self.addEventListener("fetch", function (t) {
  if ("GET" === t.request.method) {
    var e,
        n = stripIgnoredUrlParameters(t.request.url, ignoreUrlParametersMatching),
        r = "index.html";(e = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, r), e = urlsToCacheKeys.has(n));var a = "/index.html";!e && "navigate" === t.request.mode && isPathWhitelisted(["^(?!\\/__).*"], t.request.url) && (n = new URL(a, self.location).toString(), e = urlsToCacheKeys.has(n)), e && t.respondWith(caches.open(cacheName).then(function (e) {
      return e.match(urlsToCacheKeys.get(n)).then(function (e) {
        if (e) return e;throw Error("The cached response that was expected is missing.");
      });
    }).catch(function (e) {
      return console.warn('Couldn\'t serve response for "%s" from cache: %O', t.request.url, e), fetch(t.request);
    }));
  }
});