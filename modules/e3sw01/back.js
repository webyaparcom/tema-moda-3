/* Node render: document yok — html passthrough; istemci asagida */
html = html;
if (typeof document !== "undefined") {
/*
 * sepet-widget-2 (sw2) — guvenli footer sepet (Paket 597 P20).
 * var-only CJS; DOMContentLoaded yasak. v1 sepet-widget dokunulmaz.
 * Storage SSOT: mxCartV1 + schema { v:1, items:[{id,name,qty,unitPrice,...}] }.
 * API: window.mxCartAdd / List / Count / Total / SetQty / Remove / Clear (+ sw2* alias).
 */

(function () {
  var WIDGET_ID = "sw2Root";
  var STORAGE_KEY = "mxCartV1";
  var BOOT_MAX_RETRY = 40;
  var BOOT_RETRY_MS = 50;
  var bootAttempt = 0;

  /*
   * mxEscapeHtml — kullanıcı/veri kaynaklı metni DOM'a basmadan önce kaçış
   * (escape) yapar. XSS'e karşı tek güvenlik katmanı; textContent kullanılan
   * yerlerde teorik olarak gerekmez ama innerHTML üretilen tüm noktalarda
   * (ör. boş durum mesajı, ileride şablon genişlemesi) zorunlu tutulur.
   * DOM API güvenlik kısıtı: innerHTML yerine mümkün olan her yerde
   * createElement/textContent kullanılır; innerHTML yalnız escape edilmiş
   * statik parçalarla birlikte kullanılabilir.
   */
  function mxEscapeHtml(value) {
    var str = value === undefined || value === null ? "" : String(value);
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /*
   * readCart / writeCart — localStorage okuma/yazma tek noktadan geçer.
   * try/catch: gizli mod (private browsing) veya kota dolması durumunda
   * localStorage erişimi exception fırlatabilir; widget bu durumda
   * çökmemeli, sessizce boş sepet davranışına düşmeli.
   */
  /* mxCartV1 schema sanitize — bozuk kayit ignore/repair */
  function sanitizeItem(rawItem) {
    if (!rawItem || typeof rawItem !== "object") return null;
    var id = rawItem.id !== undefined ? String(rawItem.id) : "";
    if (!id) return null;
    var qty = parseFloat(rawItem.qty);
    if (isNaN(qty) || !isFinite(qty) || qty <= 0) qty = 1;
    var unit = parseFloat(
      rawItem.unitPrice !== undefined ? rawItem.unitPrice : rawItem.price
    );
    if (isNaN(unit) || !isFinite(unit) || unit < 0) unit = 0;
    return {
      id: id,
      sku: rawItem.sku ? String(rawItem.sku) : "",
      name: rawItem.name ? String(rawItem.name) : "",
      qty: qty,
      unitPrice: unit,
      img: rawItem.img ? String(rawItem.img) : "",
      url: rawItem.url ? String(rawItem.url) : ""
    };
  }

  function readCart() {
    var raw = null;
    var parsed = null;
    var items = [];
    var i;
    var clean;

    try {
      raw = window.localStorage.getItem(STORAGE_KEY);
    } catch (readErr) {
      raw = null;
    }

    if (!raw) {
      return [];
    }

    try {
      parsed = JSON.parse(raw);
    } catch (parseErr) {
      return [];
    }

    /* Yeni schema {v:1,items:[]} veya legacy dizi */
    if (parsed && parsed.v === 1 && parsed.items && parsed.items.length !== undefined) {
      for (i = 0; i < parsed.items.length; i = i + 1) {
        clean = sanitizeItem(parsed.items[i]);
        if (clean) items.push(clean);
      }
      return items;
    }
    if (parsed && parsed.length !== undefined) {
      for (i = 0; i < parsed.length; i = i + 1) {
        clean = sanitizeItem(parsed[i]);
        if (clean) items.push(clean);
      }
      return items;
    }
    return [];
  }

  function writeCart(items) {
    var payload = { v: 1, items: items || [] };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (writeErr) {
      /* kota / private mode — UI ayakta kalsin */
    }
  }

  function findItemIndex(items, id) {
    var i;
    for (i = 0; i < items.length; i = i + 1) {
      if (items[i] && items[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  function calcTotal(items) {
    var total = 0;
    var i;
    var unit;
    var qty;
    for (i = 0; i < items.length; i = i + 1) {
      unit = items[i] && items[i].unitPrice ? items[i].unitPrice : 0;
      qty = items[i] && items[i].qty ? items[i].qty : 0;
      total = total + unit * qty;
    }
    return total;
  }

  /*
   * addItem — manipule client fiyatini ignore et.
   * Tercih: opts.catalogPrice / opts.unitPrice (guvenilir); yoksa 0.
   * opts veya 3. arg olarak gelen ham price yalniz catalogPrice yoksa ve
   * opts.trustPrice===true ise kabul (demo); aksi halde ignore.
   */
  function addItem(id, name, priceOrOpts, qty) {
    var items = readCart();
    var idx = findItemIndex(items, id);
    var opts = {};
    var addQty = 1;
    var unitPrice = 0;
    var safeName = name || "";

    if (priceOrOpts && typeof priceOrOpts === "object") {
      opts = priceOrOpts;
      addQty = opts.qty && opts.qty > 0 ? opts.qty : 1;
      if (opts.catalogPrice !== undefined) {
        unitPrice = parseFloat(opts.catalogPrice);
      } else if (opts.unitPrice !== undefined) {
        unitPrice = parseFloat(opts.unitPrice);
      } else if (opts.trustPrice === true && opts.price !== undefined) {
        unitPrice = parseFloat(opts.price);
      } else {
        unitPrice = 0;
      }
      if (opts.name) safeName = opts.name;
      if (opts.id) id = opts.id;
    } else {
      addQty = qty && qty > 0 ? qty : 1;
      /* ham price argumani — manipule edilebilir: ignore (0) */
      unitPrice = 0;
      if (arguments.length >= 3 && typeof priceOrOpts === "number" && false) {
        unitPrice = priceOrOpts;
      }
    }
    if (isNaN(unitPrice) || !isFinite(unitPrice) || unitPrice < 0) unitPrice = 0;

    if (idx === -1) {
      items.push({
        id: String(id),
        name: String(safeName || ""),
        qty: addQty,
        unitPrice: unitPrice,
        sku: opts.sku ? String(opts.sku) : "",
        img: opts.img ? String(opts.img) : "",
        url: opts.url ? String(opts.url) : ""
      });
    } else {
      items[idx].qty = items[idx].qty + addQty;
      /* mevcut satir: client fiyat ile overwrite yok; yalniz catalog/unit guncelle */
      if (unitPrice > 0 && (opts.catalogPrice !== undefined || opts.unitPrice !== undefined)) {
        items[idx].unitPrice = unitPrice;
      }
    }

    writeCart(items);
    render();
  }

  function removeItem(id) {
    var items = readCart();
    var idx = findItemIndex(items, id);

    if (idx !== -1) {
      items.splice(idx, 1);
      writeCart(items);
      render();
    }
  }

  function changeQty(id, delta) {
    var items = readCart();
    var idx = findItemIndex(items, id);

    if (idx === -1) {
      return;
    }

    items[idx].qty = items[idx].qty + delta;

    if (items[idx].qty <= 0) {
      items.splice(idx, 1);
    }

    writeCart(items);
    render();
  }

  function clearCart() {
    writeCart([]);
    render();
  }

  /*
   * buildRowNode — index.html <template data-sw2-item-template> klonu.
   * Kullanici metni textContent (escape yalniz attr yolunda).
   */
  function buildRowNode(root, item) {
    var tpl = root.querySelector("[data-sw2-item-template]");
    var node;
    var nameEl;
    var priceEl;
    var qtyEl;
    var minusBtn;
    var plusBtn;
    var removeBtn;
    var imgEl;
    var lineTotal;

    if (tpl && tpl.content) {
      node = tpl.content.firstElementChild.cloneNode(true);
    } else {
      node = document.createElement("li");
      node.className = "sw2-item";
      node.setAttribute("data-sw2-item", "");
      node.innerHTML = "";
      nameEl = document.createElement("span");
      nameEl.setAttribute("data-sw2-item-name", "");
      priceEl = document.createElement("span");
      priceEl.setAttribute("data-sw2-item-price", "");
      qtyEl = document.createElement("span");
      qtyEl.setAttribute("data-sw2-qty-value", "");
      minusBtn = document.createElement("button");
      minusBtn.setAttribute("data-sw2-qty-minus", "");
      plusBtn = document.createElement("button");
      plusBtn.setAttribute("data-sw2-qty-plus", "");
      removeBtn = document.createElement("button");
      removeBtn.setAttribute("data-sw2-item-remove", "");
      node.appendChild(nameEl);
      node.appendChild(priceEl);
      node.appendChild(minusBtn);
      node.appendChild(qtyEl);
      node.appendChild(plusBtn);
      node.appendChild(removeBtn);
    }

    node.setAttribute("data-sw2-id", String(item.id));
    nameEl = node.querySelector("[data-sw2-item-name]");
    priceEl = node.querySelector("[data-sw2-item-price]");
    qtyEl = node.querySelector("[data-sw2-qty-value]");
    minusBtn = node.querySelector("[data-sw2-qty-minus]");
    plusBtn = node.querySelector("[data-sw2-qty-plus]");
    removeBtn = node.querySelector("[data-sw2-item-remove]");
    imgEl = node.querySelector("[data-sw2-item-img]");

    if (nameEl) nameEl.textContent = item.name ? String(item.name) : "";
    lineTotal = (item.unitPrice || 0) * (item.qty || 0);
    if (priceEl) priceEl.textContent = String(lineTotal);
    if (qtyEl) qtyEl.textContent = String(item.qty || 0);
    if (imgEl && item.img) {
      imgEl.setAttribute("data-sw2-img-src", String(item.img).replace(/[<>"']/g, ""));
    }
    if (minusBtn) {
      minusBtn.onclick = function () { changeQty(item.id, -1); };
    }
    if (plusBtn) {
      plusBtn.onclick = function () { changeQty(item.id, 1); };
    }
    if (removeBtn) {
      removeBtn.onclick = function () { removeItem(item.id); };
    }
    return node;
  }

  function setOpen(root, open) {
    var dropdown = root.querySelector("[data-sw2-dropdown]");
    var overlay = root.querySelector("[data-sw2-overlay]");
    var trigger = root.querySelector(".sw2-trigger");
    if (dropdown) {
      if (open) dropdown.removeAttribute("hidden");
      else dropdown.setAttribute("hidden", "");
    }
    if (overlay) {
      if (open) overlay.removeAttribute("hidden");
      else overlay.setAttribute("hidden", "");
    }
    if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function render() {
    var root = document.getElementById(WIDGET_ID);
    if (!root) return;

    var items = readCart();
    var listEl = root.querySelector("[data-sw2-list]");
    var emptyEl = root.querySelector("[data-sw2-empty]");
    var totalEl = root.querySelector("[data-sw2-total-value]");
    var badgeEl = root.querySelector("[data-sw2-badge]");
    var countQty = 0;
    var i;

    for (i = 0; i < items.length; i = i + 1) {
      countQty = countQty + (items[i].qty || 0);
    }
    root.setAttribute("data-sw2-count", String(countQty));

    if (!listEl) return;

    while (listEl.firstChild) {
      listEl.removeChild(listEl.firstChild);
    }

    if (items.length === 0) {
      if (emptyEl) emptyEl.removeAttribute("hidden");
      listEl.setAttribute("hidden", "");
    } else {
      if (emptyEl) emptyEl.setAttribute("hidden", "");
      listEl.removeAttribute("hidden");
      for (i = 0; i < items.length; i = i + 1) {
        listEl.appendChild(buildRowNode(root, items[i]));
      }
    }

    if (totalEl) totalEl.textContent = String(calcTotal(items));
    if (badgeEl) badgeEl.textContent = String(countQty);
  }


  function sw2OnKeydown(ev) {
    var root = document.getElementById(WIDGET_ID);
    var key = ev.key || ev.keyCode;
    if (!root) return;
    if (key !== "Escape" && key !== "Esc" && key !== 27) return;
    var dropdown = root.querySelector("[data-sw2-dropdown]");
    if (dropdown && !dropdown.hasAttribute("hidden")) setOpen(root, false);
  }
  document.addEventListener("keydown", sw2OnKeydown, false);
  function bindEvents(root) {
    var trigger = root.querySelector(".sw2-trigger");
    var closeBtn = root.querySelector("[data-sw2-close]");
    var overlay = root.querySelector("[data-sw2-overlay]");
    var checkout = root.querySelector("[data-sw2-checkout]");
    var dropdown = root.querySelector("[data-sw2-dropdown]");

    function toggle() {
      var open = dropdown && !dropdown.hasAttribute("hidden");
      setOpen(root, !open);
    }

    if (trigger) trigger.onclick = function () { toggle(); };
    if (closeBtn) closeBtn.onclick = function () { setOpen(root, false); };
    if (overlay) overlay.onclick = function () { setOpen(root, false); };
    if (checkout) {
      checkout.onclick = function () {
        var url = "sepetim";
        try {
          if (root.getAttribute("data-cart-url")) url = root.getAttribute("data-cart-url");
        } catch (eUrl) {}
        window.location.href = "/" + String(url).replace(/^\/+/, "") + "/";
      };
    }
  }

  /*
   * onStorageEvent — aynı origin'de açık başka bir sekmede sepete ekleme
   * yapılırsa (storage event native olarak yalnız diğer sekmelerde tetiklenir)
   * bu widget'ın da senkron kalması için render tekrar çağrılır.
   */
  function onStorageEvent(evt) {
    if (evt && evt.key === STORAGE_KEY) {
      render();
    }
  }

  /*
   * bootWidget — DOMContentLoaded yasak olduğu için (CLAUDE.md), kök eleman
   * henüz DOM'da yoksa setTimeout ile sınırlı sayıda tekrar denenir. Bu,
   * widget script'inin body sonu dışında (ör. head veya async injected)
   * yüklenmesi durumunda da çalışmasını garanti eder.
   */
  function bootWidget() {
    var root = document.getElementById(WIDGET_ID);

    if (!root) {
      bootAttempt = bootAttempt + 1;
      if (bootAttempt < BOOT_MAX_RETRY) {
        setTimeout(bootWidget, BOOT_RETRY_MS);
      }
      return;
    }

    bindEvents(root);
    render();
    window.addEventListener("storage", onStorageEvent);
  }

  window.sw2AddItem = addItem;
  window.sw2RemoveItem = removeItem;
  window.sw2ClearCart = clearCart;

  /* E5 kanon API — sepet-widget-2 de ayni global sozlesmeyi saglar */
  window.mxCartAdd = function (payload) {
    if (!payload || typeof payload !== "object") return readCart();
    addItem(payload.id, payload.name, {
      catalogPrice: payload.catalogPrice,
      unitPrice: payload.unitPrice,
      trustPrice: payload.trustPrice === true,
      price: payload.price,
      qty: payload.qty,
      sku: payload.sku,
      img: payload.img,
      url: payload.url,
      name: payload.name,
      id: payload.id
    });
    return readCart();
  };
  window.mxCartList = function () { return readCart(); };
  window.mxCartCount = function () {
    var items = readCart();
    var n = 0;
    var i;
    for (i = 0; i < items.length; i = i + 1) n = n + (items[i].qty || 0);
    return n;
  };
  window.mxCartTotal = function () { return calcTotal(readCart()); };
  window.mxCartSetQty = function (id, qty) {
    var items = readCart();
    var idx = findItemIndex(items, id);
    if (idx === -1) return readCart();
    if (qty <= 0) {
      items.splice(idx, 1);
    } else {
      items[idx].qty = qty;
    }
    writeCart(items);
    render();
    return items;
  };
  window.mxCartRemove = function (id) {
    removeItem(id);
    return readCart();
  };
  window.mxCartClear = function () {
    clearCart();
    return [];
  };
  window.addToCart = window.mxCartAdd;

  if (document.readyState === "loading") {
    setTimeout(bootWidget, 0);
  } else {
    bootWidget();
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      WIDGET_ID: WIDGET_ID,
      STORAGE_KEY: STORAGE_KEY,
      mxEscapeHtml: mxEscapeHtml,
      calcTotal: calcTotal,
      findItemIndex: findItemIndex
    };
  }
})();
}
