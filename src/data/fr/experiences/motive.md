---
title: "Senior Software Engineer"
company: "Motive (formerly KeepTruckin)"
period: "October 2019 - Present"
location: "San Francisco, CA"
order: 1
pdf: true
---

Motive a été une aventure incroyable. Dès le début, j’ai cru profondément en notre mission. En tant que Chilien et étudiant de l’histoire de mon pays, je comprends à quel point la logistique et la distribution des biens sont essentielles pour maintenir un contrat social fonctionnel.

J’ai rejoint l’équipe alors que nous n’étions encore qu’une quarantaine d’ingénieurs, travaillant aux côtés du CTO au centre de San Francisco. Ces premiers jours restent parmi les plus inspirants de ma carrière.

En tant que contributeur individuel, j’ai apporté des améliorations fondamentales à nos systèmes principaux. Mon premier projet fut la création d’une [couche de cache de requêtes ponctuelles indépendante du langage](https://medium.com/motive-eng/how-we-reduced-db-load-with-our-language-agnostic-point-query-cache-3a628edfee4e), qui a permis de réduire la charge sur nos bases de données et reste en production six ans plus tard, gérant des centaines de milliers de requêtes par seconde aux heures de pointe.

Au fil du temps, j’ai mené plusieurs initiatives clés côté backend, axées sur la performance, l’évolution et la fiabilité, parmi lesquelles :

- L’introduction du pooling de connexions pour des ressources E/S à haut débit comme Redis.  
- L’instauration de la pratique du feature-flagging sur les déploiements critiques — désormais un standard à l’échelle de l’entreprise.  
- Le développement de bibliothèques de traçage en Golang et Rails, créées d’abord pour mes propres besoins mais finalement adoptées, de façon organique, par plus de 100 projets en tant que standard de facto.  

À mesure que l’entreprise a grandi, notre équipe “plateforme” monolithique s’est scindée en groupes spécialisés, et j’ai rejoint l’équipe Plateforme IoT — une composante essentielle de l’identité de Motive, à la croisée de l’IoT et de l’IA. À l’époque, l’équipe ne comptait que deux ingénieurs. J’ai pris la responsabilité d’un de nos principaux pipelines d’ingestion de données du edge vers le cloud, qui, aujourd’hui, gère environ 40% des envois — soit quelque 60 millions par semaine.

**Le travail dont je suis le plus fier** reste la refonte complète de notre système de configuration — la colonne vertébrale des opérations de Motive. Pendant la période des fêtes 2023, j’ai pris la responsabilité d’un système en crise, pourtant crucial pour plusieurs lancements importants à venir.

À cette époque, il fallait jusqu’à **60 heures** pour qu’une mise à jour de configuration atteigne le edge, et le provisionnement d’une nouvelle configuration pouvait prendre **deux semaines**. J’ai travaillé sans relâche pour ressusciter le système et rendre la configuration **temps réel** et **observable** sur toutes les gammes de produits.

## **Contributions clés**

- Conception d’une **structure de profils hiérarchique** (entreprise → véhicule → appareil) permettant la configuration fine de différentes populations d’appareils.  
- Mise en place d’une **visibilité et d’une surveillance complètes** sur tous les flux de configuration.  
- Réingénierie du pipeline pour le rendre **piloté par les événements**, réduisant la latence de bout en bout de plusieurs jours à quelques secondes.  
- Livraison d’une **nouvelle interface back-office**, permettant la création et le déploiement instantané de nouveaux paramètres.  

## **Impact**

- Rendu possibles les **déploiements globaux de configuration** — nous pouvons désormais reconfigurer des millions de camions plusieurs fois par jour.  
- Établi la base pour plus de **15 modèles d’IA** opérant sur plusieurs continents ; chaque modèle dépend de la flexibilité de ce système.  
- Permis les capacités de **tests A/B** comme conséquence naturelle du design.  
- Fourniture d’une **expérience de test incomparable**, permettant des changements de comportement à la demande pour des clients grands comptes tels que **Cintas** et **FedEx**.  
- Intégration de la configuration directement dans le **flux de travail des développeurs edge**, de sorte que déclarer un paramètre dans le code l’expose automatiquement aux flottes actives via des outils d’administration.
