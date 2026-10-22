(function () {
  var ID = "(function () {
  var ID = "(function () {
  var ID = "G-0HN3Y6V3XZ";
  var KEY = "aw:analytics-v1";
  var loaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", ID);
  }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.awAnalytics = {
    grant: function () { store("granted"); load(); },
    deny: function () { store("denied"); }
  };

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === "granted") { load(); return; }
  if (saved === "denied" || document.getElementById("root")) return; // React pages: ConsentBar asks

  // Static article pages have no React, so show a minimal notice here.
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.createElement("div");
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Analytics notice");
    bar.style.cssText = "position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;max-width:720px;margin:0 auto;display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;padding:14px 18px;border-radius:16px;background:#111;color:#f6f4ee;font:13.5px/1.5 system-ui,sans-serif";
    bar.innerHTML = '<p style="flex:1 1 300px;margin:0">I use Google Analytics (cookies) to see which articles get read. Nothing loads until you choose. <a href="/privacy-policy" style="color:inherit;text-decoration:underline">Privacy Policy</a></p>';
    [["Accept analytics", true], ["No thanks", false]].forEach(function (b) {
      var btn = document.createElement("button");
      btn.textContent = b[0];
      btn.style.cssText = "border:0;border-radius:999px;padding:10px 20px;font:600 13px system-ui,sans-serif;background:#f6f4ee;color:#111;cursor:pointer";
      btn.onclick = function () { b[1] ? window.awAnalytics.grant() : window.awAnalytics.deny(); bar.remove(); };
      bar.appendChild(btn);
    });
    document.body.appendChild(bar);
  });
})();";
  var KEY = "aw:analytics-v1";
  var loaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", ID);
  }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.awAnalytics = {
    grant: function () { store("granted"); load(); },
    deny: function () { store("denied"); }
  };

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === "granted") { load(); return; }
  if (saved === "denied" || document.getElementById("root")) return; // React pages: ConsentBar asks

  // Static article pages have no React, so show a minimal notice here.
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.createElement("div");
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Analytics notice");
    bar.style.cssText = "position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;max-width:720px;margin:0 auto;display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;padding:14px 18px;border-radius:16px;background:#111;color:#f6f4ee;font:13.5px/1.5 system-ui,sans-serif";
    bar.innerHTML = '<p style="flex:1 1 300px;margin:0">I use Google Analytics (cookies) to see which articles get read. Nothing loads until you choose. <a href="/privacy-policy" style="color:inherit;text-decoration:underline">Privacy Policy</a></p>';
    [["Accept analytics", true], ["No thanks", false]].forEach(function (b) {
      var btn = document.createElement("button");
      btn.textContent = b[0];
      btn.style.cssText = "border:0;border-radius:999px;padding:10px 20px;font:600 13px system-ui,sans-serif;background:#f6f4ee;color:#111;cursor:pointer";
      btn.onclick = function () { b[1] ? window.awAnalytics.grant() : window.awAnalytics.deny(); bar.remove(); };
      bar.appendChild(btn);
    });
    document.body.appendChild(bar);
  });
})();";
  var KEY = "aw:analytics-v1";
  var loaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", ID);
  }
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.awAnalytics = {
    grant: function () { store("granted"); load(); },
    deny: function () { store("denied"); }
  };

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === "granted") { load(); return; }
  if (saved === "denied" || document.getElementById("root")) return; // React pages: ConsentBar asks

  // Static article pages have no React, so show a minimal notice here.
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.createElement("div");
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Analytics notice");
    bar.style.cssText = "position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;max-width:720px;margin:0 auto;display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;padding:14px 18px;border-radius:16px;background:#111;color:#f6f4ee;font:13.5px/1.5 system-ui,sans-serif";
    bar.innerHTML = '<p style="flex:1 1 300px;margin:0">I use Google Analytics (cookies) to see which articles get read. Nothing loads until you choose. <a href="/privacy-policy" style="color:inherit;text-decoration:underline">Privacy Policy</a></p>';
    [["Accept analytics", true], ["No thanks", false]].forEach(function (b) {
      var btn = document.createElement("button");
      btn.textContent = b[0];
      btn.style.cssText = "border:0;border-radius:999px;padding:10px 20px;font:600 13px system-ui,sans-serif;background:#f6f4ee;color:#111;cursor:pointer";
      btn.onclick = function () { b[1] ? window.awAnalytics.grant() : window.awAnalytics.deny(); bar.remove(); };
      bar.appendChild(btn);
    });
    document.body.appendChild(bar);
  });
})();
