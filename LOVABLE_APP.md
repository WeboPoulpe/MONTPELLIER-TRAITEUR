# Application Lovable - Cockpit conversions Traiteur Montpellier

Projet Lovable :
https://lovable.dev/projects/9a0ab3b2-b0a0-40e1-8240-b216fd56a0d0

## Role de l'application

Cette application ne remplace pas Digifactory. Elle sert a piloter les leads et
les conversions marketing :

- suivre toutes les demandes recues depuis le site et Gmail ;
- qualifier les prospects ;
- suivre les appels issus du call tracking Google Ads ;
- preparer les remontees de conversions Google Ads ;
- rapprocher plus tard les leads avec les devis/factures faits dans Digifactory.

Utilisateur prevu : 1 personne.

Conversion prioritaire V1 : demande de devis.

## Source de verite existante cote site

Le site Traiteur Montpellier enregistre deja les demandes dans la table
`lead_submissions` via `src/app/api/devis/route.ts`.

Champs disponibles cote site :

- `lead_id`
- `created_at`
- `first_name`
- `last_name`
- `company`
- `email`
- `phone`
- `event_type`
- `event_date`
- `event_city`
- `event_postal_code`
- `estimated_value`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `gclid`
- `gbraid`
- `wbraid`
- `fbclid`
- `landing_page`
- `referrer`
- `crm_success`
- `crm_status`
- `email_sent`
- `status`
- `form_data`

Export admin existant :

```text
/api/admin/leads?format=csv
```

Cet export est protege par l'auth admin du site.

## Pipeline recommande

Statuts internes :

```text
Nouveau
A contacter
Contacte
Qualifie
Devis a faire dans Digifactory
Devis envoye
Gagne
Perdu
Sans reponse
Doublon
```

Raisons de qualification/perte :

```text
Bon lead
Hors zone
Trop petit budget
Pas serieux
Doublon
Deja client
Mauvais type de prestation
```

## Conversions Google Ads

V1 : suivre la conversion `Demande de devis`.

Ne pas encore optimiser sur `Client facture` tant que le rapprochement
Digifactory n'est pas stable.

Chaque conversion doit conserver :

- type de conversion ;
- date de conversion ;
- valeur estimee ou valeur facturee ;
- devise `EUR` ;
- `lead_id` ;
- `gclid`, `gbraid`, `wbraid` si disponibles ;
- email et telephone normalises pour une future conversion avancee ;
- statut d'envoi : `a_envoyer`, `envoye`, `erreur`, `ignore`.

## Appels

Les appels doivent passer par le call tracking Google Ads.

L'application doit distinguer :

- clic telephone depuis le site ;
- appel reel mesure par Google Ads ;
- appel lie a une demande de devis existante ;
- appel seul, sans formulaire.

Important : un clic telephone n'est pas une preuve d'appel abouti. Pour piloter
Google Ads, privilegier les conversions d'appels Google Ads.

## Prompt Lovable pour ameliorer la V1

Copier ce prompt dans Lovable pour transformer la premiere maquette en outil
plus exploitable :

```text
Ameliore cette application pour en faire une V1 exploitable du cockpit
conversions Traiteur Montpellier.

Ne remplace pas Digifactory. L'application doit uniquement suivre les demandes,
qualifier les prospects, suivre les appels Google Ads et preparer les
conversions Google Ads.

Ajoute ou corrige les elements suivants :

1. Modele Lead
Champs obligatoires :
lead_id, created_at, first_name, last_name, company, email, phone, event_type,
event_date, event_city, event_postal_code, estimated_value, utm_source,
utm_medium, utm_campaign, utm_content, utm_term, gclid, gbraid, wbraid, fbclid,
landing_page, referrer, crm_success, crm_status, email_sent, status, form_data.

2. Page Demandes
Afficher les colonnes :
date, nom complet, telephone, email, type evenement, date evenement, ville,
valeur estimee, source, campagne, statut, priorite.
Ajouter filtres : statut, source, campagne, ville, type evenement, presence
gclid/gbraid/wbraid, periode.

3. Fiche demande
Afficher les blocs :
Contact, Evenement, Attribution marketing, Suivi Digifactory, Qualification,
Conversions, Notes.
Ajouter boutons de qualification rapide :
Bon lead, Hors zone, Trop petit budget, Pas serieux, Doublon, Deja client,
Mauvais type de prestation.

4. Pipeline
Utiliser exactement ces statuts :
Nouveau, A contacter, Contacte, Qualifie, Devis a faire dans Digifactory,
Devis envoye, Gagne, Perdu, Sans reponse, Doublon.

5. Conversions
Ajouter une page Conversions avec une ligne par conversion preparee :
lead_id, type, date, valeur, devise EUR, identifiant publicitaire disponible,
statut a_envoyer/envoye/erreur/ignore.
Pour l'instant ne connecte pas l'API Google Ads. Prevoir seulement la structure.

6. Appels
Ajouter une page Appels avec :
date, heure, numero appelant, duree, campagne Google Ads, statut, demande liee,
qualification.
Ajouter une action pour lier un appel a une demande existante.

7. Import
Ajouter un ecran d'import CSV avec mapping visuel pour l'export du site :
/api/admin/leads?format=csv
Le mapping doit reprendre les colonnes exactes listees dans le modele Lead.

8. Dashboard
Afficher :
demandes aujourd'hui, demandes 7 jours, demandes mois, leads Google Ads,
appels, leads a traiter, leads qualifies, leads perdus, taux de qualification,
valeur potentielle estimee.

9. UX
Interface admin en francais, navigation laterale, badges de statut, tableaux
lisibles, priorite desktop, aucun module devis/facture, aucun WhatsApp, aucun
secret affiche.
```

## Prochaines etapes techniques

1. Verifier visuellement l'app Lovable et appliquer le prompt d'amelioration.
2. Decider si Lovable consomme les leads par import CSV manuel ou par API
   separee.
3. Si API separee : creer une route export dediee avec token serveur, pagination
   et filtrage date.
4. Activer le call tracking Google Ads pour les appels.
5. Surveiller les vrais leads recents pour confirmer `generate_lead` dans GA4 et
   Google Ads.
