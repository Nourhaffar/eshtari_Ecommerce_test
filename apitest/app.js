const ENDPOINT =
  "https://api.sari3.com/v2/index.php?route=assignment_test/home_widgets";

const app = document.getElementById("app");

main().catch((e) => {
  console.error(e);
  app.innerHTML = `<p>❌ Error: ${escapeHtml(String(e))}</p>`;
});

async function main() {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();

  if (!json.success) throw new Error("API success=false");

  // 1) sort by sort_order
  const widgets = [...json.data].sort(
    (a, b) => Number(a.sort_order) - Number(b.sort_order)
  );

  // 2) render only active
  const activeWidgets = widgets.filter((w) => String(w.status) === "1");

  app.innerHTML = "";
  for (const w of activeWidgets) {
    app.appendChild(renderWidget(w));
  }
}

function renderWidget(w) {
  const wrapper = document.createElement("section");
  wrapper.className = "widget";
  wrapper.style.background = w.background_color || "";

  // Header (to see properties while testing)
  const header = document.createElement("div");
  header.className = "widgetHeader";
  header.innerHTML = `
    <div>
      <div><strong>${escapeHtml(w.title || "Untitled")}</strong></div>
      <div class="meta">
        type=${escapeHtml(w.type)} | display=${escapeHtml(w.display)} |
        cols=${escapeHtml(w.column_number)} rows=${escapeHtml(w.row_number)} |
        sort=${escapeHtml(w.sort_order)} | view=${escapeHtml(w.view)}
      </div>
    </div>
    <div class="meta">id: ${escapeHtml(w.mobile_widget_id)}</div>
  `;

  const content = document.createElement("div");
  content.className = "content";

  // type-based rendering
  if (w.type === "banner") {
    content.appendChild(renderBanner(w));
  } else if (w.type === "category") {
    content.appendChild(renderCategoryProducts(w));
  } else {
    content.innerHTML = `<p>Unsupported widget type: ${escapeHtml(w.type)}</p>`;
  }

  wrapper.appendChild(header);
  wrapper.appendChild(content);
  return wrapper;
}

/* ========== Banner ========== */
function renderBanner(w) {
  const imgs = Array.isArray(w.banner_images) ? w.banner_images : [];
  const urls = imgs.map((x) => x?.image_path).filter(Boolean);

  if (urls.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No banner images.";
    return p;
  }

  if (w.display === "slider") return renderSlider(urls);
  if (w.display === "grid") {
    const cols = clampInt(w.column_number, 1, 8, 4);
    const rows = clampInt(w.row_number, 1, 20, 2);
    return renderImageGrid(urls, cols, rows);
  }

  const p = document.createElement("p");
  p.textContent = `Unknown banner display: ${w.display}`;
  return p;
}

function renderSlider(urls) {
  const box = document.createElement("div");
  box.className = "slider";

  const images = urls.map((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `banner-${i + 1}`;
    if (i === 0) img.classList.add("active");
    box.appendChild(img);
    return img;
  });

  const dots = document.createElement("div");
  dots.className = "dots";

  let index = 0;
  const dotEls = urls.map((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", () => setIndex(i));
    dots.appendChild(d);
    return d;
  });

  box.appendChild(dots);

  const intervalMs = clampInt( // duration=0 means use default
    Number(box.dataset.duration || 0) || 0,
    0,
    60000,
    3500
  );

  const timer = setInterval(() => setIndex((index + 1) % urls.length), intervalMs);
  box.addEventListener("mouseenter", () => clearInterval(timer));

  function setIndex(i) {
    images[index].classList.remove("active");
    dotEls[index].classList.remove("active");
    index = i;
    images[index].classList.add("active");
    dotEls[index].classList.add("active");
  }

  return box;
}

function renderImageGrid(urls, cols, rows) {
  const grid = document.createElement("div");
  grid.className = "grid";
  grid.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

  // rows * cols items max
  const limit = rows * cols;
  urls.slice(0, limit).forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `grid-${i + 1}`;
    grid.appendChild(img);
  });

  return grid;
}

/* ========== Category (Products) ========== */
function renderCategoryProducts(w) {
  const products = Array.isArray(w.products) ? w.products : [];

  // clean invalid items where image_path=false and missing product_id/name
  const clean = products.filter((p) => p && p.product_id && p.name);

  if (clean.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No products in this widget.";
    return p;
  }

  if (w.display === "carousel") return renderProductsCarousel(clean);
  if (w.display === "grid") {
    const cols = clampInt(w.column_number, 1, 6, 4);
    return renderProductsGrid(clean, cols);
  }

  const p = document.createElement("p");
  p.textContent = `Unknown products display: ${w.display}`;
  return p;
}

function renderProductsGrid(products, cols) {
  const grid = document.createElement("div");
  grid.className = "productsGrid";
  grid.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

  products.forEach((p) => grid.appendChild(renderProductCard(p)));
  return grid;
}

function renderProductsCarousel(products) {
  const row = document.createElement("div");
  row.className = "carousel";
  products.forEach((p) => row.appendChild(renderProductCard(p)));
  return row;
}

function renderProductCard(p) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = p.image_path || "";
  img.alt = p.name || "product";
  img.onerror = () => {
    img.removeAttribute("src");
    img.alt = "no image";
  };

  const body = document.createElement("div");
  body.className = "cardBody";

  const title = document.createElement("div");
  title.className = "title";
  title.textContent = p.name;

  const priceRow = document.createElement("div");
  priceRow.className = "priceRow";

  const price = document.createElement("span");
  price.className = "price";
  price.textContent = formatMoney(p.price);

  const special = document.createElement("span");
  special.className = "special";
  special.textContent = p.special ? formatMoney(p.special) : "";

  // If special is same/empty, hide it
  if (!p.special || Number(p.special) === Number(p.price)) {
    special.style.display = "none";
  }

  priceRow.appendChild(price);
  priceRow.appendChild(special);

  const desc = document.createElement("div");
  desc.className = "desc";
  desc.textContent = htmlToText(p.description || "");

  body.appendChild(title);
  body.appendChild(priceRow);
  body.appendChild(desc);

  card.appendChild(img);
  card.appendChild(body);

  // click: show important fields quickly
  card.addEventListener("click", () => {
    alert(
      `product_id: ${p.product_id}\nsku: ${p.sku}\nprice: ${p.price}\nspecial: ${p.special}`
    );
  });

  return card;
}

/* ========== Helpers ========== */
function htmlToText(html) {
  // convert HTML description to plain text
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

function formatMoney(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value ?? "");
  return `$${n.toFixed(2)}`;
}

function clampInt(value, min, max, fallback) {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
