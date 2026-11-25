(function () {
  function key(c) { return "sorkh-db:" + c; }
  function read(c) { try { return JSON.parse(localStorage.getItem(key(c)) || "[]"); } catch (e) { return []; } }
  var subs = {};
  function write(c, rows) { localStorage.setItem(key(c), JSON.stringify(rows)); (subs[c] || []).forEach(function (f) { try { f(); } catch (e) {} }); }
  function id() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }
  window.db = {
    list: function (c) { return Promise.resolve(read(c)); },
    query: function (c) { return Promise.resolve(read(c)); },
    get: function (c, i) { return Promise.resolve(read(c).find(function (r) { return r.id === i; }) || null); },
    insert: function (c, item) { var row = Object.assign({ id: id(), created_at: new Date().toISOString() }, item); write(c, read(c).concat(row)); return Promise.resolve(row); },
    update: function (c, i, patch) { var out = null; write(c, read(c).map(function (r) { if (r.id !== i) return r; out = Object.assign({}, r, patch); return out; })); return Promise.resolve(out); },
    remove: function (c, i) { write(c, read(c).filter(function (r) { return r.id !== i; })); return Promise.resolve(true); },
    subscribe: function (c, cb) { subs[c] = (subs[c] || []).concat(cb); return function () { subs[c] = subs[c].filter(function (f) { return f !== cb; }); }; },
  };
  window.auth = { me: function () { return Promise.resolve({ id: "guest", name: "Guest" }); } };
  window.ai = { generate: function () { return Promise.resolve(""); } };
})();
