"use client";

import { useState, useCallback } from "react";
import {
  Plus, Pencil, Trash2, Eye, LogOut, Save, X, Loader2,
  BarChart3, FileText, Home, Building2, Store, PartyPopper, Info,
} from "lucide-react";
import GoogleAnalyticsDashboard from "@/components/admin/GoogleAnalyticsDashboard";

/* ─── Types ─── */
interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string;
  featuredImageAlt: string;
  metaTitle: string;
  metaDescription: string;
  status: "draft" | "published";
  publishedAt: string;
}

interface PageData {
  pageKey: string;
  data: Record<string, unknown>;
}

const emptyArticle: {
  slug: string; title: string; excerpt: string; content: string; category: string;
  featuredImage: string; featuredImageAlt: string; metaTitle: string; metaDescription: string;
  status: "draft" | "published"; publishedAt: string;
} = {
  slug: "", title: "", excerpt: "", content: "", category: "entreprise",
  featuredImage: "", featuredImageAlt: "", metaTitle: "", metaDescription: "",
  status: "draft", publishedAt: new Date().toISOString().split("T")[0],
};

const articleCategories = [
  { value: "entreprise", label: "Entreprise" },
  { value: "foires-salons", label: "Foires & Salons" },
  { value: "evenements-prives", label: "Événements privés" },
  { value: "rse", label: "RSE & Engagement" },
  { value: "conseils", label: "Conseils" },
];

const tabs = [
  { key: "analytics", label: "Statistiques", icon: BarChart3 },
  { key: "articles", label: "Articles", icon: FileText },
  { key: "home", label: "Accueil", icon: Home },
  { key: "entreprises", label: "Entreprises", icon: Building2 },
  { key: "foires-salons", label: "Foires & Salons", icon: Store },
  { key: "evenements-prives", label: "Événements Privés", icon: PartyPopper },
  { key: "a-propos", label: "À Propos", icon: Info },
];

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* ─── Reusable components ─── */
function Input({ label, value, onChange, type = "text", mono = false, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; mono?: boolean; placeholder?: string;
}) {
  return (
    <div className="mt-3">
      <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={`mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#6B7F2D] ${mono ? "font-mono" : ""}`} />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 3, mono = false }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; mono?: boolean;
}) {
  return (
    <div className="mt-3">
      <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
        className={`mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#6B7F2D] ${mono ? "font-mono" : ""}`} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-neutral-100 bg-white p-5">
      <h3 className="text-sm font-bold uppercase tracking-wider text-[#6B7F2D]">{title}</h3>
      {children}
    </div>
  );
}

/* ─── Main Admin Panel ─── */
export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState("articles");
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<(typeof emptyArticle & { id?: number }) | null>(null);
  const [pageData, setPageData] = useState<Record<string, Record<string, unknown>>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchArticles = useCallback(async () => {
    const res = await fetch("/api/articles");
    setArticles(await res.json());
  }, []);

  const fetchPages = useCallback(async () => {
    const res = await fetch("/api/pages");
    const pages: PageData[] = await res.json();
    const map: Record<string, Record<string, unknown>> = {};
    for (const p of pages) map[p.pageKey] = p.data as Record<string, unknown>;
    setPageData(map);
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (res.ok) {
      setToken(password);
      await Promise.all([fetchArticles(), fetchPages()]);
    }
    else setError("Mot de passe incorrect");
  };

  const saveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setLoading(true); setError("");
    const isNew = !editing.id;
    const res = await fetch(isNew ? "/api/articles" : `/api/articles/${editing.id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(editing),
    });
    if (res.ok) { setEditing(null); await fetchArticles(); setSuccess("Article sauvegardé"); setTimeout(() => setSuccess(""), 3000); }
    else { const d = await res.json(); setError(d.error || "Erreur"); }
    setLoading(false);
  };

  const deleteArticle = async (id: number) => {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch(`/api/articles/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    await fetchArticles();
  };

  const savePage = async (pageKey: string) => {
    setSaving(true); setError(""); setSuccess("");
    const res = await fetch(`/api/pages/${pageKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ data: pageData[pageKey] }),
    });
    if (res.ok) { setSuccess(`Page "${pageKey}" sauvegardée`); setTimeout(() => setSuccess(""), 3000); }
    else { setError("Erreur lors de la sauvegarde"); }
    setSaving(false);
  };

  const updatePageField = (pageKey: string, path: string, value: unknown) => {
    setPageData((prev) => {
      const page = JSON.parse(JSON.stringify(prev[pageKey] || {}));
      const keys = path.split(".");
      let obj = page;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return { ...prev, [pageKey]: page };
    });
  };

  const getField = (pageKey: string, path: string, fallback = ""): string => {
    try {
      const keys = path.split(".");
      let obj: unknown = pageData[pageKey];
      for (const k of keys) obj = (obj as Record<string, unknown>)?.[k];
      return (obj as string) ?? fallback;
    } catch { return fallback; }
  };

  const getArray = (pageKey: string, path: string): unknown[] => {
    try {
      const keys = path.split(".");
      let obj: unknown = pageData[pageKey];
      for (const k of keys) obj = (obj as Record<string, unknown>)?.[k];
      return Array.isArray(obj) ? obj : [];
    } catch { return []; }
  };

  /* ─── Login ─── */
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Admin</h1>
          <p className="mt-2 text-sm text-neutral-500">Entrez le mot de passe administrateur</p>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe"
            className="mt-6 w-full rounded-xl border-2 border-neutral-200 px-4 py-3 text-sm outline-none focus:border-[#6B7F2D]" />
          <button type="submit" className="mt-4 w-full rounded-full bg-[#6B7F2D] py-3 text-sm font-semibold text-white hover:bg-[#4A5A1E]">
            Connexion
          </button>
        </form>
      </div>
    );
  }

  /* ─── Article Editor ─── */
  if (editing) {
    return (
      <div className="min-h-screen bg-neutral-50 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{editing.id ? "Modifier" : "Nouvel"} article</h1>
            <button onClick={() => setEditing(null)} className="flex items-center gap-1 text-sm text-neutral-500 hover:text-black">
              <X className="h-4 w-4" /> Annuler
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          <form onSubmit={saveArticle} className="mt-6 space-y-4">
            <Section title="Contenu">
              <Input label="Titre" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v, slug: editing.slug || slugify(v), metaTitle: editing.metaTitle || v })} />
              <Input label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} mono />
              <Textarea label="Extrait" value={editing.excerpt} onChange={(v) => setEditing({ ...editing, excerpt: v })} rows={2} />
              <Textarea label="Contenu (HTML)" value={editing.content} onChange={(v) => setEditing({ ...editing, content: v })} rows={10} mono />
            </Section>
            <Section title="Paramètres">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider">Catégorie</label>
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#6B7F2D]">
                    {articleCategories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider">Statut</label>
                  <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as "draft" })}
                    className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#6B7F2D]">
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                  </select>
                </div>
                <Input label="Date" value={editing.publishedAt?.split("T")[0]} onChange={(v) => setEditing({ ...editing, publishedAt: v })} type="date" />
              </div>
            </Section>
            <Section title="Image & SEO">
              <Input label="Image (chemin)" value={editing.featuredImage} onChange={(v) => setEditing({ ...editing, featuredImage: v })} placeholder="/photos site/mon-image.webp" />
              <Input label="Alt image" value={editing.featuredImageAlt} onChange={(v) => setEditing({ ...editing, featuredImageAlt: v })} />
              <Input label="Meta Title" value={editing.metaTitle} onChange={(v) => setEditing({ ...editing, metaTitle: v })} />
              <Textarea label="Meta Description" value={editing.metaDescription} onChange={(v) => setEditing({ ...editing, metaDescription: v })} rows={2} />
            </Section>
            <button type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6B7F2D] py-3 text-sm font-semibold text-white hover:bg-[#4A5A1E] disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editing.id ? "Mettre à jour" : "Créer"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ─── Page Editor helper ─── */
  const renderPageEditor = (pageKey: string) => {
    if (!pageData[pageKey]) return <p className="py-12 text-center text-sm text-neutral-400">Chargement...</p>;

    const p = (path: string, fallback = "") => getField(pageKey, path, fallback);
    const up = (path: string, value: unknown) => updatePageField(pageKey, path, value);
    const arr = (path: string) => getArray(pageKey, path);

    const renderFaqEditor = () => {
      const faq = arr("faq") as { question: string; answer: string }[];
      return (
        <Section title="FAQ">
          {faq.map((item, i) => (
            <div key={i} className="mt-3 rounded-lg border border-neutral-100 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400">Question {i + 1}</span>
                <button type="button" onClick={() => { const nf = [...faq]; nf.splice(i, 1); up("faq", nf); }}
                  className="text-xs text-red-400 hover:text-red-600">Supprimer</button>
              </div>
              <Input label="Question" value={item.question} onChange={(v) => { const nf = [...faq]; nf[i] = { ...nf[i], question: v }; up("faq", nf); }} />
              <Textarea label="Réponse" value={item.answer} onChange={(v) => { const nf = [...faq]; nf[i] = { ...nf[i], answer: v }; up("faq", nf); }} rows={2} />
            </div>
          ))}
          <button type="button" onClick={() => up("faq", [...faq, { question: "", answer: "" }])}
            className="mt-3 flex items-center gap-1 text-xs font-medium text-[#6B7F2D] hover:underline">
            <Plus className="h-3 w-3" /> Ajouter une question
          </button>
        </Section>
      );
    };

    const renderHeroEditor = () => (
      <Section title="Hero / En-tête">
        <Input label="Sous-titre" value={p("hero.subtitle")} onChange={(v) => up("hero.subtitle", v)} />
        <Input label="Titre" value={p("hero.title")} onChange={(v) => up("hero.title", v)} />
        {p("hero.titleAccent") !== undefined && <Input label="Titre accent" value={p("hero.titleAccent")} onChange={(v) => up("hero.titleAccent", v)} />}
        {p("hero.titleLine1") !== undefined && (
          <>
            <Input label="Titre ligne 1" value={p("hero.titleLine1")} onChange={(v) => up("hero.titleLine1", v)} />
            <Input label="Titre ligne 2" value={p("hero.titleLine2")} onChange={(v) => up("hero.titleLine2", v)} />
            {p("hero.titleLine3") !== undefined && <Input label="Titre ligne 3" value={p("hero.titleLine3")} onChange={(v) => up("hero.titleLine3", v)} />}
          </>
        )}
        <Textarea label="Description" value={p("hero.description")} onChange={(v) => up("hero.description", v)} />
        <Input label="Image" value={p("hero.image")} onChange={(v) => up("hero.image", v)} placeholder="/photos site/..." />
        {p("hero.badge") !== undefined && <Input label="Badge" value={p("hero.badge")} onChange={(v) => up("hero.badge", v)} />}
      </Section>
    );

    /* ─── Per-page editors ─── */
    if (pageKey === "home") {
      const features = arr("concept.features") as { title: string; description: string }[];
      const cards = arr("services.cards") as { title: string; subtitle: string; description: string; features: string[] }[];
      const offerings = arr("services.offerings") as string[];
      return (
        <>
          {renderHeroEditor()}
          <Section title="Concept">
            <Input label="Sous-titre" value={p("concept.subtitle")} onChange={(v) => up("concept.subtitle", v)} />
            <Input label="Titre L1" value={p("concept.titleLine1")} onChange={(v) => up("concept.titleLine1", v)} />
            <Input label="Titre L2" value={p("concept.titleLine2")} onChange={(v) => up("concept.titleLine2", v)} />
            <Input label="Titre L3" value={p("concept.titleLine3")} onChange={(v) => up("concept.titleLine3", v)} />
            <Textarea label="Description 1" value={p("concept.description1")} onChange={(v) => up("concept.description1", v)} />
            <Textarea label="Description 2" value={p("concept.description2")} onChange={(v) => up("concept.description2", v)} />
            <Input label="Badge nombre" value={p("concept.badgeNumber")} onChange={(v) => up("concept.badgeNumber", v)} />
            <Input label="Badge label" value={p("concept.badgeLabel")} onChange={(v) => up("concept.badgeLabel", v)} />
            <Input label="Image" value={p("concept.image")} onChange={(v) => up("concept.image", v)} />
            <h4 className="mt-4 text-xs font-bold text-neutral-400">Engagements (3 cartes)</h4>
            {features.map((f, i) => (
              <div key={i} className="mt-2 rounded-lg border border-neutral-50 bg-neutral-50 p-3">
                <Input label={`Carte ${i + 1} - Titre`} value={f.title} onChange={(v) => { const nf = [...features]; nf[i] = { ...nf[i], title: v }; up("concept.features", nf); }} />
                <Textarea label="Description" value={f.description} onChange={(v) => { const nf = [...features]; nf[i] = { ...nf[i], description: v }; up("concept.features", nf); }} rows={2} />
              </div>
            ))}
          </Section>
          <Section title="Services">
            <Input label="Sous-titre" value={p("services.subtitle")} onChange={(v) => up("services.subtitle", v)} />
            <Input label="Titre L1" value={p("services.titleLine1")} onChange={(v) => up("services.titleLine1", v)} />
            <Input label="Titre L2" value={p("services.titleLine2")} onChange={(v) => up("services.titleLine2", v)} />
            <Textarea label="Description" value={p("services.description")} onChange={(v) => up("services.description", v)} />
            {cards.map((c, i) => (
              <div key={i} className="mt-3 rounded-lg border border-neutral-50 bg-neutral-50 p-3">
                <Input label={`Service ${i + 1} - Titre`} value={c.title} onChange={(v) => { const nc = [...cards]; nc[i] = { ...nc[i], title: v }; up("services.cards", nc); }} />
                <Input label="Sous-titre" value={c.subtitle} onChange={(v) => { const nc = [...cards]; nc[i] = { ...nc[i], subtitle: v }; up("services.cards", nc); }} />
                <Textarea label="Description" value={c.description} onChange={(v) => { const nc = [...cards]; nc[i] = { ...nc[i], description: v }; up("services.cards", nc); }} rows={2} />
                <Textarea label="Features (une par ligne)" value={c.features?.join("\n") || ""} onChange={(v) => { const nc = [...cards]; nc[i] = { ...nc[i], features: v.split("\n").filter(Boolean) }; up("services.cards", nc); }} rows={3} />
              </div>
            ))}
            <h4 className="mt-4 text-xs font-bold text-neutral-400">Barre d&apos;offres</h4>
            <Textarea label="Offres (une par ligne)" value={offerings.join("\n")} onChange={(v) => up("services.offerings", v.split("\n").filter(Boolean))} rows={3} />
          </Section>
        </>
      );
    }

    if (pageKey === "entreprises") {
      const prestations = arr("prestations") as { title: string; subtitle: string; description: string; longDescription: string; features: string[] }[];
      return (
        <>
          {renderHeroEditor()}
          <Section title="Prestations">
            {prestations.map((pr, i) => (
              <div key={i} className="mt-3 rounded-lg border border-neutral-50 bg-neutral-50 p-3">
                <Input label={`Prestation ${i + 1} - Titre`} value={pr.title} onChange={(v) => { const np = [...prestations]; np[i] = { ...np[i], title: v }; up("prestations", np); }} />
                <Input label="Sous-titre" value={pr.subtitle} onChange={(v) => { const np = [...prestations]; np[i] = { ...np[i], subtitle: v }; up("prestations", np); }} />
                <Textarea label="Description" value={pr.description} onChange={(v) => { const np = [...prestations]; np[i] = { ...np[i], description: v }; up("prestations", np); }} rows={2} />
                <Textarea label="Description longue" value={pr.longDescription} onChange={(v) => { const np = [...prestations]; np[i] = { ...np[i], longDescription: v }; up("prestations", np); }} rows={3} />
                <Textarea label="Services (un par ligne)" value={pr.features?.join("\n") || ""} onChange={(v) => { const np = [...prestations]; np[i] = { ...np[i], features: v.split("\n").filter(Boolean) }; up("prestations", np); }} rows={5} />
              </div>
            ))}
          </Section>
          <Section title="CTA">
            <Input label="Titre" value={p("cta.title")} onChange={(v) => up("cta.title", v)} />
            <Textarea label="Description" value={p("cta.description")} onChange={(v) => up("cta.description", v)} />
            <Input label="Texte bouton" value={p("cta.buttonText")} onChange={(v) => up("cta.buttonText", v)} />
          </Section>
          {renderFaqEditor()}
        </>
      );
    }

    if (pageKey === "foires-salons") {
      const services = arr("services") as { title: string; description: string }[];
      const steps = arr("steps") as { step: string; title: string; description: string }[];
      return (
        <>
          {renderHeroEditor()}
          <Section title="Introduction">
            <Input label="Sous-titre" value={p("intro.subtitle")} onChange={(v) => up("intro.subtitle", v)} />
            <Input label="Titre L1" value={p("intro.titleLine1")} onChange={(v) => up("intro.titleLine1", v)} />
            <Input label="Titre L2" value={p("intro.titleLine2")} onChange={(v) => up("intro.titleLine2", v)} />
            <Textarea label="Description 1" value={p("intro.description1")} onChange={(v) => up("intro.description1", v)} />
            <Textarea label="Description 2" value={p("intro.description2")} onChange={(v) => up("intro.description2", v)} />
          </Section>
          <Section title="Services (6 cartes)">
            {services.map((s, i) => (
              <div key={i} className="mt-2 rounded-lg border border-neutral-50 bg-neutral-50 p-3">
                <Input label={`Service ${i + 1} - Titre`} value={s.title} onChange={(v) => { const ns = [...services]; ns[i] = { ...ns[i], title: v }; up("services", ns); }} />
                <Textarea label="Description" value={s.description} onChange={(v) => { const ns = [...services]; ns[i] = { ...ns[i], description: v }; up("services", ns); }} rows={2} />
              </div>
            ))}
          </Section>
          <Section title="Processus (4 étapes)">
            {steps.map((s, i) => (
              <div key={i} className="mt-2 rounded-lg border border-neutral-50 bg-neutral-50 p-3">
                <Input label={`Étape ${s.step} - Titre`} value={s.title} onChange={(v) => { const ns = [...steps]; ns[i] = { ...ns[i], title: v }; up("steps", ns); }} />
                <Textarea label="Description" value={s.description} onChange={(v) => { const ns = [...steps]; ns[i] = { ...ns[i], description: v }; up("steps", ns); }} rows={2} />
              </div>
            ))}
          </Section>
          <Section title="CTA">
            <Input label="Titre" value={p("cta.title")} onChange={(v) => up("cta.title", v)} />
            <Textarea label="Description" value={p("cta.description")} onChange={(v) => up("cta.description", v)} />
            <Input label="Texte bouton" value={p("cta.buttonText")} onChange={(v) => up("cta.buttonText", v)} />
          </Section>
          {renderFaqEditor()}
        </>
      );
    }

    if (pageKey === "evenements-prives") {
      const celebrations = arr("celebrations") as { title: string; description: string }[];
      const whyUs = arr("whyUs") as string[];
      return (
        <>
          {renderHeroEditor()}
          <Section title="Introduction">
            <Input label="Sous-titre" value={p("intro.subtitle")} onChange={(v) => up("intro.subtitle", v)} />
            <Input label="Titre L1" value={p("intro.titleLine1")} onChange={(v) => up("intro.titleLine1", v)} />
            <Input label="Titre L2" value={p("intro.titleLine2")} onChange={(v) => up("intro.titleLine2", v)} />
            <Textarea label="Description 1" value={p("intro.description1")} onChange={(v) => up("intro.description1", v)} />
            <Textarea label="Description 2" value={p("intro.description2")} onChange={(v) => up("intro.description2", v)} />
          </Section>
          <Section title="Célébrations (6 cartes)">
            {celebrations.map((c, i) => (
              <div key={i} className="mt-2 rounded-lg border border-neutral-50 bg-neutral-50 p-3">
                <Input label={`Célébration ${i + 1} - Titre`} value={c.title} onChange={(v) => { const nc = [...celebrations]; nc[i] = { ...nc[i], title: v }; up("celebrations", nc); }} />
                <Textarea label="Description" value={c.description} onChange={(v) => { const nc = [...celebrations]; nc[i] = { ...nc[i], description: v }; up("celebrations", nc); }} rows={2} />
              </div>
            ))}
          </Section>
          <Section title="Pourquoi nous choisir">
            <Textarea label="Arguments (un par ligne)" value={whyUs.join("\n")} onChange={(v) => up("whyUs", v.split("\n").filter(Boolean))} rows={6} />
          </Section>
          <Section title="CTA">
            <Input label="Titre" value={p("cta.title")} onChange={(v) => up("cta.title", v)} />
            <Textarea label="Description" value={p("cta.description")} onChange={(v) => up("cta.description", v)} />
            <Input label="Texte bouton" value={p("cta.buttonText")} onChange={(v) => up("cta.buttonText", v)} />
          </Section>
          {renderFaqEditor()}
        </>
      );
    }

    if (pageKey === "a-propos") {
      const timeline = arr("timeline") as { year: string; title: string; event: string }[];
      return (
        <>
          {renderHeroEditor()}
          <Section title="Notre histoire">
            <Input label="Sous-titre" value={p("story.subtitle")} onChange={(v) => up("story.subtitle", v)} />
            <Input label="Titre L1" value={p("story.titleLine1")} onChange={(v) => up("story.titleLine1", v)} />
            <Input label="Titre L2" value={p("story.titleLine2")} onChange={(v) => up("story.titleLine2", v)} />
            <Input label="Titre L3" value={p("story.titleLine3")} onChange={(v) => up("story.titleLine3", v)} />
            <Textarea label="Description 1" value={p("story.description1")} onChange={(v) => up("story.description1", v)} />
            <Textarea label="Description 2" value={p("story.description2")} onChange={(v) => up("story.description2", v)} />
            <Textarea label="Description 3" value={p("story.description3")} onChange={(v) => up("story.description3", v)} />
            <Input label="Badge nombre" value={p("story.badgeNumber")} onChange={(v) => up("story.badgeNumber", v)} />
            <Input label="Badge label" value={p("story.badgeLabel")} onChange={(v) => up("story.badgeLabel", v)} />
          </Section>
          <Section title="Timeline">
            {timeline.map((t, i) => (
              <div key={i} className="mt-2 rounded-lg border border-neutral-50 bg-neutral-50 p-3">
                <div className="grid grid-cols-3 gap-2">
                  <Input label="Année" value={t.year} onChange={(v) => { const nt = [...timeline]; nt[i] = { ...nt[i], year: v }; up("timeline", nt); }} />
                  <div className="col-span-2">
                    <Input label="Titre" value={t.title} onChange={(v) => { const nt = [...timeline]; nt[i] = { ...nt[i], title: v }; up("timeline", nt); }} />
                  </div>
                </div>
                <Input label="Description" value={t.event} onChange={(v) => { const nt = [...timeline]; nt[i] = { ...nt[i], event: v }; up("timeline", nt); }} />
              </div>
            ))}
            <button type="button" onClick={() => up("timeline", [...timeline, { year: "", title: "", event: "" }])}
              className="mt-3 flex items-center gap-1 text-xs font-medium text-[#6B7F2D] hover:underline">
              <Plus className="h-3 w-3" /> Ajouter une étape
            </button>
          </Section>
          <Section title="Contact">
            <Input label="Adresse" value={p("contact.address")} onChange={(v) => up("contact.address", v)} />
            <Input label="Complément adresse" value={p("contact.addressLine2")} onChange={(v) => up("contact.addressLine2", v)} />
            <Input label="Téléphone" value={p("contact.phone")} onChange={(v) => up("contact.phone", v)} />
            <Input label="Email" value={p("contact.email")} onChange={(v) => up("contact.email", v)} />
            <Input label="Horaires L1" value={p("contact.hoursLine1")} onChange={(v) => up("contact.hoursLine1", v)} />
            <Input label="Horaires L2" value={p("contact.hoursLine2")} onChange={(v) => up("contact.hoursLine2", v)} />
          </Section>
          {renderFaqEditor()}
        </>
      );
    }

    return null;
  };

  /* ─── Main Layout ─── */
  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-56 shrink-0 border-r border-neutral-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Admin</h1>
          <button onClick={() => { setToken(""); setPassword(""); }}
            className="ml-auto rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
        <nav className="mt-6 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeTab === tab.key ? "bg-[#6B7F2D]/10 font-semibold text-[#6B7F2D]" : "text-neutral-600 hover:bg-neutral-100"
                }`}>
                <Icon className="h-4 w-4" /> {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          {/* Toast */}
          {success && (
            <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {success}
            </div>
          )}
          {error && !editing && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Analytics tab */}
          {activeTab === "analytics" && (
            <GoogleAnalyticsDashboard token={token} />
          )}

          {/* Articles tab */}
          {activeTab === "articles" && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Articles du blog</h2>
                <button onClick={() => setEditing({ ...emptyArticle })}
                  className="flex items-center gap-2 rounded-full bg-[#6B7F2D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4A5A1E]">
                  <Plus className="h-4 w-4" /> Nouvel article
                </button>
              </div>
              <div className="mt-6 space-y-2">
                {articles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${article.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                          {article.status === "published" ? "Publié" : "Brouillon"}
                        </span>
                        <span className="text-xs text-neutral-400">{articleCategories.find((c) => c.value === article.category)?.label}</span>
                      </div>
                      <h3 className="mt-1 truncate text-sm font-semibold">{article.title}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      {article.status === "published" && (
                        <a href={`/blog/${article.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-black">
                          <Eye className="h-4 w-4" />
                        </a>
                      )}
                      <button onClick={() => setEditing({ ...article, publishedAt: new Date(article.publishedAt).toISOString() })}
                        className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-black">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => deleteArticle(article.id)}
                        className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {articles.length === 0 && <p className="py-12 text-center text-sm text-neutral-400">Aucun article</p>}
              </div>
            </>
          )}

          {/* Page tabs */}
          {activeTab !== "articles" && activeTab !== "analytics" && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {tabs.find((t) => t.key === activeTab)?.label}
                </h2>
                <button onClick={() => savePage(activeTab)} disabled={saving}
                  className="flex items-center gap-2 rounded-full bg-[#6B7F2D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4A5A1E] disabled:opacity-50">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Sauvegarder
                </button>
              </div>
              {renderPageEditor(activeTab)}
              <div className="mt-6">
                <button onClick={() => savePage(activeTab)} disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6B7F2D] py-3 text-sm font-semibold text-white hover:bg-[#4A5A1E] disabled:opacity-50">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Sauvegarder les modifications
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
