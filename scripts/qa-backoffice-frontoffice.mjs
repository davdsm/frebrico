#!/usr/bin/env node
/**
 * QA: Backoffice edits → verify on frontoffice.
 * Run with: node scripts/qa-backoffice-frontoffice.mjs
 * Requires: backend on 3001 (or use BASE=http://localhost:5173 for proxy).
 */
const BASE = process.env.BASE || 'http://localhost:3001';

function log(msg, ok = null) {
  const s = ok === true ? '✓' : ok === false ? '✗' : '-';
  console.log(`${s} ${msg}`);
}

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...opts.headers } });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Invalid JSON: ${text.slice(0, 200)}`);
  }
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}

async function main() {
  console.log('\n=== QA: Backoffice → Frontoffice ===\n');
  let token;
  const unique = `QA-${Date.now()}`;

  // --- Login ---
  try {
    const login = await fetchJson(`${BASE}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email: 'geral@davdsm.pt', password: 'Frebrico2k26_#!' }),
    });
    token = login.token;
    if (!token) throw new Error('No token');
    log('Login OK', true);
  } catch (e) {
    log('Login failed: ' + e.message, false);
    console.log('  Ensure backend is running and seed-auth has been run.');
    process.exit(1);
  }

  const auth = () => ({ Authorization: `Bearer ${token}` });

  // --- 1. Text edits: save in backoffice, then verify content API (what frontoffice uses) ---
  console.log('\n--- 1. Text editing (content) ---');
  const textEdits = [
    ['home', 'hero', 'title', `${unique} Hero Title`],
    ['home', 'features', 'title', `${unique} Features Title`],
    ['footer', 'cta', 'title', `${unique} CTA Title`],
    ['contact', 'hero', 'title', `${unique} Contact Title`],
    ['about', 'hero', 'title', `${unique} About Title`],
  ];
  for (const [page, section, field, value] of textEdits) {
    try {
      await fetchJson(
        `${BASE}/api/content/${encodeURIComponent(page)}/${encodeURIComponent(section)}/${encodeURIComponent(field)}`,
        { method: 'PUT', headers: auth(), body: JSON.stringify({ value, field_type: 'text' }) }
      );
      log(`PUT content ${page}/${section}/${field}`, true);
    } catch (e) {
      log(`PUT content ${page}/${section}/${field}: ${e.message}`, false);
    }
  }

  const content = await fetchJson(`${BASE}/api/content?all=1`);
  let textOk = true;
  for (const [page, section, field, value] of textEdits) {
    const v = content[page]?.[section]?.[field];
    if (v === value) {
      log(`Frontoffice content ${page}.${section}.${field} = "${v.slice(0, 30)}..."`, true);
    } else {
      log(`Frontoffice content ${page}.${section}.${field}: expected "${value}", got "${String(v).slice(0, 30)}"`, false);
      textOk = false;
    }
  }
  if (textOk) log('All text edits visible in frontoffice content API', true);

  // --- 2. Create category, then product (with variant/attribute), verify on frontoffice ---
  console.log('\n--- 2. New category & product (and attribute/variant) ---');
  let catId, productId;
  try {
    const cat = await fetchJson(`${BASE}/api/categories`, {
      method: 'POST',
      headers: auth(),
      body: JSON.stringify({
        slug: `qa-cat-${Date.now()}`,
        name: `${unique} Category`,
        description: 'QA category',
        image: '',
        sort_order: 0,
      }),
    });
    catId = cat.id;
    log(`Created category id=${catId} "${cat.name}"`, true);
  } catch (e) {
    log('Create category: ' + e.message, false);
  }

  if (catId) {
    try {
      const prod = await fetchJson(`${BASE}/api/products`, {
        method: 'POST',
        headers: auth(),
        body: JSON.stringify({
          name: `${unique} Product`,
          slug: `qa-prod-${Date.now()}`,
          price: 99.99,
          featured: 1,
          image: '',
          category_id: catId,
          description: 'QA product',
          badge: 'New',
          type_label: 'Tipo',
          type_text: 'Texto tipo',
          availability: 'Disponível',
          variants: JSON.stringify([{ name: 'Variant A', image_url: '' }, { name: 'Variant B', image_url: '' }]),
          downloads: JSON.stringify([{ label: 'PDF', url: '/file.pdf' }]),
          specifications: JSON.stringify([{ label: 'Peso', value: '10 kg' }, { label: 'Cor', value: 'Verde' }]),
          related_product_ids: '[]',
          faqs: JSON.stringify([{ question: 'Q?', answer: 'A' }]),
        }),
      });
      productId = prod.id;
      log(`Created product id=${productId} "${prod.name}" (with variants & specs)`, true);
    } catch (e) {
      log('Create product: ' + e.message, false);
    }
  }

  const categories = await fetchJson(`${BASE}/api/categories`);
  const products = await fetchJson(`${BASE}/api/products`);
  const catFound = categories.find((c) => c.id === catId || c.name && c.name.includes(unique));
  const prodFound = products.find((p) => p.id === productId || (p.name && p.name.includes(unique)));
  log(`Frontoffice GET /api/categories: category appears = ${!!catFound}`, !!catFound);
  log(`Frontoffice GET /api/products: product appears = ${!!prodFound}`, !!prodFound);

  if (productId) {
    const one = await fetchJson(`${BASE}/api/products/${productId}`);
    const hasVariants = Array.isArray(JSON.parse(one.variants || '[]')) && JSON.parse(one.variants).length >= 2;
    const hasSpecs = Array.isArray(JSON.parse(one.specifications || '[]')) && JSON.parse(one.specifications).length >= 2;
    log(`Product detail: variants & specs (attributes) visible = ${hasVariants && hasSpecs}`, hasVariants && hasSpecs);
  }

  // --- 3. Configuration page (_settings) ---
  console.log('\n--- 3. Configuration (_settings) ---');
  try {
    await fetchJson(
      `${BASE}/api/content/_settings/maintenance/enabled`,
      { method: 'PUT', headers: auth(), body: JSON.stringify({ value: 'false', field_type: 'text' }) }
    );
    await fetchJson(
      `${BASE}/api/content/_settings/notifications/email`,
      { method: 'PUT', headers: auth(), body: JSON.stringify({ value: 'qa@test.pt', field_type: 'text' }) }
    );
    await fetchJson(
      `${BASE}/api/content/_settings/layout/color_primary`,
      { method: 'PUT', headers: auth(), body: JSON.stringify({ value: '#313b2e', field_type: 'text' }) }
    );
    log('Configuration saves (maintenance, notifications, layout)', true);
  } catch (e) {
    log('Configuration save: ' + e.message, false);
  }

  const settings = content._settings || await fetchJson(`${BASE}/api/content?page=_settings`).then(c => c._settings || c);
  const configOk = settings && (settings.maintenance?.enabled !== undefined || settings.notifications?.email !== undefined || settings.layout?.color_primary !== undefined);
  log('Configuration visible in content API (frontoffice can read _settings)', !!configOk);

  // --- 4. Header/Footer save (nav items) ---
  console.log('\n--- 4. Header nav save ---');
  const navItems = [{ label: 'Sobre Nós', url: '/about' }, { label: 'Produtos', url: '/products' }, { label: 'Contactos', url: '/contact' }];
  try {
    await fetchJson(`${BASE}/api/content/header/nav/items`, {
      method: 'PUT',
      headers: auth(),
      body: JSON.stringify({ value: JSON.stringify(navItems), field_type: 'json' }),
    });
    log('Header nav items saved', true);
  } catch (e) {
    log('Header nav save: ' + e.message, false);
  }
  const headerContent = await fetchJson(`${BASE}/api/content?page=header`);
  const headerOk = headerContent.nav && headerContent.nav.items;
  log('Header nav visible in frontoffice content', !!headerOk);

  console.log('\n=== QA done ===\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
