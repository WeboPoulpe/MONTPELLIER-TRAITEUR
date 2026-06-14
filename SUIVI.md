# Suivi du projet Traiteur Montpellier

Derniere mise a jour : 15 juin 2026

Ce fichier sert a coordonner le travail effectue dans plusieurs fenetres Codex.

## Regles de coordination

1. Lire ce fichier avant de commencer une tache.
2. Ajouter la tache dans "Travail en cours" avant de modifier des fichiers.
3. Indiquer la fenetre, les fichiers concernes et le statut.
4. Eviter de travailler en parallele sur les memes fichiers.
5. A la fin, deplacer la tache dans "Termine" et noter les verifications lancees.
6. Ne pas supprimer ou annuler des modifications non identifiees sans coordination.

## Travail en cours

| Fenetre | Sujet | Fichiers ou zones concernes | Statut |
| --- | --- | --- | --- |
| Fenetre 1 | Modifications deja presentes dans le worktree : tracking, consentement, navigation et SEO local | `src/app/devis/DevisContent.tsx`, `src/app/layout.tsx`, `src/app/politique-confidentialite/PolitiqueContent.tsx`, `src/app/sitemap.ts`, `src/app/guide-local/`, `src/components/CookieBanner.tsx`, `src/components/Footer.tsx`, `src/components/LayoutShell.tsx`, `src/components/TrackingEvents.tsx`, `src/lib/tracking.ts` | En cours, ne pas ecraser |
| Fenetre 2 | Vrais avis Google et remontee des donnees GA4, Google Ads et Search Console | `src/components/Testimonials.tsx`, `src/components/GoogleTestimonials.tsx`, `src/components/admin/`, `src/lib/google/`, `src/app/api/google/`, `src/app/admin/AdminPanel.tsx`, `src/app/page.tsx`, `GOOGLE_SETUP.md` | Avis Google valides localement, variables Vercel a ajouter |

## Termine

| Date | Fenetre | Sujet | Verification |
| --- | --- | --- | --- |
| 14 juin 2026 | Fenetre 1 | Creation du fichier de coordination `SUIVI.md` | Etat Git consulte |
| 14 juin 2026 | Fenetre 2 | Integration Google Places pour les vrais avis et tableau de bord GA4, Google Ads, Search Console | TypeScript, lint cible, build de production et controle visuel local valides |
| 14 juin 2026 | Fenetre 3 | Optimisation SEO technique, schemas Service/FAQ/Breadcrumb/Article, tracking attribution et tunnel, tableau GSC enrichi | Lint cible, build production et controle HTML local valides |
| 15 juin 2026 | Fenetre 2 | Connexion de la fiche Google Traiteur Montpellier | Fiche `ChIJ4ys98chUV0ARmWHI_ODHRnU`, note 4,9/5, 354 avis et avis reels verifies localement ; build production valide |
| 15 juin 2026 | Fenetre 3 | Analyse de l'export GSC avant nouvelles optimisations editoriales | Export du 15 juin analyse ; rapport `ANALYSE_GSC_2026-06-15.md` cree ; aucune modification des contenus SEO |

## Notes et blocages

- Branche actuelle au moment de la creation : `main`.
- Dernier commit observe : `efb80f9 Perf: cache DB avec revalidateTag, pages publiques force-static`.
- Les modifications listees dans "Travail en cours" existaient avant la creation de ce fichier.
- Les variables Places sont presentes dans `.env.local`, fichier ignore par Git.
- Ajouter `GOOGLE_PLACES_API_KEY` et `GOOGLE_PLACE_ID` dans Vercel pour la production.
- L'integration des avis accepte maintenant la meme cle Places que Recacor et
  recherche automatiquement la fiche Traiteur Montpellier. La variable Places
  actuelle de Recacor est vide dans Vercel, meme si l'ancien deploiement conserve
  encore une cle active.
- Le lint global conserve une erreur anterieure dans `src/components/Header.tsx`; les fichiers de la fenetre 2 passent le lint cible.
- L'export GSC couvre effectivement 60 jours, du 14 avril au 12 juin 2026, malgre le filtre affiche "12 derniers mois".
- Priorite SEO identifiee : page dediee mariage, puis renforcement entreprise et verification de l'URL `/devis` avec UTM Google Business Profile.
- Un ancien export GSC sans `www` du 9 decembre 2025 au 8 mars 2026 a ete compare. La visibilite recente progresse, mais le CTR et les clics quotidiens reculent.
- Les fichiers GA4 et Ads generiques retrouves dans `Downloads` concernent d'autres projets et ont ete exclus de l'analyse Traiteur.
