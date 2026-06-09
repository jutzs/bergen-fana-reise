# 🇳🇴 Bergen & Fana – Reise-App

Mobile Reise-App für euren Aufenthalt in **Austrevågen 111, 5244 Fana** vom **20.–27. Juni 2026**.

## 🌍 Live (kostenlos auf GitHub Pages)
**https://jutzs.github.io/bergen-fana-reise/**

Einfach am Handy öffnen → Browser-Menü → **„Zum Startbildschirm hinzufügen"**. Läuft dann wie eine echte App und offline.

## So nutzt ihr sie

**Schnell ausprobieren (am Computer):**
Doppelklick auf `index.html` – öffnet sich im Browser.

**Auf dem Handy (empfohlen, mit Offline-Funktion):**
Die App ist eine PWA. Am besten kurz lokal hosten, damit Offline-Cache & „Zum Startbildschirm hinzufügen" funktionieren:

```bash
cd /Users/simon.jutz/PrivateProjects/Bergen
python3 -m http.server 8000
```

Dann am Handy (gleiches WLAN) `http://<MAC-IP>:8000` öffnen
→ Safari/Chrome: **Teilen → Zum Startbildschirm hinzufügen**.
Danach läuft sie wie eine echte App und **offline** (wichtig in Norwegen!).

**Alternativ kostenlos online stellen:** den Ordner auf [Netlify Drop](https://app.netlify.com/drop) oder GitHub Pages ziehen → Link aufs Handy.

## Funktionen
- 🌦 **Live-Wetter** (7-Tage-Vorschau + Sonnenauf-/untergang) via Open-Meteo, mit Offline-Cache
- 💰 **Reisekasse** – gemeinsame Ausgaben für Michelle, Natalie, Tobias, Andreas & Simon, **geteilt & in der Cloud gespeichert**; mit Saldo pro Person und automatischem **Ausgleich (wer zahlt wem)**, NOK + CHF
- 💱 **Währungsrechner** NOK ⇄ CHF mit Live-Kurs
- 🟢 **„Jetzt geöffnet"-Anzeige** bei Läden/Vinmonopolet (aus den Öffnungszeiten berechnet, Bergen-Zeit)
- 🍽 **Essen & Trinken** – Restaurants, Bars, Cafés mit Suche, Filter, Bildern & Google-Bewertungen
- 🛒 **Versorgung** – Supermärkte, Vinmonopolet, Apotheken, Center, E-Laden
- 🧭 **Ausflüge** – Halb-/Ganztagestouren mit Bildern, Details & Merkliste (☆)
- 🗣 **Sprachführer** Norwegisch–Deutsch mit Aussprache
- ℹ️ **Praktisch** – Notruf, Geld, Fahren, Wetter, Packliste (mit Häkchen)
- **🧭 Route-Buttons** öffnen Google Maps mit Navigation ab eurer Unterkunft

### Hinweis zur Reisekasse
Die Ausgaben werden über einen kostenlosen, schlüssellosen Cloud-Speicher geteilt – **alle, die dieselbe App-URL öffnen, sehen dieselbe Kasse**. Es gibt zusätzlich einen lokalen Cache: Einträge funktionieren auch offline und werden beim nächsten Online-Zugriff automatisch zusammengeführt (Merge nach Eintrags-ID). Kein Login nötig.

## Detailansicht & Bilder
Tippt auf eine **Karte** (Restaurant, Ausflug, Shop) → es öffnet sich eine **Detailansicht** mit großem Bild, ausführlicher Beschreibung und Buttons (Route, Google-Bewertungen, Anrufen). Mit dem **☆** merkt ihr euch Favoriten – Filter „★ Merkliste" zeigt nur diese.

> 📷 Die Bilder (Wikimedia Commons) laden beim ersten Öffnen aus dem Netz und werden danach offline zwischengespeichert. Einmal mit Internet durchblättern, dann sind sie auch offline da.

## Inhalte anpassen
Alle Orte/Texte stehen in **`data.js`** – einfach dort ergänzen oder ändern.

*Daten Stand Juni 2026. Öffnungszeiten/Buchungen (v. a. Norway in a Nutshell, Cornelius, Vertshuset Konow) vor Ort/online bestätigen.*
