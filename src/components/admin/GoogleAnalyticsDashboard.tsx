"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import type {
  GoogleAnalyticsSnapshot,
  GoogleSource,
} from "@/lib/google/analytics";

function dateDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 }).format(value);
}

function shortPage(value: string) {
  try {
    const url = new URL(value);
    return `${url.pathname}${url.search}`;
  } catch {
    return value;
  }
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-neutral-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-neutral-900">{value}</p>
    </div>
  );
}

function SourceHeader({
  title,
  source,
}: {
  title: string;
  source: GoogleSource<unknown>;
}) {
  const connected = source.status === "connected";
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="font-bold">{title}</h3>
        {source.message && (
          <p className="mt-1 text-xs text-neutral-500">{source.message}</p>
        )}
      </div>
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
          connected ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
        }`}
      >
        {connected ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : (
          <AlertCircle className="h-3.5 w-3.5" />
        )}
        {connected ? "Connecté" : "À configurer"}
      </span>
    </div>
  );
}

export default function GoogleAnalyticsDashboard({ token }: { token: string }) {
  const [startDate, setStartDate] = useState(dateDaysAgo(29));
  const [endDate, setEndDate] = useState(dateDaysAgo(0));
  const [snapshot, setSnapshot] = useState<GoogleAnalyticsSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ start: startDate, end: endDate });
      const response = await fetch(`/api/google/analytics?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Chargement impossible");
      setSnapshot(payload);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Chargement impossible"
      );
    } finally {
      setLoading(false);
    }
  }, [endDate, startDate, token]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Acquisition Google</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Données GA4, Google Ads et Search Console.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <label className="text-xs font-semibold text-neutral-500">
            Du
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="mt-1 block rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs font-semibold text-neutral-500">
            Au
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="mt-1 block rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
          </label>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="flex h-10 items-center gap-2 rounded-full bg-[#6B7F2D] px-4 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Actualiser
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading && !snapshot ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-[#6B7F2D]" />
        </div>
      ) : snapshot ? (
        <div className="mt-6 space-y-4">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <SourceHeader title="Google Analytics 4" source={snapshot.ga4} />
            {snapshot.ga4.data && (
              <>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Metric label="Sessions" value={formatNumber(snapshot.ga4.data.sessions)} />
                  <Metric label="Utilisateurs" value={formatNumber(snapshot.ga4.data.users)} />
                  <Metric label="Événements clés" value={formatNumber(snapshot.ga4.data.keyEvents)} />
                  <Metric label="Événements" value={formatNumber(snapshot.ga4.data.events)} />
                </div>
                {snapshot.ga4.data.topEvents.length > 0 && (
                  <div className="mt-5 overflow-hidden rounded-xl border border-neutral-100">
                    <table className="min-w-full divide-y divide-neutral-100 text-sm">
                      <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-400">
                        <tr>
                          <th className="px-4 py-2.5">Événement GA4</th>
                          <th className="px-4 py-2.5">Événements</th>
                          <th className="px-4 py-2.5">Clés</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {snapshot.ga4.data.topEvents.map((event) => (
                          <tr key={event.eventName}>
                            <td className="px-4 py-2.5 font-medium text-neutral-900">{event.eventName}</td>
                            <td className="px-4 py-2.5">{formatNumber(event.eventCount)}</td>
                            <td className="px-4 py-2.5">{formatNumber(event.keyEvents)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <SourceHeader title="Google Ads" source={snapshot.googleAds} />
            {snapshot.googleAds.data && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Metric label="Dépenses" value={`${formatNumber(snapshot.googleAds.data.cost)} €`} />
                <Metric label="Impressions" value={formatNumber(snapshot.googleAds.data.impressions)} />
                <Metric label="Clics" value={formatNumber(snapshot.googleAds.data.clicks)} />
                <Metric label="Conversions" value={formatNumber(snapshot.googleAds.data.conversions)} />
              </div>
            )}
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <SourceHeader title="Search Console" source={snapshot.searchConsole} />
            {snapshot.searchConsole.data && (
              <>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Metric label="Clics SEO" value={formatNumber(snapshot.searchConsole.data.clicks)} />
                  <Metric label="Impressions" value={formatNumber(snapshot.searchConsole.data.impressions)} />
                  <Metric label="CTR moyen" value={`${formatNumber(snapshot.searchConsole.data.ctr * 100)} %`} />
                  <Metric label="Position moyenne" value={formatNumber(snapshot.searchConsole.data.position)} />
                </div>
                {snapshot.searchConsole.data.topQueries.length > 0 && (
                  <div className="mt-5 overflow-hidden rounded-xl border border-neutral-100">
                    <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 bg-neutral-50 px-4 py-2 text-xs font-semibold uppercase text-neutral-400">
                      <span>Requête</span><span>Clics</span><span>Impr.</span><span>CTR</span><span>Pos.</span>
                    </div>
                    {snapshot.searchConsole.data.topQueries.map((query) => (
                      <div key={query.query} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-t border-neutral-100 px-4 py-3 text-sm">
                        <span className="truncate">{query.query}</span>
                        <span>{formatNumber(query.clicks)}</span>
                        <span>{formatNumber(query.impressions)}</span>
                        <span>{formatNumber(query.ctr * 100)} %</span>
                        <span>{formatNumber(query.position)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {snapshot.searchConsole.data.topPages.length > 0 && (
                  <div className="mt-5 overflow-hidden rounded-xl border border-neutral-100">
                    <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 bg-neutral-50 px-4 py-2 text-xs font-semibold uppercase text-neutral-400">
                      <span>Page</span><span>Clics</span><span>Impr.</span><span>CTR</span><span>Pos.</span>
                    </div>
                    {snapshot.searchConsole.data.topPages.map((page) => (
                      <div key={page.page} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-t border-neutral-100 px-4 py-3 text-sm">
                        <span className="truncate" title={page.page}>{shortPage(page.page)}</span>
                        <span>{formatNumber(page.clicks)}</span>
                        <span>{formatNumber(page.impressions)}</span>
                        <span>{formatNumber(page.ctr * 100)} %</span>
                        <span>{formatNumber(page.position)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
