/* =========================================================================
   Bergen & Fana Reise-App — Datenbasis
   Aufenthalt: Austrevågen 111, 5244 Fana · 20.–27. Juni 2026
   Bilder: Wikimedia Commons (frei). Daten recherchiert & verifiziert (06/2026).
   ========================================================================= */

const HOME = "Austrevågen 111, 5244 Fana, Norway";

/* ---- Live-Dienste (kostenlos, ohne API-Key) ---- */
const GEO = { lat:60.29, lon:5.33, name:"Fana / Bergen" };           // Open-Meteo
const FX_API = "https://api.frankfurter.dev/v1/latest?base=CHF&symbols=NOK"; // Wechselkurs
const FX_FALLBACK = 11.9;                                            // NOK je CHF, Notwert
/* Geteilte Reisekasse (persistenter Cloud-Store, von allen geteilt) */
const KASSE_API = "https://api.restful-api.dev/objects/ff8081819d82fab6019eacbf7496578c";
const MEMBERS = [
  { name:"Michelle", color:"#e0568f" },
  { name:"Natalie", color:"#8b5cf6" },
  { name:"Tobias",   color:"#0ea5a4" },
  { name:"Andreas",  color:"#f59e0b" },
  { name:"Simon",    color:"#3b82f6" },
];
const EXP_CATS = ["🍽 Essen","🛒 Lebensmittel","⛽ Sprit/Laden","🎟 Aktivität","🏠 Unterkunft","🧺 Sonstiges"];

/* WMO-Wettercodes → Symbol + Text (Open-Meteo) */
const WMO = {
  0:["☀️","Klar"],1:["🌤","Meist klar"],2:["⛅","Wolkig"],3:["☁️","Bedeckt"],
  45:["🌫","Nebel"],48:["🌫","Reifnebel"],
  51:["🌦","Niesel"],53:["🌦","Niesel"],55:["🌦","Starker Niesel"],
  56:["🌧","Gefr. Niesel"],57:["🌧","Gefr. Niesel"],
  61:["🌧","Leichter Regen"],63:["🌧","Regen"],65:["🌧","Starker Regen"],
  66:["🌧","Gefr. Regen"],67:["🌧","Gefr. Regen"],
  71:["🌨","Leichter Schnee"],73:["🌨","Schnee"],75:["🌨","Starker Schnee"],77:["🌨","Schneegriesel"],
  80:["🌦","Schauer"],81:["🌦","Schauer"],82:["⛈","Heftige Schauer"],
  85:["🌨","Schneeschauer"],86:["🌨","Schneeschauer"],
  95:["⛈","Gewitter"],96:["⛈","Gewitter m. Hagel"],99:["⛈","Schweres Gewitter"]
};

/* ---- Bild-Bibliothek (stabile Wikimedia-URLs) ---- */
const IMG = {
  bergen:       "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bergen_panorama_at_night_-_panoramio_%281%29.jpg/960px-Bergen_panorama_at_night_-_panoramio_%281%29.jpg",
  bryggen:      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bryggen%2C_Bergen%2C_Noruega%2C_2019-09-08%2C_DD_115-117_PAN.jpg/960px-Bryggen%2C_Bergen%2C_Noruega%2C_2019-09-08%2C_DD_115-117_PAN.jpg",
  bergenhus:    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Bergenhus.2.JPG/960px-Bergenhus.2.JPG",
  floyen:       "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/%22Die_einzige_Standseilbahn_Norwegens%22._07.jpg/960px-%22Die_einzige_Standseilbahn_Norwegens%22._07.jpg",
  voringsfossen:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Voringsfossen_waterfall_at_Eidfjord%2C_Norway.jpg/960px-Voringsfossen_waterfall_at_Eidfjord%2C_Norway.jpg",
  flam:         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Fl%C3%A5msbana.jpg/960px-Fl%C3%A5msbana.jpg",
  naroyfjord:   "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Naer%C3%B8yfjorden.jpg/960px-Naer%C3%B8yfjorden.jpg",
  trolltunga:   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Trolltunga_2017.jpg/960px-Trolltunga_2017.jpg",
  troldhaugen:  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Troldhaugen_in_Bergen.jpg/960px-Troldhaugen_in_Bergen.jpg",
  fantoft:      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Stave_church_Fantoft.jpg/960px-Stave_church_Fantoft.jpg",
  ulriken:      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Ulriken_-_panoramio.jpg/960px-Ulriken_-_panoramio.jpg",
  hardanger:    "https://upload.wikimedia.org/wikipedia/commons/3/3d/Odda-Hardangerfjord.jpg",
  sognefjord:   "https://upload.wikimedia.org/wikipedia/commons/4/47/Sognefjord%2C_Norway.jpg",
  folgefonna:   "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Folgefonna_from_east.jpg/960px-Folgefonna_from_east.jpg",
  gamlehaugen:  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Gamlehaugen1.jpg/960px-Gamlehaugen1.jpg",
  osterfjord:   "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Indre_Osterfjorden.JPG/960px-Indre_Osterfjorden.JPG",
  aquarium:     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Entrance_Akvariet_i_Bergen_%282022%29.jpg/960px-Entrance_Akvariet_i_Bergen_%282022%29.jpg",
  vilvite:      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Vilvite_bergen_vitensenter_bygg_2.jpg/960px-Vilvite_bergen_vitensenter_bygg_2.jpg",
  fanafjord:    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Fanafjorden.JPG/960px-Fanafjorden.JPG",
  // Essen / Kategorien
  seafood:      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Plateau_van_zeevruchten.jpg/960px-Plateau_van_zeevruchten.jpg",
  sushi:        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/960px-Sushi_platter.jpg",
  pizza:        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/960px-Pizza-3007395.jpg",
  beer:         "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Hacker-Pschorr_Oktoberfest_Girl_Remix.jpg/960px-Hacker-Pschorr_Oktoberfest_Girl_Remix.jpg",
  pub:          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ryries_Bar%2C_Edinburgh_Haymarket_pub_dsc06376.jpg/960px-Ryries_Bar%2C_Edinburgh_Haymarket_pub_dsc06376.jpg",
  coffee:       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Latte_and_dark_coffee.jpg/960px-Latte_and_dark_coffee.jpg",
  cinnamon:     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Cinnamon_roll_in_Stockholm.jpg/960px-Cinnamon_roll_in_Stockholm.jpg",
  restaurant:   "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Barbieri_-_ViaSophia25668.jpg/960px-Barbieri_-_ViaSophia25668.jpg",
  reindeer:     "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Reinbukken_p%C3%A5_frisk_gr%C3%B8nt_beite._-_panoramio.jpg/960px-Reinbukken_p%C3%A5_frisk_gr%C3%B8nt_beite._-_panoramio.jpg",
  fishmarket:   "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/HAL_fish_market.jpg/960px-HAL_fish_market.jpg",
  store:        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/960px-Pizza-3007395.jpg"
};

/* ---- Restaurants, Bars, Cafés ---- */
const PLACES = [
  // --- Nahe Fana / Lagunen / Nesttun ---
  { name:"Vertshuset Konow", cat:"nah", kind:"Norwegisches Gasthaus", area:"Skjoldnes, Fana · Sundts veg 55",
    rating:4.5, price:2, phone:"+4791370787", img:IMG.restaurant,
    note:"Euer lokales Juwel: historische Villa von 1929 direkt am Nordåsvannet, ganz in der Nähe.",
    details:"Ein charmantes, unprätentiöses Gasthaus in einer denkmalgeschützten Villa von 1929, idyllisch am Wasser des Nordåsvannet gelegen – nur wenige Minuten von eurer Unterkunft. Gemütliche Stuben, freundlicher Service und ehrliche lokale Küche: gute Gourmet-Pizza, Burger, saisonale Gerichte und ein beliebter Wochenend-Brunch. Es gibt sogar ein winziges Boutique-Hotel. ⚠️ Meist nur Mi–So geöffnet – vorher anrufen und ggf. reservieren.",
    tags:["Lokal","Tradition","Empfehlung"] },
  { name:"Villani Lagunen", cat:"nah", kind:"Italiener / Pizza", area:"Laguneveien 1 · Lagunen Storsenter",
    rating:4.2, price:2, phone:"+4755315555", img:IMG.pizza,
    note:"Authentischer Italiener über mehrere Etagen, Holzofenpizza, Pasta.",
    details:"Familienfreundlicher Italiener direkt am Einkaufszentrum Lagunen, verteilt über mehrere Etagen. Knusprige Holzofenpizza, Calzone und Pasta wie Pappardelle. Praktisch, wenn ihr ohnehin im Lagunen einkauft – und ein entspannter Ort für einen lockeren Abend.",
    tags:["Familie","Pizza"] },
  { name:"Sumo Lagunen", cat:"nah", kind:"Asia / Sushi", area:"Lagunen Storsenter",
    rating:4.2, price:2, phone:"+4790807060", img:IMG.sushi,
    note:"Gutes Sushi, Poke, Dumplings & warme asiatische Gerichte.",
    details:"Moderne Asia-Fusion-Kette mit besonders gutem Sushi, Poke-Bowls, Dumplings und warmen Gerichten. Schick eingerichtet, gut zum Essen vor Ort oder zum Mitnehmen – einfaches Parken am Center.",
    tags:["Sushi","Take-away"] },
  { name:"Egon Lagunen", cat:"nah", kind:"Familienrestaurant", area:"2. Etage, Lagunen Storsenter",
    rating:3.8, price:2, phone:"", img:IMG.restaurant,
    note:"Verlässliche Familienkette: Burger, Pizza, Steaks.",
    details:"Bekannte norwegische Familienkette im 1. Stock des Lagunen. Breites Menü mit Burgern, Pizza, Steaks und Salaten, kinderfreundlich und unkompliziert – ein sicherer Treffer, wenn alle etwas anderes möchten.",
    tags:["Familie"] },
  { name:"Nesttun Kebab og Pizza", cat:"nah", kind:"Kebab / Pizza", area:"Nesttun Zentrum",
    rating:4.0, price:1, phone:"", img:IMG.pizza,
    note:"Günstig, schnell, vorwiegend Take-away.",
    details:"Bodenständiger lokaler Imbiss im Zentrum von Nesttun. Günstig (ca. 100–200 NOK p.P.), schnell und solide – vor allem zum Mitnehmen. Gut für einen unkomplizierten Abend ohne großes Budget.",
    tags:["Günstig","Quick"] },
  { name:"Nordås Kebab & Burger", cat:"nah", kind:"Kebab / Burger", area:"Nordås (sehr nah)",
    rating:0, price:1, phone:"", img:IMG.restaurant,
    note:"Schnelle Küche ganz in der Nähe von Austrevågen.",
    details:"Schneller Imbiss ganz in eurer Nähe in Nordås – Kebab, Burger und Co. Ideal, wenn es einfach nur schnell und unkompliziert sein soll.",
    tags:["Günstig","Quick"] },
  { name:"Big Bite Lagunen", cat:"quick", kind:"Sandwiches", area:"Lagunen Storsenter",
    rating:0, price:1, phone:"", img:IMG.restaurant,
    note:"Frisch belegte Subs – schneller Mittagssnack.",
    details:"Sandwich-Kette im Lagunen: frisch belegte Subs nach Wahl. Schneller, etwas leichterer Mittagssnack beim Bummeln durchs Center.",
    tags:["Quick"] },
  { name:"McDonald's McDrive Lagunen", cat:"quick", kind:"Fast Food", area:"Lagunen Storsenter",
    rating:0, price:1, phone:"", img:IMG.restaurant,
    note:"Drive-in direkt am Center.",
    details:"Verlässlicher Fast-Food-Notnagel mit Drive-in direkt am Lagunen – praktisch für unterwegs oder mit hungrigen Kindern.",
    tags:["Familie","Drive-in"] },

  // --- Bergen Stadt ---
  { name:"Bryggeloftet & Stuene", cat:"bergen", kind:"Traditionell Norwegisch", area:"Bryggen 11",
    rating:4.5, price:3, phone:"+4755302070", img:IMG.seafood,
    note:"Ikone seit 1910 am Hansekai. Berühmte Bergener Fischsuppe, Rentier, Lachs.",
    details:"Eine echte Bergener Institution direkt am UNESCO-Kai Bryggen, seit 1910 in Familienhand. Klassische westnorwegische Küche in stimmungsvollen Holzstuben: die berühmte Bergener Fischsuppe, gebratener Steinbeißer, Rentier und Lachs. Sehr beliebt (über 5.000 Bewertungen) – unbedingt reservieren, zu Stoßzeiten kann es etwas dauern.",
    tags:["Tradition","Fisch","Empfehlung"] },
  { name:"Cornelius Sjømatrestaurant", cat:"bergen", kind:"Seafood (Insel)", area:"Insel Holmen · Boot ab Bryggen",
    rating:4.4, price:3, phone:"+4756334880", img:IMG.seafood,
    note:"Unvergesslich: 25-Min-Bootsfahrt inklusive, „Wetter-Menü\" aus dem Tagesfang.",
    details:"Ein Restaurant auf einer eigenen kleinen Insel – die Anreise ist Teil des Erlebnisses: eine ~25-minütige Bootsfahrt durch den Schärengarten (Abfahrt meist ~18:00 ab Dreggekaien). Serviert wird ein „Wetter-Menü\", das sich nach Tagesfang und Bedingungen richtet, mit Schwerpunkt auf frischesten Meeresfrüchten. Perfekt für einen besonderen, romantischen Abend – unbedingt rechtzeitig reservieren.",
    tags:["Fisch","Romantisch","Erlebnis","Empfehlung"] },
  { name:"Pingvinen", cat:"bergen", kind:"Norwegische Hausmannskost", area:"Vaskerelven 14, Zentrum",
    rating:4.4, price:2, phone:"", img:IMG.reindeer,
    note:"Lokaler Liebling – „Omas Wohnzimmer\": Kjøttkaker, Fischauflauf, Raspeball, Rentier.",
    details:"Der Liebling der Einheimischen – gemütlich wie Omas Wohnzimmer. Auf der Karte stehen echte norwegische Klassiker: Kjøttkaker (Fleischklöße), Fischauflauf, Raspeball/Komle und im Winter Rentier. Faire Preise, gute norwegische Biere und eine herzliche Atmosphäre. Abends oft voll – reservieren empfohlen.",
    tags:["Tradition","Lokal","Empfehlung"] },
  { name:"Bryggen Tracteursted", cat:"bergen", kind:"Westnorwegisch", area:"Bryggestredet 2, Bryggen",
    rating:4.4, price:3, phone:"", img:IMG.bryggen,
    note:"In einem Holzhaus aus dem 18. Jh. mitten im UNESCO-Viertel.",
    details:"Speisen in einem original erhaltenen Holzhaus aus dem 18. Jahrhundert, versteckt in den Gassen des Bryggen. Moderne westnorwegische Küche mit saisonalen, lokalen Zutaten in einem der atmosphärischsten Räume der Stadt – knarzende Dielen, niedrige Decken, viel Geschichte.",
    tags:["Tradition","Atmosphäre"] },
  { name:"Lysverket", cat:"bergen", kind:"Modern Nordisch · 1 Michelin-Stern", area:"KODE 4 · Rasmus Meyers allé 9",
    rating:4.6, price:3, phone:"", img:IMG.restaurant,
    note:"Gehobenes Tasting-Menü im Kunstmuseum. Di–Sa abends.",
    details:"Mit einem Michelin-Stern ausgezeichnetes Restaurant im Kunstmuseum KODE 4 am See Lille Lungegårdsvann. Kreative, moderne nordische Küche als mehrgängiges Degustationsmenü. Ein Ort für einen besonderen Abend – Di–Sa abends, reservieren.",
    tags:["Fine Dining","Michelin"] },
  { name:"Bare (Bergen Børs Hotel)", cat:"bergen", kind:"Fine Dining · 1 Michelin-Stern", area:"Torgallmenningen",
    rating:4.7, price:3, phone:"", img:IMG.restaurant,
    note:"Gehobenes Menü im historischen Hotel.",
    details:"Michelin-besterntes Fine Dining im prachtvollen Bergen Børs Hotel an der Torgallmenningen. Anspruchsvolle Menüs aus erstklassigen norwegischen Produkten in elegantem Ambiente – die Adresse für den ganz besonderen Anlass.",
    tags:["Fine Dining","Michelin"] },
  { name:"Trekroneren", cat:"bergen", kind:"Gourmet-Hotdogs (Bude)", area:"Kong Oscars gate 1",
    rating:4.8, price:1, phone:"", img:IMG.restaurant,
    note:"Bergener Institution seit 1948. Rentierwurst mit Preiselbeeren probieren!",
    details:"Eine Kult-Würstchenbude seit 1948 mitten in der Stadt. Spezialität: die Rentierwurst (reinsdyrpølse) mit Preiselbeeren und Röstzwiebeln. Billig, schnell, herrlich norwegisch – der perfekte Snack beim Stadtbummel.",
    tags:["Günstig","Kult","Quick"] },
  { name:"Horn of Africa", cat:"bergen", kind:"Äthiopisch", area:"Strandgaten 112, Nordnes",
    rating:4.6, price:2, phone:"", img:IMG.restaurant,
    note:"Hervorragendes Preis-Leistungs-Verhältnis, Injera-Platten, herzlich.",
    details:"Warmherziges äthiopisches Restaurant auf der Halbinsel Nordnes mit großartigem Preis-Leistungs-Verhältnis. Große Injera-Platten zum Teilen, eine herausragende vegetarische Auswahl und sehr gastfreundlicher Service – eine willkommene Abwechslung zur Fjordküche.",
    tags:["Vegetarisch","Günstig"] },

  // --- Bars / Pubs ---
  { name:"Henrik Øl & Vinstove", cat:"bar", kind:"Craft-Beer-Pub", area:"Engen 10", rating:4.5, price:2, phone:"", img:IMG.beer,
    note:"50+ Zapfhähne, überwiegend norwegisch/skandinavisch.",
    details:"Die Anlaufstelle für Bierliebhaber in Bergen: über 50 Zapfhähne mit Schwerpunkt auf norwegischem und skandinavischem Craft Beer. Gemütlich-rustikales Ambiente und kompetentes Personal, das gern berät. Auch eine gute Weinauswahl.",
    tags:["Craft Beer"] },
  { name:"Apollon Platebar", cat:"bar", kind:"Plattenladen + Bierbar", area:"Zentrum", rating:4.5, price:2, phone:"", img:IMG.beer,
    note:"Plattenladen + Craft-Beer-Bar, 30+ Hähne, Vinyl-Atmosphäre.",
    details:"Seit 2012 verbindet Apollon einen Plattenladen mit einer entspannten Craft-Beer-Bar: über 30 Hähne mit IPAs, Stouts und Sours, dazu Vinyl an den Wänden und gelegentlich Konzerte. Lässig und unprätentiös.",
    tags:["Craft Beer","Vinyl"] },
  { name:"No Stress", cat:"bar", kind:"Cocktailbar", area:"Zentrum", rating:4.4, price:3, phone:"", img:IMG.pub,
    note:"Stylischer, beliebter Cocktail-Spot.",
    details:"Schicke, beliebte Cocktailbar im Zentrum mit kreativen Drinks und einer stylischen Atmosphäre. Gut für den Start in einen Abend oder einen gepflegten Absacker.",
    tags:["Cocktails"] },
  { name:"Bien Bar", cat:"bar", kind:"Art-Déco-Bar · Pizza", area:"Danmarks plass (Richtung Stadt)", rating:4.4, price:2, phone:"", img:IMG.pizza,
    note:"Denkmalgeschütztes Interieur (1939), neapolitanische Pizza, guter Wein.",
    details:"In einer denkmalgeschützten ehemaligen Apotheke von 1939 mit wunderschönem Art-Déco-Interieur. Neapolitanische Pizza, gute Weine und Cocktails – praktisch gelegen am Danmarks plass auf dem Weg zwischen Fana und dem Zentrum. Nebenan gibt's Burger im Bien Snackbar.",
    tags:["Pizza","Atmosphäre"] },
  { name:"Det Akademiske Kvarter", cat:"bar", kind:"Studenten-Kulturhaus", area:"Olav Kyrres gate", rating:4.3, price:1, phone:"", img:IMG.beer,
    note:"Günstigste Drinks der Stadt, mehrere Bars, sehr lebendig.",
    details:"Das studentische Kulturhaus mit mehreren Bars unter einem Dach – die günstigsten Drinks der Stadt und ein dichtes Veranstaltungsprogramm (Konzerte, Quiz, Partys). Jung, lebendig und sehr sympathisch; unter der Woche oft am entspanntesten.",
    tags:["Günstig","Studentisch"] },

  // --- Cafés / Bäckereien ---
  { name:"Baker Brun", cat:"cafe", kind:"Bäckerei-Café", area:"Bryggen 41 (+ Filialen)", rating:4.4, price:1, phone:"", img:IMG.cinnamon,
    note:"Berühmt für Skillingsboller – die große westnorwegische Zimtschnecke.",
    details:"Die klassische Adresse für eine Skillingsbolle – die große, runde Bergener Zimtschnecke, hier praktisch erfunden. Mehrere Filialen, schön gelegen u.a. am Bryggen. Täglich geöffnet; ideal für ein gemütliches Frühstück oder Kaffeepause.",
    tags:["Zimtschnecke","Frühstück"] },
  { name:"Godt Brød", cat:"cafe", kind:"Bio-Bäckerei", area:"u.a. Marken", rating:4.5, price:1, phone:"", img:IMG.cinnamon,
    note:"Preisgekröntes Biobrot, Baguettes, Sandwiches, vegan-freundlich.",
    details:"Preisgekrönte Bio-Bäckerei-Kette mit hervorragendem Sauerteigbrot, Baguettes, belegten Broten und süßem Gebäck – auch vegan-freundlich. Verlässlich gut für ein nahrhaftes Frühstück oder einen Lunch zwischendurch.",
    tags:["Bio","Frühstück"] },
  { name:"Kaffemisjonen", cat:"cafe", kind:"Spezialitätenkaffee", area:"Øvre Korskirkeallmenningen", rating:4.6, price:1, phone:"", img:IMG.coffee,
    note:"Bekanntestes Specialty-Coffee-Haus Bergens seit 2007.",
    details:"Das bekannteste Specialty-Coffee-Haus der Stadt, seit 2007 ein fester Begriff. Sorgfältig zubereiteter Kaffee aus eigener Röstung in lockerer Atmosphäre – Pflichtstopp für alle, die guten Kaffee lieben.",
    tags:["Kaffee"] },
  { name:"Det Lille Kaffekompaniet", cat:"cafe", kind:"Spezialitätenkaffee", area:"Nedre Fjellsmauet 2 (an der Fløibane)", rating:4.6, price:1, phone:"", img:IMG.coffee,
    note:"Ältestes & kleinstes Café Bergens (seit 1996), charmante Gasse.",
    details:"Das älteste und kleinste Kaffeehaus Bergens (seit 1996), versteckt in einer charmanten Kopfsteingasse direkt neben der Talstation der Fløibane. Hausgemachte Kuchen und exzellenter Kaffee – perfekt vor oder nach der Fahrt auf den Fløyen.",
    tags:["Kaffee","Atmosphäre"] },
  { name:"Søtt + Salt", cat:"cafe", kind:"Café / Bäckerei", area:"mehrere Standorte", rating:4.2, price:2, phone:"", img:IMG.cinnamon,
    note:"Gebäck, Brunch, Kaffee – breites Angebot.",
    details:"Café- und Bäckerei-Gruppe mit mehreren Standorten: frisches Gebäck, Brunch, Kaffee und ein breites Speisenangebot. Gut für einen entspannten Vormittag.",
    tags:["Brunch"] },
];

/* ---- Versorgung ---- */
const SUPPLY = [
  { name:"Coop Obs! Lagunen", cat:"food", kind:"Hypermarkt", area:"Laguneveien 1, Rådal · im Lagunen",
    hours:"Mo–Fr 09–21 · Sa 09–18 · So zu", img:IMG.store,
    note:"Grösster Laden der Gegend – Lebensmittel + Haushalt. Beste Auswahl. Ca. 5–10 Min von eurer Unterkunft.",
    details:"Der große Hypermarkt im Lagunen-Center – die beste Auswahl der Gegend von Lebensmitteln über Frische bis Haushaltswaren. Ideal für den Wocheneinkauf. Etwa 5–10 Min von Austrevågen.", tags:["Auswahl"] },
  { name:"Rema 1000 Lagunen", cat:"food", kind:"Discounter", area:"Laguneveien, Rådal",
    hours:"Mo–Sa 07–23 · So zu", note:"Günstigster Wocheneinkauf. Gratis-App „Æ\" für Rabatte.",
    details:"Discounter mit dem günstigsten Standard-Warenkorb. Mit der kostenlosen App „Æ\" gibt es zusätzliche Rabatte. Lange Öffnungszeiten (bis 23 Uhr).", tags:["Günstig"] },
  { name:"Rema 1000 Nesttun", cat:"food", kind:"Discounter", area:"Elvenesvegen 18, Nesttun",
    hours:"Mo–Sa 07–23 · So zu", note:"Praktischer Discounter nahe Nesttun-Zentrum.",
    details:"Weiterer günstiger Rema-1000-Discounter, praktisch nahe dem Zentrum von Nesttun.", tags:["Günstig"] },
  { name:"Kiwi Nesttun", cat:"food", kind:"Discounter", area:"Nesttun / Rådal",
    hours:"Mo–Sa 07–23 · So zu", note:"Grüne Discounter-Kette, stark beim Preis.",
    details:"Die grüne Discounter-Kette (NorgesGruppen) mit aggressiver Preisgestaltung und oft frischem Obst/Gemüse zum Mitnehmen.", tags:["Günstig"] },
  { name:"Meny Nesttun", cat:"food", kind:"Vollsortimenter (Premium)", area:"Nesttun Zentrum",
    hours:"Mo–Fr 08–21 · Sa 08–20 · So zu", note:"Beste Frischetheke (Fleisch/Fisch/Deli) – etwas teurer.",
    details:"Premium-Vollsortimenter mit der besten Frischetheke der Gegend: gute Fleisch-, Fisch- und Delikatessenauswahl. Etwas teurer, dafür top für besondere Zutaten.", tags:["Frisch","Premium"] },
  { name:"Coop Extra Sædalen", cat:"food", kind:"Discounter", area:"Sædalsveien",
    hours:"Mo–Sa 07–23 · So zu", note:"Nächster Discounter Richtung Sædalen-Tal.",
    details:"Günstiger Coop-Extra-Discounter Richtung Sædalen – praktisch, wenn ihr auf dieser Seite unterwegs seid.", tags:["Günstig"] },
  { name:"Bunnpris (Fana)", cat:"food", kind:"Nahversorger", area:"mehrere kleine Filialen",
    hours:"oft länger · teils SONNTAGS offen", note:"Kleiner Convenience-Laden – Rettung für den Sonntagseinkauf!",
    details:"Kleinerer Nahversorger mit oft längeren Öffnungszeiten – einige Filialen haben sogar sonntags geöffnet. Die Rettung, wenn am Sonntag Milch oder Brot fehlen.", tags:["Sonntag"] },

  { name:"Vinmonopolet Lagunen", cat:"wine", kind:"Wein & Spirituosen (staatl.)", area:"Laguneveien 1, Rådal · im Lagunen",
    hours:"Mo–Fr 10–18 · Sa 10–16 · So zu", note:"EUER nächstes „Polet\". Einzige Quelle für Wein/Spirituosen & Bier >4,7 %.",
    details:"Das staatliche Monopol „Vinmonopolet\" ist die EINZIGE Quelle für Wein, Spirituosen und Bier über 4,7 %. Eure nächste Filiale liegt direkt im Lagunen. ⚠️ Samstags nur bis 16 Uhr, sonntags komplett zu – also rechtzeitig einkaufen.", tags:["Nächstes"] },
  { name:"Vinmonopolet Nesttun", cat:"wine", kind:"Wein & Spirituosen (staatl.)", area:"Østre Nesttunvegen 16, Nesttun",
    hours:"Mo–Mi 10–17 · Do–Fr 10–18 · Sa 10–15 · So zu", note:"Kleinere Filiale. Achtung: Samstag nur bis 15:00.",
    details:"Kleinere Vinmonopolet-Filiale im Zentrum von Nesttun. Beachtet die kürzeren Zeiten – samstags nur bis 15 Uhr.", tags:[] },
  { name:"Vinmonopolet Bergen Storsenter", cat:"wine", kind:"Wein & Spirituosen (staatl.)", area:"Strømgaten 8, Bergen (am Bahnhof)",
    hours:"Mo–Fr 10–18 · Sa 10–16 · So zu", note:"Grosse Filiale im Zentrum, falls ihr in der Stadt seid.",
    details:"Große, zentrale Vinmonopolet-Filiale im Bergen Storsenter direkt am Bahnhof – mit breiter Auswahl, falls ihr ohnehin in der Stadt seid.", tags:[] },

  { name:"Apotek 1 Lagunen", cat:"pharma", kind:"Apotheke", area:"Lagunen Storsenter",
    hours:"Mo–Fr 10–21 · Sa 10–18 · So zu", note:"Längste Abendöffnung der Gegend (Center-Zeiten).",
    details:"Apotheke im Lagunen mit den längsten Abendöffnungszeiten der Gegend (folgt den Center-Zeiten). Erste Wahl für rezeptfreie Medikamente in eurer Nähe.", tags:["Nah"] },
  { name:"Fana Apotek", cat:"pharma", kind:"Apotheke", area:"Østre Nesttunvegen 4, Nesttun",
    hours:"Mo–Fr 09–18 · Sa 10–16 · So zu", phone:"+4755228800", note:"Unabhängige Apotheke im Nesttun-Zentrum.",
    details:"Unabhängige Apotheke im Zentrum von Nesttun – freundliche Beratung, gut erreichbar.", tags:[] },
  { name:"Vitusapotek Nordstjernen (Notapotheke)", cat:"pharma", kind:"Dienstapotheke", area:"Strømgaten 8, Bergen (am Bahnhof)",
    hours:"täglich bis 23:00 – auch So/Feiertag", phone:"+4755218384", note:"Am längsten geöffnete Apotheke der Region. Für Abende & Sonntage.",
    details:"Die Dienstapotheke der Region direkt am Bahnhof – täglich bis 23 Uhr geöffnet, auch sonntags und an Feiertagen. Die richtige Adresse bei akutem Bedarf außerhalb normaler Zeiten.", tags:["Notfall","Sonntag"] },

  { name:"Lagunen Storsenter", cat:"mall", kind:"Einkaufszentrum", area:"Laguneveien 1, Rådal", phone:"+4755117400",
    hours:"Mo–Fr 10–21 · Sa 10–18 · So zu", img:IMG.store,
    note:"Westnorwegens grösstes Center: ~130+ Läden, Kino, Fitness, Food-Court – alles unter einem Dach.",
    details:"Das größte Einkaufszentrum Westnorwegens und euer One-Stop-Hub: über 130 Geschäfte, Coop Obs Hypermarkt, Vinmonopolet, Apotheke, Mode, Elektronik, Kino, Fitness und ein großer Food-Court – alles unter einem Dach, ~5–10 Min entfernt. (2026 teils Bauarbeiten wegen Erweiterung.)", tags:["Alles","Nah"] },
];

/* ---- E-Ladestationen ---- */
const CHARGING = [
  { name:"Lagunen Storsenter – Laden", area:"Laguneveien 1, Rådal", net:"Eviny / Recharge / Mer",
    note:"Praktischster Lade-Hub direkt nebenan. Mehrere Betreiber im Parkhaus, plus Schnelllader." },
  { name:"Rådal / E39-Korridor", area:"Hauptstrasse südlich Bergen", net:"Ionity / Recharge",
    note:"Schnell- und Ultraschnelllader (bis Ionity-Klasse, ~350 kW) entlang der E39." },
  { name:"Circle K Tankstellen", area:"mehrere in Fana/Bergen", net:"Circle K",
    note:"Schnelllader an vielen Tankstellen, meist auch mit Kartenzahlung." },
  { name:"Åsane Supercharger", area:"nördlich der Stadt", net:"Tesla",
    note:"Tesla Supercharger (auch für Nicht-Tesla via Tesla-App), nützlich Richtung Norden." },
];

/* ---- Ausflüge (frei zur Auswahl) ---- */
const TRIPS = [
  // Sehr nah (halber Tag)
  { name:"Troldhaugen – Edvard Griegs Heim", dur:"halb", drive:"5–10 Min", tags:["Nah","Kultur","Musik"],
    map:"Troldhaugen, Bergen", img:IMG.troldhaugen,
    note:"Griegs Villa mit Komponistenhütte, Museum, Café & Konzertsaal (KODE).",
    details:"Das idyllische Sommerhaus des Komponisten Edvard Grieg von 1885, hoch über dem Nordåsvannet – nur Minuten von eurer Unterkunft. Zu sehen sind die Villa, Griegs winzige Komponistenhütte am Wasser, sein Grab im Fels und ein modernes Museum mit Café. Höhepunkt im Sommer: die mittäglichen Klavierkonzerte im gläsernen Konzertsaal Troldsalen – Programm vorher prüfen und Karten buchen. Die Bybane-Station Hop ist zu Fuß erreichbar." },
  { name:"Fantoft Stabkirche", dur:"halb", drive:"5 Min", tags:["Nah","Geschichte"],
    map:"Fantoft Stavkirke, Bergen", img:IMG.fantoft,
    note:"Dramatische Holz-Stabkirche im Wald, nur im Sommer zu besichtigen.",
    details:"Eine eindrucksvolle, pechschwarze Stabkirche im Wald von Fantoft. Das Original stammt von ~1150 vom Sognefjord und wurde 1883 hierher versetzt; nach einem Brandanschlag 1992 (Teil der berüchtigten Kirchenbrände) wurde sie bis 1997 originalgetreu wiederaufgebaut. Mit den drachenköpfigen Giebeln und der dunklen Schindelhaut ein fantastisches Fotomotiv. Innen nur im Sommer (ca. Mitte Mai–Mitte September) zu besichtigen. Lässt sich perfekt mit Troldhaugen verbinden." },
  { name:"Gamlehaugen – Königsresidenz", dur:"halb", drive:"5–10 Min", tags:["Nah","Schloss","Park"],
    map:"Gamlehaugen, Bergen", img:IMG.gamlehaugen,
    note:"Märchenschloss der Königsfamilie am Nordåsvannet mit Park & kleinem Strand.",
    details:"Die Bergener Residenz der norwegischen Königsfamilie – ein märchenhaftes Schlösschen im Stil eines kleinen Loire-Châteaus, malerisch am Ufer des Nordåsvannet. Der weitläufige Park mit kleinem Sandstrand ist immer frei zugänglich und lädt zum Spazieren und Picknicken ein. Das Innere kann nur im Rahmen begrenzter, saisonaler Führungen besichtigt werden – der Park und die Aussicht sind aber das eigentliche Highlight." },
  { name:"Ulriken643 Seilbahn", dur:"halb", drive:"10–15 Min", tags:["Nah","Aussicht","Wandern"],
    map:"Ulriken643, Bergen", img:IMG.ulriken,
    note:"Auf Bergens höchsten Hausberg (643 m). Panorama, Restaurant, Wanderwege, Zipline.",
    details:"Die Seilbahn bringt euch in wenigen Minuten auf Ulriken (643 m), den höchsten der sieben Stadtberge. Oben: ein gewaltiges 360°-Panorama über Stadt, Fjorde und Inseln, das Restaurant Skyskraperen, Wanderwege und Norwegens schnellste Zipline. Für Geübte führt die beliebte Höhenwanderung „Vidden\" über das Plateau hinüber zum Fløyen (~13 km, 4–6 h). Tickets ca. 450–500 NOK Erw. retour; optionaler Shuttlebus ab Zentrum." },
  { name:"Badeplätze: Melkeviken & Seen", dur:"halb", drive:"5–15 Min", tags:["Nah","Strand","Familie"],
    map:"Melkeviken Fanafjorden", img:IMG.fanafjord,
    note:"Strand am Fanafjord, dazu Seen wie Kalandsvatnet & Skomakerdiket.",
    details:"Für sonnige Tage: Melkeviken ist ein langer Strand am Fanafjord mit Wiesen, Sprungbrettern, Picknicktischen und Toiletten – der nächste „richtige\" Strand. Süßwasser-Alternativen sind der Kalandsvatnet (größter See der Gemeinde) und der kleine Waldsee Skomakerdiket unter dem Fløyen. Hinweis: Das Wasser ist im Juni noch frisch (14–17 °C) – etwas für mutige Schwimmer." },

  // Bergen Stadt (halber Tag)
  { name:"Fløyen & Fløibanen", dur:"halb", drive:"15–20 Min + Parken", tags:["Bergen","Aussicht","Familie"],
    map:"Fløibanen, Bergen", img:IMG.floyen,
    note:"Historische Standseilbahn auf 320 m. Stadtsicht, Trollwald, Wege, Café.",
    details:"Mit der historischen Standseilbahn Fløibanen geht es in ~6 Minuten auf den Hausberg Fløyen (320 m). Oben erwartet euch ein grandioser Blick über Bergen, den Hafen und die Inselwelt, dazu Wanderwege, ein verwunschener Trollwald (super für Kinder), ein Bergsee und ein Café. Die Bahn fährt alle 10–15 Min, ca. 07:30–23:00. Retour Erw. ~200–220 NOK, Kind ~100–120 (mit Bergen Card günstiger)." },
  { name:"Bryggen, Bergenhus & Fischmarkt", dur:"halb", drive:"15–20 Min + Parken", tags:["Bergen","UNESCO","Geschichte"],
    map:"Bryggen, Bergen", img:IMG.bryggen,
    note:"UNESCO-Hansekai, Festung Bergenhus & lebendiger Fischmarkt – zu Fuß verbunden.",
    details:"Das historische Herz Bergens: der UNESCO-Welterbe-Kai Bryggen mit seinen schiefen, bunten Holzhäusern aus der Hansezeit (nach dem Brand von 1702 größtenteils wiederaufgebaut), die enge Gassenwelt dahinter, die Festung Bergenhus mit der Håkonshalle (1247–61) und dem Rosenkrantzturm, sowie der lebhafte Fischmarkt (Fisketorget) mit Garnelen, Königskrabbe und Lachs. Alles bequem zu Fuß verbunden – ein perfekter Stadtvormittag." },
  { name:"KODE Kunstmuseen", dur:"halb", drive:"15–20 Min", tags:["Bergen","Kunst"],
    map:"KODE Art Museums Bergen", img:IMG.bergen,
    note:"Vier Häuser (KODE 1–4): Munch, Astrup, Picasso & der „Silberschatz\".",
    details:"Eine der größten Kunst- und Designsammlungen Skandinaviens, verteilt auf vier Gebäude (KODE 1–4) am See im Stadtzentrum. Highlights sind Werke von Edvard Munch, Nikolai Astrup und Picasso sowie der berühmte „Silberschatz\". Ein Ticket gilt für alle vier Häuser; auch die Komponistenheime (u.a. Troldhaugen) gehören zu KODE. Ideal für einen Regentag." },
  { name:"Akvariet – Aquarium", dur:"halb", drive:"~20 Min", tags:["Bergen","Familie"],
    map:"Akvariet i Bergen", img:IMG.aquarium,
    note:"Pinguine, Robben, Tropenfische. Eines der grössten Aquarien Norwegens.",
    details:"Eines der größten und ältesten Aquarien Norwegens auf der Halbinsel Nordnes. Pinguine, Robben, Schlangen, Krokodile und farbenfrohe Tropenfische, dazu Fütterungen und Shows – ein sicherer Hit mit Kindern, besonders bei Regen. Täglich geöffnet, sommers meist 10–18 Uhr. Mit Bergen Card 25 % Rabatt." },
  { name:"VilVite – Wissenschaftszentrum", dur:"halb", drive:"~15 Min", tags:["Bergen","Familie"],
    map:"VilVite Bergen", img:IMG.vilvite,
    note:"Interaktives Mitmach-Museum, ideal ab ~6 Jahren.",
    details:"Bergens interaktives Wissenschaftszentrum nahe der Universität: über 75 Mitmach-Stationen rund um Physik, Wetter, Öl und Körper – inklusive G-Kraft-Fahrrad und Wirbelsturm-Simulator. Ideal für neugierige Kinder ab ~6 Jahren und ein toller Schlechtwetter-Plan. Sommer-Öffnungszeiten vorab prüfen; mit Bergen Card 25 % Rabatt." },

  // Fjorde & Berge
  { name:"Mostraumen Fjordcruise (Rødne)", dur:"halb", drive:"15–20 Min zum Kai", tags:["Fjord","Boot","Familie","Empfehlung"],
    map:"Zachariasbryggen Bergen", img:IMG.osterfjord,
    note:"TOP-Halbtag ohne Selbstfahren: ~3 h ab Fischmarkt bis dicht an einen Wasserfall.",
    details:"Der beste Fjord-Halbtag ohne eigenes Fahren: Direkt vom Fischmarkt (Zachariasbryggen) geht es ~3–3,5 h hinaus in den Osterfjord. Das Boot fädelt sich durch die enge Meerenge Mostraumen mit ihren starken Gezeitenströmungen und fährt bis dicht an einen Wasserfall, sodass ihr die Gischt spürt. Steile Felswände, Wasserfälle, oft Robben und Adler. Ganzjährig (Rødne), familienfreundlich, mit Bergen Card 20 %. Vorab online buchen." },
  { name:"Hardangerfjord + Vøringsfossen", dur:"ganz", drive:"2,5–3 h", tags:["Fjord","Wasserfall","Natur","Empfehlung"],
    map:"Vøringsfossen", img:IMG.voringsfossen,
    note:"⭐ Pflichtausflug: Norwegens berühmtester Wasserfall (182 m) & Obstdörfer.",
    details:"Ein landschaftliches Highlight als Tagestour. Vøringsfossen stürzt 182 m in die wilde Måbødal-Schlucht – mit neuen, schwindelerregenden Aussichtsplattformen und einer Fußbrücke über die Kante. Die Fahrt führt über Voss und die elegante Hardangerbrücke in den „Obstgarten Norwegens\": die Dörfer Lofthus, Ulvik und Eidfjord am Hardangerfjord, Heimat von Apfel-, Kirsch- und Cidereien (z. B. Ulvik Frukt & Cideri). Ende Juni ist alles sattgrün und die Wasserfälle führen viel Wasser. Schöne Rückrunde über Granvin möglich." },
  { name:"Norway in a Nutshell (Flåm)", dur:"ganz", drive:"ab Bahnhof Bergen", tags:["Fjord","Zug","Klassiker","Empfehlung"],
    map:"Bergen Stasjon", img:IMG.flam,
    note:"Die berühmteste Tour: Bergenbahn + Flåmbahn + Nærøyfjord-Cruise + Bus.",
    details:"Norwegens berühmteste Rundtour an einem Tag – komplett mit öffentlichem Verkehr ab dem Bahnhof Bergen. Bausteine: die Bergenbahn übers Hochfjell, die spektakuläre Flåmbahn (Flåmsbana) – eine der schönsten Bahnstrecken der Welt mit Wasserfall-Halt –, eine ruhige E-Fjordkreuzfahrt durch den schmalen UNESCO-Nærøyfjord von Flåm nach Gudvangen und ein Bus über die Stalheim-Serpentinen nach Voss. Als Einzelticket über fjordtours.com (ab ~1.595 NOK/Erw.), ~10–12 h. ⚠️ UNBEDINGT früh buchen – Sommertermine sind oft Wochen vorher ausgebucht." },
  { name:"Folgefonna Gletscher-Nationalpark", dur:"ganz", drive:"2,5–3 h + Fähre", tags:["Gletscher","Natur"],
    map:"Folgefonna", img:IMG.folgefonna,
    note:"Norwegens drittgrösster Gletscher. Blaueis-Führungen & Sommerski.",
    details:"Norwegens drittgrößter Gletscher krönt eine eigene Halbinsel südlich des Hardangerfjords. Geführte Blaueis-Wanderungen (~5 h, nur mit zertifiziertem Guide!) führen über spaltenreiches, leuchtend blaues Eis; am Fonna-Sommerskizentrum kann man im Juni sogar Ski fahren. Dazu türkise Gletscherseen und Aussichtspunkte. Anfahrt mit kurzer Fjordfähre. Weniger touristisch als die großen Fjordklassiker – eigenständiges Gletscherlaufen ist gefährlich und verboten." },
  { name:"Trolltunga-Wanderung (Odda)", dur:"ganz", drive:"2,5–3 h", tags:["Wandern","Hart"],
    map:"Trolltunga Skjeggedal", img:IMG.trolltunga,
    note:"Ikonischer Felsvorsprung, 700 m über dem See. 20–28 km – nur für Sportliche.",
    details:"Der ikonische „Trollzungen\"-Felsen ragt 700 m über dem Ringedalsvatnet ins Leere – eines der berühmtesten Fotomotive Norwegens. Aber: eine sehr anspruchsvolle Bergwanderung von 20–28 km (7–12 h) mit großen Höhenunterschieden, nur für gut Trainierte mit festen Schuhen, Schichtkleidung, Proviant und sehr frühem Start. Wegen der langen Anfahrt (2,5–3 h nach Odda) realistisch nur mit Übernachtung in Odda. Ende Juni kann oben noch Restschnee liegen – Bedingungen prüfen, ggf. mit Guide." },
  { name:"Sognefjord", dur:"ganz", drive:"3–3,5 h", tags:["Fjord","Natur"],
    map:"Sognefjord", img:IMG.sognefjord,
    note:"„König der Fjorde\", >200 km lang & tiefster Fjord Europas.",
    details:"Der „König der Fjorde\" – mit über 200 km Länge der längste und tiefste Fjord Norwegens, mit steilen Bergflanken, Obstdörfern und Stabkirchen. Flåm und der Nærøyfjord sind Arme des Sognefjords, weshalb „Norway in a Nutshell\" das Beste davon kompakt an einem Tag liefert. Für mehr Zeit lohnen Orte wie Balestrand (auch per Schnellboot ab Bergen erreichbar)." },
];

/* ---- Tagesplan 20.–27. Juni 2026 (Fixpunkte – Ausflüge frei wählbar) ---- */
const ITINERARY = [
  { date:"Sa, 20. Juni", title:"Anreise & Ankommen", icon:"🛬",
    items:[
      "Ankunft & Einrichten in Austrevågen 111, Fana.",
      "Erster Grosseinkauf bei Coop Obs / Rema 1000 im Lagunen (5–10 Min).",
      "⚠️ Wein/Spirituosen heute bis 16:00 beim Vinmonopolet Lagunen besorgen – Sa Nachmittag & So geschlossen!",
      "Entspannt ankommen, lokal essen (z. B. Vertshuset Konow – vorher anrufen)."
    ]},
  { date:"So, 21. Juni", title:"Sonntag = Läden zu", icon:"🌳",
    items:[
      "Fast alle Geschäfte geschlossen (nur Bunnpris/Kiosk/Bäcker) – Großeinkauf besser schon Sa erledigt.",
      "Idealer Tag für kurze Wege & Natur in der Nähe.",
      "Längster Tag des Jahres: ~19 h Tageslicht, Sonne bis ~23 Uhr.",
      "👉 Stöbert im Tab „Ausflüge\" (Filter „Nah\") und wählt selbst."
    ]},
  { date:"Mo–Fr, 22.–26. Juni", title:"Eure Ausflugstage – frei wählbar", icon:"🧭",
    items:[
      "Diese Tage sind frei für Ausflüge eurer Wahl – öffnet den Tab „Ausflüge\" und stöbert.",
      "Mischt Halbtags- (nah) und Ganztagstouren (Fjorde). ⭐ markiert Highlights.",
      "Grosse Touren (Norway in a Nutshell, Cornelius-Dinner) FRÜH online buchen – sommers ausverkauft.",
      "🔥 Di, 23. Juni – Sankthansaften: abends Mittsommer-Lagerfeuer an der Küste (z. B. Nordnes), ~21–23 Uhr.",
      "Tipp: Merkt Favoriten mit dem ☆-Symbol auf den Karten und filtert nach „Merkliste\"."
    ]},
  { date:"Sa, 27. Juni", title:"Abreise", icon:"🧳",
    items:[
      "Letzte Einkäufe & Souvenirs (Brunost, Skillingsboller, Aquavit).",
      "Gemütlicher Abschiedskaffee.",
      "Auto volltanken/laden & rechtzeitig zum Flughafen/zur Fähre."
    ]},
];

/* ---- Sprachführer (Bokmål · Deutsch · Aussprache) ---- */
const PHRASES = [
  { group:"Begrüssung & Grundlegendes", items:[
    ["Hei","Hallo","hai"],["God morgen","Guten Morgen","gu morn"],["God dag","Guten Tag","gu dahg"],
    ["God kveld","Guten Abend","gu kwell"],["Ha det (bra)","Tschüss / Auf Wiedersehen","ha de (brah)"],
    ["Vi ses","Bis bald","wi sehs"],["Ja / Nei","Ja / Nein","ja / nai"],["Takk","Danke","takk"],
    ["Tusen takk","Vielen Dank","tüssen takk"],["Vær så snill","Bitte (bittend)","wär so snill"],
    ["Vær så god","Bitte (gebend) / Gern geschehen","wär so gu"],["Unnskyld","Entschuldigung","ünn-schüll"],
    ["Beklager","Es tut mir leid","be-klah-ger"],["Hvordan går det?","Wie geht es Ihnen?","wurdan gor de"],
    ["Bare bra, takk","Danke, gut","bahre brah, takk"],["Snakker du engelsk/tysk?","Sprichst du Englisch/Deutsch?","snakker dü engelsk/tüsk"],
    ["Jeg forstår ikke","Ich verstehe nicht","jai forstor ikke"],
  ]},
  { group:"Restaurant & Essen", items:[
    ["Et bord til to, takk","Einen Tisch für zwei, bitte","et bur til tu, takk"],["Menyen, takk","Die Speisekarte, bitte","menü-en, takk"],
    ["Vann","Wasser","wann"],["Øl","Bier","öll"],["Kaffe","Kaffee","kaffe"],["Rødvin / hvitvin","Rotwein / Weisswein","rö-win / wit-win"],
    ["Skål!","Prost!","skohl"],["Regningen, takk","Die Rechnung, bitte","rai-ningen, takk"],
    ["Kan jeg betale med kort?","Kann ich mit Karte zahlen?","kann jai betahle me kort"],["Det var godt","Das war lecker","de war gott"],
  ]},
  { group:"Einkaufen", items:[
    ["Hvor mye koster det?","Wie viel kostet das?","wur mü-e koster de"],["Det er for dyrt","Das ist zu teuer","de är for düürt"],
    ["Jeg tar denne","Ich nehme das","jai tahr denne"],["Har dere …?","Haben Sie …?","hahr dere"],
    ["En pose, takk","Eine Tüte, bitte","en puse, takk"],["Åpningstider","Öffnungszeiten","op-nings-tider"],
  ]},
  { group:"Wegbeschreibung", items:[
    ["Hvor er …?","Wo ist …?","wur är"],["Til venstre / høyre","Nach links / rechts","til wenstre / höü-re"],
    ["Rett fram","Geradeaus","rett framm"],["Toalettet","Die Toilette","tu-a-lettet"],
    ["Togstasjonen","Der Bahnhof","tohg-sta-schunen"],["Hvor langt er det?","Wie weit ist es?","wur langt är de"],
  ]},
  { group:"Notfall", items:[
    ["Hjelp!","Hilfe!","jelp"],["Ring politiet!","Rufen Sie die Polizei!","ring pulitiet"],
    ["Jeg trenger en lege","Ich brauche einen Arzt","jai trenger en lehge"],["Sykehus","Krankenhaus","süke-hüss"],
    ["Legevakt","Notfallpraxis","lehge-wakt"],["Apotek","Apotheke","apu-tehk"],["Det er et nødstilfelle","Es ist ein Notfall","de är et nöd-stil-felle"],
  ]},
  { group:"Zahlen & Tage", items:[
    ["En, to, tre","Eins, zwei, drei","ehn, tu, treh"],["Fire, fem, seks","Vier, fünf, sechs","fiire, femm, seks"],
    ["Sju, åtte, ni, ti","Sieben, acht, neun, zehn","schü, otte, nii, tii"],["Mandag / Tirsdag","Montag / Dienstag","mandag / tirsdag"],
    ["Onsdag / Torsdag","Mittwoch / Donnerstag","unsdag / torsdag"],["Fredag / Lørdag / Søndag","Freitag / Samstag / Sonntag","fredag / lördag / söndag"],
  ]},
];

/* ---- Norwegische Spezialitäten ---- */
const FOOD = [
  ["Bergensk fiskesuppe","Bergener Fischsuppe: hell, sahnig, leicht süsslich-säuerlich. Ein Muss.", IMG.seafood],
  ["Laks","Lachs – gegrillt, gebeizt (gravet) oder geräuchert.", IMG.seafood],
  ["Persetorsk","Bergener Spezialität: gepresster, leicht gesalzener Kabeljau mit Kartoffeln & Speck.", IMG.seafood],
  ["Reinsdyr","Rentier – zartes, dunkles Wildfleisch, oft mit Preiselbeeren.", IMG.reindeer],
  ["Kjøttkaker","Norwegische Fleischklösse mit brauner Sosse, Kartoffeln & Erbsen.", IMG.restaurant],
  ["Raspeballer / Komle","Grosse Kartoffelklösse (in Bergen „Komle\"), traditionell donnerstags.", IMG.restaurant],
  ["Brunost","Brauner Karamell-Molkenkäse, süsslich – dünn auf Brot oder Waffeln.", IMG.cinnamon],
  ["Skillingsbolle","Die berühmte Bergener Zimtschnecke – gross & rund. Wahrzeichen der Stadt.", IMG.cinnamon],
  ["Aquavit (Akevitt)","Kräuterschnaps mit Kümmel/Dill – zu deftigem Essen. „Skål!\"", IMG.beer],
];

/* ---- Notfall & Praxis ---- */
const EMERGENCY = [
  { label:"Polizei (Politi)", num:"112" },
  { label:"Notarzt / Rettung", num:"113" },
  { label:"Feuerwehr (Brann)", num:"110" },
  { label:"Ärztl. Bereitschaft", num:"116117" },
];

/* ---- Packliste ---- */
const PACKING = [
  "Wasserdichte Regenjacke (Pflicht – Bergen ist Europas Regenhauptstadt)",
  "Regenhose für Wanderungen",
  "Wasserdichte Schuhe / Wanderstiefel",
  "Warmer Fleece / Pullover (auch im Sommer)",
  "Zwiebellook: leichte Schichten",
  "Dünne Mütze & Handschuhe für Bergausflüge",
  "Sonnenbrille & Sonnencreme (19 h Tageslicht!)",
  "Schlafmaske gegen die hellen Nächte",
  "Trinkflasche (Leitungswasser ist top)",
  "Kreditkarte/Apple Pay (Norwegen ist fast bargeldlos)",
  "Lade-Apps: Mer, Recharge/Eviny, Plugsurfing",
  "Skyss-App fürs Bybane-Ticket",
  "Tagesrucksack, Powerbank",
  "Badesachen (für mutige Schwimmer)",
];
