# Lokale Auffindbarkeit: Haiyen Hairdesign

Die Website verwendet die bereits im Projekt konfigurierte Produktionsdomain `https://haiyen-hairdesign.de` zentral in `components/site/seo.ts`.

Umgesetzt:
- Eigene Titel, Beschreibungen, Canonicals und Social-Media-Metadaten für jede Seite.
- Natürliche Inhalte zu Friseurleistungen in Dresden, Striesen, Neustadt und Sachsen; sichtbare Adressen und Öffnungszeiten.
- JSON-LD mit Organization, WebSite und zwei HairSalon-Einträgen. Standortdaten und Öffnungszeiten stammen aus derselben Quelle wie die sichtbaren Standortinformationen.
- `/sitemap.xml` mit allen sechs Seiten und den verwendeten Salon-, Team- und Galeriebildern. Keine erfundenen Änderungsdaten oder zusätzlichen URLs für Filterparameter.
- `/robots.txt` erlaubt das Crawling und verweist auf die Sitemap.
- Beschreibende Bildnamen, Alt-Texte, responsive Bildgrößen und priorisiertes Hero-Bild.

Nach der Veröffentlichung:
1. Die Produktionsdomain in Google Search Console verifizieren und `/sitemap.xml` einreichen.
2. Beide Google-Unternehmensprofile mit den tatsächlichen Adressen, Telefonnummern, Öffnungszeiten, Leistungen und eigenen Fotos pflegen.
3. Die Standortzuordnung der Fotos und die Einsatzorte der neuen Kolleginnen ergänzen, sobald sie bestätigt sind.

Quellen:
- Google: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google: https://developers.google.com/search/docs/appearance/google-images
- Google: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

Validierungsstatus: Auf ausdrücklichen Wunsch keine Tests, Builds, Lint-, Typecheck- oder Browserprüfungen ausgeführt. Keine Veröffentlichung und keine Search-Console-Einreichung vorgenommen. Suchmaschinenplatzierungen sind nicht garantiert.
