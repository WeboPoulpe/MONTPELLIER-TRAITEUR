# Configuration Google

L'integration utilise uniquement des appels serveur. Les secrets ne doivent jamais
etre prefixes par `NEXT_PUBLIC_`.

## 1. Avis Google

L'integration est compatible avec la cle Google Places deja utilisee par
Recacor. Elle peut rechercher automatiquement la fiche Traiteur Montpellier par
son nom et son adresse, selon le meme principe que Recacor.

```env
GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_QUERY=Traiteur Montpellier, 81 rue de Padirac, 34070 Montpellier
# Optionnel si la recherche automatique trouve la bonne fiche :
GOOGLE_PLACE_ID=
```

La cle doit avoir acces a Places API. Si `GOOGLE_PLACE_ID` est renseigne, le
site utilise en priorite Places API (New). Sinon, il reproduit le fonctionnement
de Recacor avec la recherche Places et les details de la fiche.

Google Places renvoie au maximum une selection d'avis. Le site affiche cette
selection et propose un lien vers tous les avis dans Google Maps. Sans cle
active, la section est masquee pour ne pas afficher de faux temoignages.

## 2. OAuth pour GA4, Google Ads et Search Console

Creer un client OAuth Google et produire un refresh token avec les autorisations :

```text
https://www.googleapis.com/auth/analytics.readonly
https://www.googleapis.com/auth/adwords
https://www.googleapis.com/auth/webmasters.readonly
```

Ajouter ensuite :

```env
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
GOOGLE_OAUTH_REFRESH_TOKEN=
```

Le compte Google autorise doit avoir acces aux trois proprietes concernees.

### Generer un refresh token plus facilement

Un assistant local commun est disponible sur le Bureau :

```text
/Users/redouanelmansouri/Desktop/GOOGLE_OAUTH_TOOLS/google-refresh-token.mjs
```

Depuis ce projet, il est branche sur la commande :

```bash
npm run google:refresh-token
```

Avant de l'utiliser, ajouter cette URI de redirection dans le client OAuth
Google :

```text
http://127.0.0.1:53682/oauth2callback
```

Le script ouvre un flux OAuth avec les scopes :

```text
https://www.googleapis.com/auth/analytics.readonly
https://www.googleapis.com/auth/webmasters.readonly
https://www.googleapis.com/auth/adwords
```

Il affiche ensuite le nouveau `GOOGLE_OAUTH_REFRESH_TOKEN`. Cette etape ne peut
pas etre totalement automatisee, car Google exige un consentement explicite du
compte Google connecte. En revanche, une fois le script en place, il suffit de
relancer cette commande quand un token doit etre regenere.

Le meme outil peut aussi etre utilise depuis Recacor ou un autre projet :

```bash
cd /Users/redouanelmansouri/Desktop/RECACOR
node ../GOOGLE_OAUTH_TOOLS/google-refresh-token.mjs
```

Le script lit les variables OAuth du projet courant (`.env.local` puis
`.env.production`). Si les secrets sont dans un autre fichier temporaire :

```bash
node ../GOOGLE_OAUTH_TOOLS/google-refresh-token.mjs --env-file=/private/tmp/google-oauth.env
```

## 3. Identifiants des produits

```env
GOOGLE_SITE_VERIFICATION=
GA4_PROPERTY_ID=
SEARCH_CONSOLE_SITE_URL=https://www.example.com/
GOOGLE_ADS_CUSTOMER_ID=
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_LOGIN_CUSTOMER_ID=
GOOGLE_ADS_API_VERSION=v22
```

- `GOOGLE_SITE_VERIFICATION` est uniquement la valeur du jeton de validation
  Search Console, sans la balise HTML complète.
- `GA4_PROPERTY_ID` est l'identifiant numerique de la propriete, sans prefixe.
- `SEARCH_CONSOLE_SITE_URL` doit correspondre exactement a la propriete
  Search Console. Pour une propriete de domaine, utiliser `sc-domain:example.com`.
- `GOOGLE_ADS_CUSTOMER_ID` peut contenir ou non des tirets.
- `GOOGLE_ADS_LOGIN_CUSTOMER_ID` est requis seulement si l'acces passe par un
  compte administrateur Google Ads.
- `GOOGLE_ADS_API_VERSION` permet de changer de version sans modifier le code.

## 4. Verification

1. Ajouter les variables dans `.env.local` et dans les variables Vercel.
2. Redemarrer le serveur local.
3. Ouvrir `/admin`, se connecter puis choisir **Statistiques**.
4. Verifier que chaque source affiche le statut **Connecte**.
5. Ouvrir la page d'accueil et verifier les avis Google.

Les donnees statistiques sont chargees a la demande et ne sont jamais exposees
par une route publique. Les avis Google sont mis en cache pendant six heures.

## 5. Conversions de leads facturees

Le formulaire conserve maintenant une copie serveur de chaque demande dans la
table `lead_submissions`, en plus de l'envoi vers Digifactory. Les champs
conserves comprennent :

- identifiant interne unique `lead_id` ;
- email et telephone du prospect ;
- GCLID, GBRAID et WBRAID lorsqu'ils sont presents ;
- UTM, page d'entree et referent ;
- type, date, ville et valeur estimee de l'evenement ;
- resultat de l'envoi vers le CRM et du courriel.

La migration `drizzle/0000_acoustic_ben_grimm.sql` doit etre appliquee avant le
deploiement de cette fonctionnalite.

Une fois connecte a l'administration, l'export est disponible ici :

```text
/api/admin/leads?format=csv
```

Le rapprochement doit etre realise avec les ventes Digifactory marquees
`Payee`, en priorite par email, puis par telephone. Chaque facture importee dans
Google Ads doit utiliser une cle stable, par exemple :

```text
lead_id + reference_facture
```

Cela evite de compter deux fois une meme facture lors des imports suivants.

Dans Google Ads :

1. Activer les conversions avancees pour prospects et accepter les conditions
   relatives aux donnees client.
2. Creer une action de conversion hors ligne `Client facture`.
3. Utiliser la date de paiement ou, a defaut, la date de validation de la
   facture comme date de conversion.
4. Envoyer le montant TTC facture et la devise `EUR`.
5. Envoyer tous les identifiants disponibles : GCLID/GBRAID/WBRAID et donnees
   client normalisees puis hachees en SHA-256.
6. Controler les diagnostics d'import avant d'utiliser cette action comme
   objectif principal d'encheres.

Pour l'historique anterieur au nouveau stockage, exporter depuis Digifactory les
opportunites avec leur description complete. Le formulaire y inscrivait deja
les marqueurs `[GCLID: ...]` et `[UTM: ...]`. Sans ces descriptions ou un
identifiant publicitaire, l'attribution historique ne peut etre qu'estimee.

## 6. Budget automatique Google Ads

Le projet contient une regle de budget progressive inspiree de Recacor :

```bash
npm run ads:budget-auto
npm run ads:budget-auto -- --apply
```

Par defaut, le script simule sans modifier Google Ads. Avec `--apply`, il peut
modifier le budget des deux campagnes actives uniquement :

- `Website traffic-Performance Max-1`
- `Website traffic-Search-1`

La campagne `Website traffic-Search-2` est explicitement exclue et ne doit pas
etre relancee par l'automatisation.

Regles principales :

- budget minimum : 5 EUR/jour ;
- budget maximum : 30 EUR/jour ;
- hausse progressive : +15 %, avec un maximum de +2 EUR par passage ;
- baisse : -20 %, sans descendre sous 5 EUR ;
- hausse seulement si le CPA 7 jours est bon ou si Search perd des impressions
  par budget avec un CPA acceptable ;
- baisse ou maintien si la campagne depense sans conversion.

Le meme moteur est disponible cote production via une route admin protegee :

```text
POST /api/admin/ads/budget-auto
POST /api/admin/ads/budget-auto?apply=1
```

Sans `apply=1`, la route renvoie uniquement une simulation. Avec `apply=1`, elle
applique les budgets calcules avec les variables Google Ads de Vercel.
