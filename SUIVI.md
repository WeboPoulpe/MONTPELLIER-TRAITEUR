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
| Claude Code | Marquer `generate_lead` comme evenement cle dans GA4 | GA4 Admin > Evenements | En attente du premier evenement reel : absent des evenements recents au 15 juin 2026 |
| Claude Code | Google Ads : ajouter mots-cles negatifs + passer "traiteur montpellier" en correspondance Expression | Campagnes Search + PMax | A faire - liste identifiee le 16 juin 2026 |
| Claude Code | Google Ads : mettre a jour GOOGLE_OAUTH_REFRESH_TOKEN dans Vercel | Vercel env | A faire - nouveau token avec scope adwords genere le 16 juin |

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
5. "mariage" : **ne pas ajouter en negatif** (le site vend les prestations mariage)

## Notes et blocages

- Branche actuelle au moment de la creation : `main`.
- Dernier commit observe : `c1a15c5 Fix: supprime le bandeau cookie maison, Clickio via GTM suffit`.
- Les modifications listees dans "Travail en cours" existaient avant la creation de ce fichier.
- Les variables Google Places, OAuth, GA4, Search Console et Google Ads sont
  configurees dans Vercel pour Traiteur Montpellier.
- Les vrais avis Google sont en production avec la fiche
  `ChIJ4ys98chUV0ARmWHI_ODHRnU`.
- Le compte parent de la propriete GA4 Traiteur Montpellier est `356859681`.
- Ne pas generer une fausse conversion en ouvrant directement `/merci` :
  attendre un vrai devis, puis marquer `generate_lead` comme evenement cle.
- L'ajout de `mariage` en mot-cle negatif doit etre confirme avant execution,
  car le site commercialise explicitement les prestations de mariage.
- Le bandeau cookie maison a ete supprime ; le consentement est gere via Clickio
  et GTM.
- L'export GSC couvre effectivement 60 jours, du 14 avril au 12 juin 2026, malgre le filtre affiche "12 derniers mois".
- Priorite SEO identifiee : page dediee mariage, puis renforcement entreprise et verification de l'URL `/devis` avec UTM Google Business Profile.
- Un ancien export GSC sans `www` du 9 decembre 2025 au 8 mars 2026 a ete compare. La visibilite recente progresse, mais le CTR et les clics quotidiens reculent.
- Les fichiers GA4 et Ads generiques retrouves dans `Downloads` concernent d'autres projets et ont ete exclus de l'analyse Traiteur.
- CRM : 154 560,40 EUR de ventes enregistrees, dont 74 164,90 EUR marquees payees. Les paiements partiels totalisent 48 034,70 EUR de ventes, mais l'export ne fournit pas le montant effectivement encaisse.
- Les villes sont absentes pour 48 clients sur 64 ; ne pas choisir les pages villes uniquement avec cet export sans enrichir les adresses de facturation ou de livraison.
- Le formulaire inscrivait deja GCLID et UTM dans la description Digifactory, mais le site ne conservait pas de copie serveur. Le nouveau registre corrige ce point pour les prochaines demandes.
