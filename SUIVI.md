# Suivi du projet Traiteur Montpellier

Derniere mise a jour : 18 juin 2026

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
| Codex | Surveiller prochain vrai devis | GA4 / Google Ads / CRM | Confirmer que `generate_lead` remonte bien comme evenement cle et que la conversion Ads correspond au lead CRM |
| Codex | App Lovable cockpit conversions | Lovable / `LOVABLE_APP.md` / leads site | App creee ; API site dediee ajoutee ; prochaine etape : ajouter `LOVABLE_LEADS_API_TOKEN` dans Vercel et connecter Lovable |

## Termine

| Date | Fenetre | Sujet | Verification |
| --- | --- | --- | --- |
| 14 juin 2026 | Fenetre 1 | Creation du fichier de coordination `SUIVI.md` | Etat Git consulte |
| 14 juin 2026 | Fenetre 2 | Integration Google Places pour les vrais avis et tableau de bord GA4, Google Ads, Search Console | TypeScript, lint cible, build de production et controle visuel local valides |
| 14 juin 2026 | Fenetre 3 | Optimisation SEO technique, schemas Service/FAQ/Breadcrumb/Article, tracking attribution et tunnel, tableau GSC enrichi | Lint cible, build production et controle HTML local valides |
| 15 juin 2026 | Fenetre 2 | Connexion de la fiche Google Traiteur Montpellier | Fiche `ChIJ4ys98chUV0ARmWHI_ODHRnU`, note 4,9/5, 354 avis et avis reels verifies localement ; build production valide |
| 15 juin 2026 | Fenetre 3 | Analyse de l'export GSC avant nouvelles optimisations editoriales | Export du 15 juin analyse ; rapport `ANALYSE_GSC_2026-06-15.md` cree ; aucune modification des contenus SEO |
| 15 juin 2026 | Fenetre 3 | Rapprochement des exports CRM Contacts et Ventes | 95 ventes et 64 clients regroupes ; export prive `outputs/private_crm/CA_par_client_Traiteur_Montpellier_2026-06-15.csv` cree et exclu de Git |
| 15 juin 2026 | Fenetre 3 | Stockage serveur des leads et preparation des conversions hors ligne | Table `lead_submissions`, capture GCLID/GBRAID/WBRAID, export admin CSV et documentation Google Ads ajoutes ; migration generee mais non appliquee |
| 15 juin 2026 | Claude Code | Commit et deploy de tout le travail Codex (41 fichiers) | Deploye sur www.traiteurmontpellier.com - build OK |
| 15 juin 2026 | Claude Code | Fix double cookie banner - suppression CookieBanner.tsx (Clickio via GTM conserve) | Deploye et verifie |
| 15 juin 2026 | Claude Code | Variables Vercel ajoutees : GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID, GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN, GA4_PROPERTY_ID, SEARCH_CONSOLE_SITE_URL, GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CUSTOMER_ID (6155175246), GOOGLE_ADS_LOGIN_CUSTOMER_ID | Verifies dans Vercel |
| 15 juin 2026 | Claude Code | Audit complet GA4 + Search Console + Google Ads via API | 419 sessions/mois, 32 leads reels non trackes, 56EUR depenses pour 1 conversion trackee |
| 15 juin 2026 | Claude Code | GTM : creation conversion Ads + trigger /merci + tag GA4 generate_lead - Version 22 publiee | GTM version 22 live sur GTM-W6786J2W |
| 15 juin 2026 | Claude Code | Google Ads : creation action de conversion "Demande de devis" (ID: 7648594038, AW-11144726708/qExRCPaQkb8cELSRnMIp) | Conversion creee via API v21 |
| 15 juin 2026 | Codex | Securisation du formulaire de devis, anonymisation des journaux et suppression des faux avis de la page merci | TypeScript, ESLint cible, `git diff --check`, build production, controle navigateur et tests API local valides |
| 15 juin 2026 | Codex | Controle GA4 et Google Ads apres deploiement | Propriete GA4 `491115717` verifiee ; `generate_lead` pas encore recu ; objectif Ads "Demande de devis" actif, principal et applique aux 3 campagnes |
| 16 juin 2026 | Codex | Correction complete endpoint Google Ads `searchStream` | `src/lib/google/ads.ts` deja corrige par `8c94413`; `src/lib/google/analytics.ts` aligne ; ESLint cible OK |
| 16 juin 2026 | Codex | Creation d'un outil local commun pour regenerer les refresh tokens Google OAuth | Script commun cree dans `/Users/redouanelmansouri/Desktop/GOOGLE_OAUTH_TOOLS`; Traiteur branche via `npm run google:refresh-token`; syntaxe Node verifiee |
| 16 juin 2026 | Claude Code | Google Ads : nouveau refresh token OAuth (scope adwords) injecte dans Vercel + redeploi | Token `1//047J...` genere via OAuth Playground et pousse en production |
| 16 juin 2026 | Claude Code | Google Ads : 14 mots-cles negatifs ajoutes sur Search-1 (concurrents, restaurant, a emporter, food truck, libanais, italien, paella) | Via API v22 campaignCriteria:mutate |
| 16 juin 2026 | Claude Code | Google Ads : "traiteur montpellier" passe de Large en Expression sur Search-1 | Ancien critere supprime + nouveau PHRASE cree via adGroupCriteria:mutate |
| 16 juin 2026 | Claude Code | Google Ads : plages horaires 6h-23h activees sur les 2 campagnes actives | Search-1 : 7 schedules created ; PMax : 7 anciens 6h-24h supprimes et recrees 6h-23h via campaignCriteria:mutate |
| 16 juin 2026 | Claude Code | Google Ads : "traiteur domicile" pause sur Search-1 | adGroupCriteria/165310269040~76657128 status=PAUSED |
| 16 juin 2026 | Claude Code | Google Ads : sitelink "Traiteur entreprise" ajoute sur Search-1 | Asset 373111835362 attache a la campagne 21322235649 ; Search-1 compte desormais 5 sitelinks |
| 18 juin 2026 | Codex | Google Ads : automatisation budget progressive type Recacor adaptee Traiteur | `scripts/budget-auto.mjs` + `/api/admin/ads/budget-auto`; min 5 EUR, max 30 EUR, Search-2 exclue ; simulation production OK, aucune hausse declenchee |
| 18 juin 2026 | Codex | Google Ads : resserrage petit budget applique | Search-1 : 14 mots-cles larges pauses, 6 mots-cles intention locale ajoutes/actives, negatifs `parguel`, `dufour`, `halles castellane`, `mechoui` ajoutes |
| 18 juin 2026 | Codex | Admin Ads : correction du parsing `searchStream` | `/api/admin/ads` affiche les vrais chiffres au lieu de lignes vides a 0 |
| 18 juin 2026 | Codex | Tracking GA4 : fiabilisation de `generate_lead` | Le formulaire stocke le lead confirme ; `/merci` declenche `generate_lead` une seule fois par `lead_id`; build et lint OK |
| 18 juin 2026 | Codex | GA4 : verification evenement cle `generate_lead` | API Admin GA4 confirme `generate_lead` deja cree comme key event depuis le 15 juin 2026 a 13:07 |
| 18 juin 2026 | Codex | Google Places : nouvelle cle API Traiteur creee et injectee | Projet Google Cloud `traiteur-montpellier`; Places API activee ; cle restreinte a `places.googleapis.com`; Vercel production et `.env.local` mis a jour ; build local et deploy prod OK |
| 18 juin 2026 | Codex | Google Cloud CLI partage entre projets locaux | `gcloud` ajoute au profil shell `~/.zprofile`; session connectee `redouanelmansouri34@gmail.com`; projets Traiteur et Recacor visibles ; procedure documentee dans `GOOGLE_SETUP.md` |
| 19 juin 2026 | Codex | App Lovable Traiteur Montpellier creee | Projet `9a0ab3b2-b0a0-40e1-8240-b216fd56a0d0` pret ; fiche d'integration `LOVABLE_APP.md` ajoutee |
| 19 juin 2026 | Codex | API leads pour Lovable | Route `/api/integrations/lovable/leads` ajoutee avec token serveur, filtres, pagination et preparation conversion `Demande de devis` |
| 25 juin 2026 | Codex | Google Ads : arret de l'automatisation budget | Suppression de `scripts/budget-auto.mjs`, de la commande `ads:budget-auto` et de la route `/api/admin/ads/budget-auto`; budgets geres manuellement dans Google Ads |
| 4 juillet 2026 | Codex | Recherche mots-cles mariage via Google Ads API | Methode Recacor `generateKeywordIdeas` reutilisee ; signal principal `traiteur mariage montpellier` autour de 210 recherches/mois ; decision : page SEO oui, Ads mariage non |
| 7 juillet 2026 | Codex | Google Ads : nettoyage avant hausse budget | 33 mots-cles negatifs ajoutes sur les 2 campagnes actives ; `traiteur mariage montpellier` pause sur Search-1 ; Search-2 reste PAUSEE |
| 7 juillet 2026 | Codex | Google Ads : budgets augmentes a 10 EUR/jour | PMax active et Search-1 active passees de 5 a 10 EUR/jour ; Search-2 reste PAUSEE et non modifiee |
| 7 juillet 2026 | Codex | Page mariage publiee et maillage interne | `/mariage` indexable, ajoutee au sitemap, menu, footer, accueil, guide local, galerie, evenements prives et pages villes |

## Credentials Google (references uniquement - ne pas modifier)

- OAuth Client ID : `1090757338785-i3g8iptvt8s0idog42rrqc418i954i34.apps.googleusercontent.com`
- GA4 Property ID : `491115717` (G-NVNV8V3DDT dans GTM)
- Google Ads Customer ID Traiteur : `6155175246`
- Google Ads MCC : `4419531309` (El mansouri)
- Google Ads Developer Token : dans Vercel
- GTM Account : `6297709538` | Container : `221473496` | Public ID : `GTM-W6786J2W`
- Google Place ID : `ChIJ4ys98chUV0ARmWHI_ODHRnU` (4.9/5, 354 avis)
- Conversion Ads "Demande de devis" : `AW-11144726708/qExRCPaQkb8cELSRnMIp`

## Google Ads — Audit 16 juin 2026

### Campagnes actives (30 derniers jours)
- PMax : 4 876 impr / 118 clics / 31,90 EUR / **2 conversions trackees** (15,95 EUR/conv)
- Search 1 : 2 006 impr / 108 clics / 26,83 EUR / 0 conversions trackees (sous-compte reel non remonte)
- Search 2 : PAUSEE

### Mots-cles qui tournent vraiment (Search)
- `traiteur montpellier` (Large) : 1 145 impr / 66 clics / 16,59 EUR
- `traiteur entreprise` (Large) : 435 impr / 22 clics / 6,60 EUR
- 100+ autres mots-cles en Large : 0 impression (inutiles, a nettoyer)

### Mots-cles negatifs a ajouter
Concurrents : cabiron, chef jean, germain traiteur, table de cana, baldassarre, croq gourmet, agapes traiteur
Mauvaise intention : restaurant, a emporter, food truck
Cuisine non proposee : libanais, italien, paella

### Actions decidees
1. Ajouter les negatifs ci-dessus (Search + PMax)
2. Passer `traiteur montpellier` de Large en Expression
3. Mettre a jour le refresh token OAuth dans Vercel (nouveau token avec scope adwords genere le 16 juin)
4. Corriger l URL dans le code : `:searchStream` -> `/googleAds:searchStream` (fait dans `src/lib/google/ads.ts` et `src/lib/google/analytics.ts`)
5. "mariage" : page SEO/site uniquement ; exclu des annonces Google Ads depuis le 7 juillet 2026.

## Notes et blocages

- Branche actuelle au moment de la creation : `main`.
- Dernier commit observe : `c1a15c5 Fix: supprime le bandeau cookie maison, Clickio via GTM suffit`.
- Les modifications listees dans "Travail en cours" existaient avant la creation de ce fichier.
- Les variables Google Places, OAuth, GA4, Search Console et Google Ads sont
  configurees dans Vercel pour Traiteur Montpellier.
- Les vrais avis Google sont en production avec la fiche
  `ChIJ4ys98chUV0ARmWHI_ODHRnU`.
- Google Places : nouvelle cle Traiteur valide creee le 18 juin 2026 dans le
  projet Google Cloud `traiteur-montpellier`, restreinte a `places.googleapis.com`.
  Les avis Google sont verifies en production : note 4,9 et 354 avis.
- Google Cloud CLI est disponible globalement via `~/.zprofile` et reutilisable
  depuis les autres dossiers projets. Utiliser `gcloud --project=...` pour cibler
  explicitement le bon projet et creer une cle Places separee par site.
- App Lovable cockpit conversions :
  `https://lovable.dev/projects/9a0ab3b2-b0a0-40e1-8240-b216fd56a0d0`.
  L'app ne remplace pas Digifactory ; elle doit suivre les demandes, qualifier
  les prospects, suivre les appels Google Ads et preparer les conversions.
- Connexion Lovable recommandee : source principale via
  `/api/integrations/lovable/leads` protegee par `LOVABLE_LEADS_API_TOKEN`.
  Gmail doit rester un secours/historique, pas la source de verite principale.
- Google Ads : les 2 campagnes actives sont gerees manuellement. Redouane les a
  remises a 5 EUR/jour le 7 juillet 2026, puis elles ont ete augmentees a
  10 EUR/jour apres nettoyage des termes. Search-2 reste PAUSEE et ne doit pas
  etre relancee sans decision explicite. L'automatisation budget cote site est
  arretee et ne doit pas etre relancee sans decision explicite.
- Mariage : a traiter comme levier SEO/site, pas comme axe Google Ads. La page
  `/mariage` est publiee cote SEO depuis le 7 juillet 2026 : indexable, dans le
  sitemap, menu/footer et reliee aux pages services, villes, galerie et guide local.
- Le compte parent de la propriete GA4 Traiteur Montpellier est `356859681`.
- Ne pas generer une fausse conversion en ouvrant directement `/merci` :
  attendre un vrai devis, puis marquer `generate_lead` comme evenement cle.
- `mariage` est volontairement exclu des annonces Google Ads. La demande mariage
  reste travaillee sur le site en SEO via la page `/mariage`.
- Le bandeau cookie maison a ete supprime ; le consentement est gere via Clickio
  et GTM.
- L'export GSC couvre effectivement 60 jours, du 14 avril au 12 juin 2026, malgre le filtre affiche "12 derniers mois".
- Priorite SEO identifiee : page dediee mariage, puis renforcement entreprise et verification de l'URL `/devis` avec UTM Google Business Profile.
- Un ancien export GSC sans `www` du 9 decembre 2025 au 8 mars 2026 a ete compare. La visibilite recente progresse, mais le CTR et les clics quotidiens reculent.
- Les fichiers GA4 et Ads generiques retrouves dans `Downloads` concernent d'autres projets et ont ete exclus de l'analyse Traiteur.
- CRM : 154 560,40 EUR de ventes enregistrees, dont 74 164,90 EUR marquees payees. Les paiements partiels totalisent 48 034,70 EUR de ventes, mais l'export ne fournit pas le montant effectivement encaisse.
- Les villes sont absentes pour 48 clients sur 64 ; ne pas choisir les pages villes uniquement avec cet export sans enrichir les adresses de facturation ou de livraison.
- Le formulaire inscrivait deja GCLID et UTM dans la description Digifactory, mais le site ne conservait pas de copie serveur. Le nouveau registre corrige ce point pour les prochaines demandes.

## Google Ads — remontées de conversions offline (14 juillet 2026)

- Objectif : remonter les demandes de devis stockees côté site vers Google Ads
  quand un `gclid`, `gbraid` ou `wbraid` est present.
- Action Google Ads creee pour Traiteur Montpellier :
  `Demande de devis - import leads site`, type `UPLOAD_CLICKS`, id `7684722442`.
- Ancienne methode Google Ads API `UploadClickConversions` testee en
  `validateOnly` : bloquee par Google pour les nouvelles integrations depuis
  juin 2026 (`CUSTOMER_NOT_ALLOWLISTED_FOR_THIS_FEATURE`). Il faut utiliser
  Data Manager API.
- Data Manager API est cablee dans le code via
  `/api/admin/ads/offline-conversions`.
  - `GET` ou `POST` avec `validateOnly: true` = previsualisation/test.
  - `POST` avec `validateOnly: false` = envoi reel et marquage en base.
- La base Neon contient maintenant les colonnes de suivi :
  `google_ads_conversion_status`, `google_ads_conversion_uploaded_at`,
  `google_ads_conversion_action`, `google_ads_conversion_error`.
- Test local du 14 juillet : la route lit bien les leads et cible l'action
  Traiteur, mais Data Manager renvoie encore une erreur de validation sur
  l'action d'import. A retester apres propagation de l'action Google Ads et
  apres verification des variables Vercel :
  `GOOGLE_ADS_CUSTOMER_ID=6155175246`,
  `GOOGLE_ADS_LOGIN_CUSTOMER_ID=4419531309`,
  `GOOGLE_ADS_OFFLINE_CONVERSION_ACTION_ID=7684722442`,
  OAuth avec scope Data Manager.
