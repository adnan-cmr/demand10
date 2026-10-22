import crypto from 'crypto';

// Positional layout of the TSV export (used when the file has no header row).
export const DEFAULT_COLUMNS = [
  'name', 'domain', 'employees', 'industry', 'website', 'logo',
  'linkedin', 'facebook', 'twitter', 'street', 'city', 'state',
  'country', 'postalCode', 'address', 'keywords', 'extra', 'technologies',
  'sic', 'naics', 'description', 'foundedYear', 'logoAlt',
  'partners', 'technologies2', 'services',
];

// Aliases are compared after lower-casing and removing every non-alphanumeric character.
const HEADER_ALIASES = {
  name: ['name', 'company', 'companyname'],
  domain: ['domain', 'companydomain'],
  employees: ['employees', 'employeecount', 'numberofemployees', 'companyemployees'],
  industry: ['industry', 'companyindustry'],
  website: ['website', 'companywebsite'],
  logo: ['logo', 'logourl', 'companylogo'],
  linkedin: ['linkedin', 'linkedinurl', 'companylinkedin', 'companylinkedinurl', 'linkedid', 'linkedinid'],
  facebook: ['facebook', 'facebookurl', 'companyfacebookurl'],
  twitter: ['twitter', 'twitterurl', 'companytwitterurl'],
  street: ['street', 'companystreet'],
  city: ['city', 'companycity'],
  state: ['state', 'companystate'],
  country: ['country', 'companycountry'],
  postalCode: ['postalcode', 'zip', 'zipcode', 'companypostalcode', 'companyzip'],
  address: ['address', 'companyaddress', 'fulladdress'],
  keywords: ['keywords', 'seokeywords'],
  technologies: ['technologies', 'tech', 'techstack', 'companytechnologies'],
  sic: ['sic', 'siccodes', 'companysic'],
  naics: ['naics', 'naicscodes', 'companynaics'],
  description: ['description', 'shortdescription', 'seodescription', 'companydescription'],
  foundedYear: ['foundedyear', 'founded', 'yearfounded'],
  partners: ['partners'],
  services: ['services'],
};

// A repeated header gets a secondary field so that no column is lost.
const DUPLICATE_FIELD = { logo: 'logoAlt', technologies: 'technologies2' };

export function slugify(text, max = 80) {
  const s = String(text || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, max)
    .replace(/-+$/g, '');
  return s;
}

export function shortHash(value) {
  return crypto.createHash('md5').update(String(value)).digest('hex').slice(0, 6);
}

/** Build index -> field map from a header row. Returns null if no header cell is recognised. */
export function columnsFromHeader(cells) {
  const lookup = new Map();
  for (const [field, aliases] of Object.entries(HEADER_ALIASES)) {
    for (const a of aliases) lookup.set(a, field);
  }
  const seen = new Set();
  const cols = cells.map((c) => {
    const field = lookup.get(String(c ?? '').toLowerCase().replace(/[^a-z0-9]/g, ''));
    if (!field) return null;
    if (!seen.has(field)) {
      seen.add(field);
      return field;
    }
    return DUPLICATE_FIELD[field] || null;
  });
  return cols.some(Boolean) ? cols : null;
}

// UTF-8 text that was decoded as Windows-1252 (e.g. "ðŸŸ€") is repaired when it round-trips cleanly.
const CP1252 = {
  0x20ac: 0x80, 0x201a: 0x82, 0x0192: 0x83, 0x201e: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87,
  0x02c6: 0x88, 0x2030: 0x89, 0x0160: 0x8a, 0x2039: 0x8b, 0x0152: 0x8c, 0x017d: 0x8e, 0x2018: 0x91,
  0x2019: 0x92, 0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x02dc: 0x98,
  0x2122: 0x99, 0x0161: 0x9a, 0x203a: 0x9b, 0x0153: 0x9c, 0x017e: 0x9e, 0x0178: 0x9f,
};
const MOJI_CONT = '[\\u0080-\\u00bf\\u0152\\u0153\\u0160\\u0161\\u0178\\u017d\\u017e\\u0192\\u02c6\\u02dc\\u2013-\\u203a\\u20ac\\u2122]';
const MOJIBAKE = new RegExp(`[\\u00c2-\\u00f4]${MOJI_CONT}+`, 'g');

function repairRun(run) {
  const bytes = [];
  for (const ch of run) {
    const code = ch.codePointAt(0);
    const b = CP1252[code] ?? code;
    if (b > 0xff) return run;
    bytes.push(b);
  }
  const fixed = Buffer.from(bytes).toString('utf8');
  return fixed.includes('\ufffd') ? run : fixed;
}

const repairMojibake = (s) => s.replace(MOJIBAKE, repairRun);

const clean = (v, max = 500) => {
  const s = repairMojibake(String(v ?? '')).replace(/\s+/g, ' ').trim();
  return s ? s.slice(0, max) : undefined;
};

/** Stable LinkedIn identifier (company slug) used as the primary key for re-imports. */
export function linkedinIdFrom(url) {
  const s = String(url ?? '').trim();
  if (!s) return undefined;
  const m = s.match(/linkedin\.[a-z.]+\/(?:company|school|showcase)\/([^/?#\s]+)/i);
  let id = m ? m[1] : s.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/[?#].*$/, '').replace(/\/+$/, '');
  try {
    id = decodeURIComponent(id);
  } catch {
    // keep raw value
  }
  id = id.toLowerCase().slice(0, 200);
  return id || undefined;
}

const toInt = (v) => {
  const n = parseInt(String(v ?? '').replace(/[^\d]/g, ''), 10);
  return Number.isFinite(n) ? n : undefined;
};

const toList = (v, limit) => {
  const items = String(v ?? '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
  return items.length ? items.slice(0, limit) : [];
};

const toUrl = (v) => {
  const s = clean(v, 500);
  return s && /^https?:\/\//i.test(s) ? s : undefined;
};

/**
 * Normalise one row (array of cells) into a DataCompany-shaped object.
 * `columns` maps cell index -> field name. Returns null when the row has no usable name.
 */
export function normalizeRow(cells, columns = DEFAULT_COLUMNS) {
  const raw = {};
  columns.forEach((field, i) => {
    if (field && cells[i] !== undefined) raw[field] = cells[i];
  });

  const name = clean(raw.name, 200) || clean(raw.domain, 200);
  if (!name) return null;
  // a real company row always has at least one identifier; anything else is a stray text fragment
  if (!clean(raw.domain) && !clean(raw.website) && !clean(raw.linkedin)) return null;

  const domain = clean(raw.domain, 200)?.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
  const industry = clean(raw.industry, 120);
  const city = clean(raw.city, 120);
  const country = clean(raw.country, 120);

  const industrySlug = slugify(industry) || 'uncategorized';
  const citySlug = slugify(city) || 'unknown';
  const slug = slugify(name) || shortHash(name);

  const linkedin = clean(raw.linkedin, 300);
  const linkedinId = linkedinIdFrom(linkedin);
  const fallbackKey = domain || `${slug}|${industrySlug}|${citySlug}`;

  return {
    key: linkedinId ? `li:${linkedinId}` : fallbackKey,
    linkedinId,
    // keys used before LinkedIn became the primary key; lets re-imports adopt old records
    legacyKey: domain || undefined,
    name,
    nameLower: name.toLowerCase(),
    slug,
    domain,
    website: toUrl(raw.website) || (domain ? `https://${domain}` : undefined),
    employees: toInt(raw.employees),
    industry,
    industrySlug,
    logo: toUrl(raw.logo) || toUrl(raw.logoAlt),
    linkedin,
    facebook: clean(raw.facebook, 300),
    twitter: clean(raw.twitter, 300),
    street: clean(raw.street, 200),
    city,
    citySlug,
    state: clean(raw.state, 120),
    country,
    countrySlug: slugify(country) || undefined,
    postalCode: clean(raw.postalCode, 30),
    address: clean(raw.address, 400),
    keywords: toList(raw.keywords, 30),
    technologies: [...new Set([...toList(raw.technologies, 30), ...toList(raw.technologies2, 30)])].slice(0, 40),
    partners: toList(raw.partners, 30),
    services: toList(raw.services, 30),
    sic: clean(raw.sic, 60),
    naics: clean(raw.naics, 60),
    description: clean(raw.description, 1000),
    foundedYear: (() => {
      const y = toInt(raw.foundedYear);
      return y && y >= 1000 && y <= 2100 ? y : undefined;
    })(),
  };
}
