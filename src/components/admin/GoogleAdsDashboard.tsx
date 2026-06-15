"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import type { AdsReport } from "@/lib/google/ads";

function pct(n: number) {
  return `${(n * 100).toFixed(1)} %`;
}
function eur(n: number) {
  return `${n.toFixed(2)} €`;
}
function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(Math.round(n));
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl bg-neutral-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-neutral-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-neutral-500">{sub}</p>}
    </div>
  );
}

function Badge({ label, color }: { label: string; color: "green" | "red" | "amber" | "neutral" }) {
  const cls = {
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    amber: "bg-amber-50 text-amber-700",
    neutral: "bg-neutral-100 text-neutral-600",
  }[color];
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}

function conversionColor(conversions: number, cost: number): "green" | "red" | "amber" | "neutral" {
  if (conversions > 0) return "green";
  if (cost > 2) return "red";
  if (cost > 0.5) return "amber";
  return "neutral";
}

export default function GoogleAdsDashboard({ token }: { token: string }) {
  const [report, setReport] = useState<AdsReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/ads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setReport(await res.json() as AdsReport);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { void load(); }, [load]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
        {error || "Données indisponibles"}
      </div>
    );
  }

  const connected = report.status === "connected";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            connected ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
          }`}>
            {connected ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
            {connected ? "Google Ads connecté" : "Non connecté"}
          </span>
          {report.period && (
            <span className="text-xs text-neutral-400">
              {report.period.start} → {report.period.end}
            </span>
          )}
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 hover:bg-neutral-50"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Actualiser
        </button>
      </div>

      {report.message && (
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 text-sm text-amber-800">
          {report.message}
        </div>
      )}

      {!connected && (
        <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 text-sm text-neutral-600">
          <p className="font-semibold">Configuration requise</p>
          <p className="mt-1 text-xs">Variables nécessaires : <code>GOOGLE_ADS_CUSTOMER_ID</code>, <code>GOOGLE_ADS_DEVELOPER_TOKEN</code>, <code>GOOGLE_OAUTH_*</code></p>
        </div>
      )}

      {/* Totaux */}
      {report.totals && (
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-neutral-400">30 derniers jours — Total</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Metric label="Impressions" value={fmt(report.totals.impressions)} />
            <Metric label="Clics" value={fmt(report.totals.clicks)} />
            <Metric label="CTR" value={pct(report.totals.ctr)} />
            <Metric label="CPC moyen" value={eur(report.totals.cpc)} />
            <Metric label="Dépensé" value={eur(report.totals.cost)} />
            <Metric label="Conversions" value={String(Math.round(report.totals.conversions))} />
          </div>
        </div>
      )}

      {/* Campagnes */}
      {report.campaigns && report.campaigns.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-neutral-400">Campagnes</h3>
          <div className="overflow-x-auto rounded-xl border border-neutral-100">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs text-neutral-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Campagne</th>
                  <th className="px-4 py-2 text-right font-semibold">Impr.</th>
                  <th className="px-4 py-2 text-right font-semibold">Clics</th>
                  <th className="px-4 py-2 text-right font-semibold">CTR</th>
                  <th className="px-4 py-2 text-right font-semibold">CPC</th>
                  <th className="px-4 py-2 text-right font-semibold">Coût</th>
                  <th className="px-4 py-2 text-right font-semibold">Conv.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {report.campaigns.map((c) => (
                  <tr key={c.id} className="bg-white hover:bg-neutral-50/50">
                    <td className="px-4 py-2.5 font-medium text-neutral-800">{c.name}</td>
                    <td className="px-4 py-2.5 text-right text-neutral-600">{fmt(c.impressions)}</td>
                    <td className="px-4 py-2.5 text-right text-neutral-600">{fmt(c.clicks)}</td>
                    <td className="px-4 py-2.5 text-right text-neutral-600">{pct(c.ctr)}</td>
                    <td className="px-4 py-2.5 text-right text-neutral-600">{eur(c.cpc)}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-neutral-800">{eur(c.cost)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <Badge
                        label={String(Math.round(c.conversions))}
                        color={c.conversions > 0 ? "green" : c.cost > 5 ? "red" : "neutral"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mots-clés actifs */}
      {report.keywords && report.keywords.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-neutral-400">Mots-clés actifs (top 50 par coût)</h3>
          <div className="overflow-x-auto rounded-xl border border-neutral-100">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs text-neutral-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Mot-clé</th>
                  <th className="px-4 py-2 text-left font-semibold">Correspondance</th>
                  <th className="px-4 py-2 text-left font-semibold">Campagne</th>
                  <th className="px-4 py-2 text-right font-semibold">Impr.</th>
                  <th className="px-4 py-2 text-right font-semibold">Clics</th>
                  <th className="px-4 py-2 text-right font-semibold">Coût</th>
                  <th className="px-4 py-2 text-right font-semibold">Conv.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {report.keywords.map((k, i) => (
                  <tr key={i} className="bg-white hover:bg-neutral-50/50">
                    <td className="px-4 py-2.5 font-mono text-xs text-neutral-800">{k.text}</td>
                    <td className="px-4 py-2.5 text-xs text-neutral-500">
                      {k.matchType === "BROAD" ? "Large" : k.matchType === "PHRASE" ? "Expression" : "Exact"}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-neutral-500">{k.campaign}</td>
                    <td className="px-4 py-2.5 text-right text-neutral-600">{fmt(k.impressions)}</td>
                    <td className="px-4 py-2.5 text-right text-neutral-600">{fmt(k.clicks)}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-neutral-800">{eur(k.cost)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <Badge label={String(Math.round(k.conversions))} color={k.conversions > 0 ? "green" : "neutral"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Termes de recherche */}
      {report.searchTerms && report.searchTerms.length > 0 && (
        <div>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-neutral-400">
            Termes de recherche réels (top 100 par coût)
          </h3>
          <p className="mb-3 text-xs text-neutral-500">
            Les termes en rouge (coût &gt; 2 € et 0 conversion) sont à considérer comme mots-clés négatifs.
          </p>
          <div className="overflow-x-auto rounded-xl border border-neutral-100">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs text-neutral-500">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Terme recherché</th>
                  <th className="px-4 py-2 text-left font-semibold">Campagne</th>
                  <th className="px-4 py-2 text-right font-semibold">Impr.</th>
                  <th className="px-4 py-2 text-right font-semibold">Clics</th>
                  <th className="px-4 py-2 text-right font-semibold">Coût</th>
                  <th className="px-4 py-2 text-right font-semibold">Conv.</th>
                  <th className="px-4 py-2 text-right font-semibold">Signal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {report.searchTerms.map((st, i) => {
                  const isWaste = st.cost > 2 && st.conversions === 0;
                  const isGood = st.conversions > 0;
                  return (
                    <tr key={i} className={`bg-white hover:bg-neutral-50/50 ${isWaste ? "bg-red-50/30" : ""}`}>
                      <td className={`px-4 py-2.5 font-mono text-xs ${isWaste ? "text-red-700 font-semibold" : "text-neutral-800"}`}>
                        {st.term}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-neutral-500">{st.campaign}</td>
                      <td className="px-4 py-2.5 text-right text-neutral-600">{fmt(st.impressions)}</td>
                      <td className="px-4 py-2.5 text-right text-neutral-600">{fmt(st.clicks)}</td>
                      <td className={`px-4 py-2.5 text-right font-semibold ${isWaste ? "text-red-700" : "text-neutral-800"}`}>
                        {eur(st.cost)}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <Badge
                          label={String(Math.round(st.conversions))}
                          color={conversionColor(st.conversions, st.cost)}
                        />
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {isGood && <TrendingUp className="ml-auto h-4 w-4 text-green-600" />}
                        {isWaste && <TrendingDown className="ml-auto h-4 w-4 text-red-500" />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
