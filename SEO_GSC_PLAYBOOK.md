# Pilotage SEO et Google Search Console

## Avant mise en ligne

1. Valider le build de production.
2. Vérifier les canonicals, le sitemap et les pages en `noindex`.
3. Tester les données structurées des pages principales.
4. Confirmer que les conversions ne partent qu'après validation serveur.
5. Déployer, puis contrôler le conteneur GTM en mode Preview.

## Configuration Search Console

1. Créer ou utiliser la propriété de domaine `traiteurmontpellier.com`.
2. Ajouter `GOOGLE_SITE_VERIFICATION` dans Vercel si une validation HTML est
   nécessaire.
3. Déclarer `https://www.traiteurmontpellier.com/sitemap.xml`.
4. Inspecter en priorité :
   - `/`
   - `/entreprises`
   - `/foires-salons`
   - `/evenements-prives`
   - `/guide-local`
   - les articles commerciaux publiés
5. Ne pas demander manuellement l'indexation des pages légales.

## Revue mensuelle

Comparer les 28 derniers jours aux 28 jours précédents :

- clics, impressions, CTR et position ;
- requêtes de marque contre requêtes génériques ;
- pages en positions 4 à 15 avec beaucoup d'impressions ;
- pages au CTR faible malgré une bonne position ;
- appareils mobile et ordinateur ;
- conversions issues du SEO, pas seulement les sessions.

## Règles de décision

- Position 4 à 10 et CTR faible : retravailler title et description.
- Position 8 à 20 avec impressions : enrichir le contenu et le maillage.
- Deux pages sur la même requête : vérifier la cannibalisation.
- Page sans impression après plusieurs semaines : contrôler indexation,
  intention et qualité du contenu.
- Nouvelle page locale : uniquement si une demande locale réelle est visible
  dans GSC, Google Ads, le CRM ou les appels.

## Pages locales

Ne pas dupliquer une page en remplaçant seulement le nom de la ville. Chaque
page doit contenir des informations propres : zone desservie, logistique,
formats demandés, lieux ou contraintes locales, preuves et FAQ spécifiques.
