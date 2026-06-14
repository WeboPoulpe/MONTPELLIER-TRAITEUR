# Analyse GSC - Traiteur Montpellier

Date de l'analyse : 15 juin 2026

## Source et perimetre

- Source : export Google Search Console `Performance-on-Search-2026-06-15`.
- Filtre affiche dans l'export : Web, 12 derniers mois.
- Donnees quotidiennes effectivement presentes : du 14 avril au 12 juin 2026, soit 60 jours.
- Total du graphique : 368 clics, 19 817 impressions, CTR 1,86 %.
- Les donnees de requetes sont partielles, comme habituellement dans GSC : 227 clics sont attribues aux 371 requetes exportees.
- Les donnees correspondent a la production avant publication des optimisations locales actuellement non poussees.

Un ancien export GSC a egalement ete retrouve pour la propriete sans `www`, du 9 decembre 2025 au 8 mars 2026. La comparaison doit rester prudente car les proprietes et les URL ne sont pas identiques.

| Periode | Jours | Clics/jour | Impressions/jour | CTR | Position ponderee |
| --- | ---: | ---: | ---: | ---: | ---: |
| 9 dec. 2025 - 8 mars 2026 | 90 | 7,09 | 311 | 2,28 % | 8,13 |
| 14 avr. - 12 juin 2026 | 60 | 6,13 | 330 | 1,86 % | 5,76 |

Entre ces deux periodes, les impressions quotidiennes progressent d'environ 6 % et la position s'ameliore, mais les clics quotidiens baissent d'environ 13 % a cause d'un recul du CTR de 18 %. Le principal enjeu est donc maintenant de transformer la visibilite acquise en clics qualifies.

## Constats principaux

### 1. Le site est deja visible, mais le CTR est trop faible

Le site obtient des positions fortes sur plusieurs recherches commerciales, sans capter le volume de clics attendu :

| Requete | Clics | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| traiteur montpellier | 127 | 3 385 | 3,75 % | 2,89 |
| traiteur mariage montpellier | 2 | 1 146 | 0,17 % | 2,46 |
| traiteur montpellier mariage | 2 | 309 | 0,65 % | 1,63 |
| traiteur evenementiel montpellier | 2 | 236 | 0,85 % | 1,69 |
| montpellier traiteur | 2 | 266 | 0,75 % | 1,85 |
| traiteur pour professionnel a montpellier | 0 | 209 | 0 % | 1,91 |

Les positions moyennes ne garantissent pas que le resultat est toujours affiche en haut de page. La presence du pack local, des annonces et la variation selon l'appareil peuvent reduire les clics. Le CTR reste toutefois assez faible pour justifier un travail sur les pages, titres, extraits et intentions de recherche.

### 2. Le mariage est l'opportunite editoriale prioritaire

Le groupe de requetes contenant `mariage` represente environ :

- 1 928 impressions ;
- 6 clics ;
- 43 variantes de requetes dans l'export.

Le site n'a actuellement aucune page specialisee mariage. Une page utile et complete, distincte des evenements prives generiques, est donc justifiee par la demande observee. Elle devra repondre aux intentions suivantes : formats de reception, menus, buffet ou service a table, halal si la prestation est reellement proposee, nombre de convives, logistique, lieux desservis et demande de devis.

URL conseillee : `/traiteur-mariage-montpellier`.

Le probleme existait deja dans l'ancien export : `traiteur mariage montpellier` obtenait 1 604 impressions, 13 clics et 0,81 % de CTR. Sur la periode recente, cette meme requete tombe a 0,17 % de CTR malgre une position moyenne presque identique. Ce recul renforce la priorite d'une page et d'un extrait specifiquement adaptes au mariage.

### 3. Les offres entreprise ont une demande non captee

Le groupe entreprise/professionnel/seminaire/plateaux repas represente environ :

- 1 711 impressions ;
- 2 clics ;
- 20 variantes de requetes.

La page `/entreprises` existe, mais elle n'a obtenu que 52 impressions et aucun clic dans l'export des pages. Il faut verifier quelle page Google affiche reellement pour ces requetes avec un export GSC croisant `requete + page`.

Les sujets les plus prometteurs sont :

- traiteur pour professionnel a Montpellier ;
- evenements d'entreprise ;
- seminaire et conference ;
- plateaux repas et livraison en entreprise ;
- buffet et cocktail d'entreprise.

### 4. L'URL de devis concentre l'essentiel de la visibilite

L'URL suivante apparait avec 317 clics et 16 816 impressions :

`/devis?utm_source=google_maps&utm_medium=organic&utm_campaign=fiche_gmb`

Cela represente environ 86 % des clics totaux. Cette URL est celle utilisee depuis la fiche Google Business Profile. Deux hypotheses doivent etre distinguees :

1. GSC attribue normalement les performances du resultat local a l'URL UTM cliquee.
2. Google traite cette variante comme une URL distincte dans son index.

La balise canonical actuelle vers `/devis` est une bonne protection, mais il faut confirmer le comportement avec l'inspection d'URL GSC sur l'URL UTM et sur `/devis`. Aucun changement de redirection ne doit etre fait avant cette verification, car supprimer les UTM ferait perdre l'attribution Google Business Profile.

### 5. Mobile et ordinateur ne se comportent pas de la meme facon

| Appareil | Clics | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 213 | 6 264 | 3,40 % | 3,46 |
| Ordinateur | 151 | 13 421 | 1,13 % | 6,86 |
| Tablette | 4 | 132 | 3,03 % | 2,21 |

Le mobile apporte 58 % des clics avec seulement 32 % des impressions. Les pages de devis, les appels et les boutons de contact doivent donc etre controles en priorite sur mobile. Le faible CTR ordinateur merite une analyse des pages et des extraits affiches.

### 6. Autres opportunites confirmees

- Evenementiel/reception/cocktail : environ 2 234 impressions et 17 clics.
- Herault et communes proches : environ 1 021 impressions et 5 clics.
- Evenements prives, anniversaire, bapteme, domicile et brunch : environ 895 impressions et 7 clics.
- Livraison et a emporter : environ 661 impressions et 13 clics.

Les pages locales ne doivent etre creees que pour des zones reellement desservies, avec un contenu et des preuves propres a chaque zone. Une serie de pages presque identiques serait une mauvaise pratique.

## Plan SEO recommande

### Priorite 1 - avant publication

1. Inspecter dans GSC `/devis` et sa variante UTM pour confirmer la canonical choisie par Google.
2. Exporter les donnees GSC avec les dimensions croisees `requete + page`.
3. Verifier que les prestations mariage, halal, livraison et a domicile correspondent exactement a l'offre commerciale.
4. Conserver les optimisations techniques deja faites localement, mais revalider les contenus avec les donnees ci-dessus.

### Priorite 2 - contenus

1. Creer une vraie page `Traiteur mariage Montpellier`.
2. Renforcer `/entreprises` autour des besoins professionnels observes.
3. Clarifier sur la page d'accueil le H1 et la proposition de valeur avec le terme `traiteur evenementiel a Montpellier`.
4. Renforcer `/evenements-prives` pour anniversaire, reception et domicile sans melanger l'intention mariage.
5. Ajouter des liens internes descriptifs entre l'accueil, les pages de services, le guide local et le devis.

### Priorite 3 - mesure et conversion

1. Analyser dans GA4 les pages d'entree, sources, formulaires commences et demandes envoyees.
2. Analyser Google Ads par campagne, mot-cle, terme de recherche, cout et conversion.
3. Utiliser Clarity sur mobile pour les abandons du devis, clics repetes, zones mortes et profondeur de scroll.
4. Rapprocher les demandes du CRM avec leur source pour mesurer la qualite des prospects, pas seulement le nombre de formulaires.

## Donnees encore necessaires

- GSC : export `requetes + pages`, idealement sur 3 mois et 12 mois.
- GA4 : acquisition, pages de destination, evenements et conversions.
- Google Ads : campagnes, mots-cles, termes de recherche, couts et conversions.
- Clarity : pages principales, appareils, dead clicks, rage clicks et abandons.
- CRM : demandes recues, type d'evenement, montant ou qualite, source connue.

Les fichiers GA4 et Google Ads generiques retrouves dans `Downloads` ont ete controles : ils concernent Pneumontpellier et une campagne de boucherie, pas Traiteur Montpellier. Ils ne sont donc pas utilises dans cette analyse.

## Backlinks et guide local

Un guide local peut obtenir et transmettre de la valeur s'il est utile, original et relie a de vrais partenaires ou ressources locales. Echanger automatiquement des liens entre tous les sites geres, avec les memes ancres et les memes blocs, ressemble en revanche a un reseau artificiel. Les liens doivent rester editoriaux, pertinents et differents d'un site a l'autre.
