/*
 * Single source of truth for the "Intervencije" listing (blog/blog.html's
 * table) and the home page's two newest-intervention cards (Domov.html,
 * index.html). Both pages render from this same array via site.js, so
 * adding one entry here updates both places automatically - sorted
 * newest-first by `date`.
 *
 * To add a new intervencija:
 *   1. Add its post page under blog/, as usual.
 *   2. Add one entry below with that post's date, title, href, image, and
 *      a short teaser sentence.
 */
window.INTERVENCIJE = [
  { date: "2023-04-21", title: 'Požar objekta, Bezjakova ulica', href: "blog/Požar objekta, Bezjakova ulica.html", img: "images/PožarObjektaBezjakova/342351208_1660664391040070_6539903676715754162_n-768x432.jpg", teaser: 'Ob 17.16 je v Bezjakovi ulici v naselju Pekre, zagorela stanovanjska ..' },
  { date: "2023-03-25", title: 'Požar objekta, Hrastje', href: "blog/Požar objekta, Hrastje.html", img: "images/PožarObjektaHrastje/received_1050487016339165.jpeg", teaser: 'Ob 20.07 je v Hrastju, občina Maribor gorel leseno objekt površine ..' },
  { date: "2023-03-04", title: 'Požar v kurilnici, Hrastje', href: "blog/Požar v kurilnici, Hrastje.html", img: "images/PožarVKurilniciHrastje/342520864_1000127308017567_5701134686014313420_n.jpg", teaser: 'Ob 8.16 je v naselju Hrastje v občini Maribor zagorelo v kurilnici ..' },
  { date: "2023-03-02", title: 'Črpanje vode, Hrastje', href: "blog/Črpanje vode, Hrastje.html", img: "images/ČrpanjeVodeHrastje/Web_Photo_Editor (1).jpg", teaser: 'Ob 11.05 so gasilci PGD Pekre bili napoteni na črpanje vode ..' },
  { date: "2023-02-10", title: 'Požar v kurilnici, Laznica', href: "blog/Požar v kurilnici, Laznica.html", img: "images/PožarVKurilniciLaznica/Web_Photo_Editor (1).jpg", teaser: 'Ob 14.24 je na Cesti k Dravi v naselju Laznica, občina Maribor, ..' },
  { date: "2023-01-24", title: 'Podrta drevesa, Laznica', href: "blog/Podrta drevesa, Laznica.html", img: "images/PodrtaDrevesaObLazniškemPotoku/1674557510096.jpg", teaser: 'Ob 7:44, so gasilci PGD Pekre v Laznici razžagali in odstranili ..' },
  { date: "2023-01-20", title: 'Požar objketa, Laznica', href: "blog/Požar objketa, Laznica.html", img: "images/PožarObjektaLaznica/photo_2023-01-20_18-37-36.jpg", teaser: 'Ob 17.57 je v naselju Laznica, občina Maribor, zagorel lesen ..' },
  { date: "2023-01-16", title: 'Podrto drevo, Limbuš', href: "blog/Podrto drevo, Limbuš.html", img: "images/PodrtoDrevoObBlažovnici/343077457_1403753850416369_6662967514889868529_n.jpg", teaser: 'Ob 7:59, je v ulici Ob Blažovnici zaradi snega padlo drevo na ..' },
  { date: "2023-01-15", title: 'Požar v naravi, Hrastje', href: "blog/Požar v naravi, Hrastje   .html", img: "images/PozarVNaraviHrastje15.1.2023/20230115_112027.jpg", teaser: 'Ob 11.07 je v Hrastju, občina Maribor, zaradi odloženega pepla ..' },
  { date: "2023-01-01", title: 'Požar v naravi, Hrastje', href: "blog/Požar v naravi, Hrastje .html", img: "images/PozarVNaravi/Posnetek zaslona 2023-01-06 000356.jpg", teaser: 'Ob 0.16 je v Hrastju, gorela podrast na površini 400 kvadranih ..' },
  { date: "2022-11-12", title: 'Požar vikenda, Hrastje', href: "blog/Požar vikenda, Hrastje.html", img: "images/PožarVikendaHrastje/IMG_20221112_200854.jpg", teaser: 'Ob 19.48 je v Hrastju prišlo do požara na vikend objektu. Gasilci ..' },
  { date: "2022-07-28", title: 'Dim v stanovanju, Ulica Arnolda Tovornika', href: "blog/Dim v stanovanju, Ulica Arnolda Tovornika.html", img: "images/PožarStanovanja/20220728_195640_HDR.jpg", teaser: 'Ob 19.20 je v Ulici Arnolda Tovornika v Mariboru v stanovanju ..' },
  { date: "2022-07-20", title: 'Požar na Krasu', href: "blog/Požar na Krasu.html", img: "images/Kras/DSC_9750.jpg", teaser: 'Gasilci PGD Pekre smo sodelovali tudi na Krasu, kjer je divjal ..' },
  { date: "2022-06-21", title: 'Podrt požarni zid, Laznica', href: "blog/Podrt požarni zid, Laznica.html", img: "images/PodrtPožarniZid/IMG_20220621_100732.jpg", teaser: 'Ob 9.08 se je v Laznici zaradi močnega vetra podrl del požarnega ..' },
  { date: "2022-06-21", title: 'Podrto drevo, Laznica', href: "blog/Podrto drevo, Laznica.html", img: "images/PodrtoDrevoLaznica/IMG_20220621_094311.jpg", teaser: 'Ob 9.08 je v Laznici zaradi močnega vetra padlo drevo čez cesto. ..' },
  { date: "2022-06-21", title: 'Požar garaže, Ob Blažovnici', href: "blog/Požar garaže, Ob Blažovnici.html", img: "images/DimVObjektu/Web_Photo_Editor (1).jpg", teaser: 'Ob 0.36 je v Limbušu gorelo ostrešje pomožnega objekta. Gasilci ..' },
  { date: "2022-06-20", title: 'Poškodovana streha, Limbuška cesta', href: "blog/Poškodovana streha, Limbuška cesta.html", img: "images/DimVObjektu/Web_Photo_Editor (1).jpg", teaser: 'Ob 22:40 je na Limbuški cesti močan veter poškodoval del strehe. ..' },
  { date: "2022-06-20", title: 'Odkrita streha, Bezjakova ulica', href: "blog/Odkrita streha, Bezjakova ulica.html", img: "images/OdkritaStrehaBezjakova/received_2863412230622159.jpeg", teaser: 'Ob 21.57 je v Bezjakovi ulici močan veter odkri del strehe. ..' },
  { date: "2022-04-14", title: 'Požar v naravi, Laznica', href: "blog/Požar v naravi, Laznica.html", img: "images/PozarVNaraviLaznica/FB_IMG_1649937905873.jpg", teaser: 'Ob 5.45 je zagorela suha trava in podrast na površini okoli ..' },
  { date: "2022-03-23", title: 'Kurjenje v naravi, Vrhov dol', href: "blog/Kurjenje v naravi, Vrhov dol.html", img: "images/KurjenjeVNaraviVrhovDol/Posnetek zaslona 2023-01-06 211942.png", teaser: 'Ob 13.22 je v naselju Vrhov Dol, občina Maribor, občan kljub ..' },
  { date: "2022-03-20", title: 'Travniški požar, Hrastje', href: "blog/Travniški požar, Hrastje.html", img: "images/DimVObjektu/Web_Photo_Editor (1).jpg", teaser: 'Ob 12.24 so v naselju Hrastje, občina Maribor, gasilci PGD Pekre ..' },
  { date: "2022-03-13", title: 'Požar v naravi, Hrastje', href: "blog/Požar v naravi, Hrastje.html", img: "images/PozarVNaravi/Posnetek zaslona 2023-01-06 000356.jpg", teaser: 'Ob 13.00 je v naselju Hrastje, občina Maribor, občanu pri kurjenju ..' },
  { date: "2022-02-15", title: 'Dim v objektu', href: "blog/Dim v objektu.html", img: "images/DimVObjektu/Web_Photo_Editor (1).jpg", teaser: 'Ob 11.52 se je v Ulici Jožeta Korošca iz objekta zaradi pozabljene ..' },
  { date: "2022-02-10", title: 'Požar v naravi', href: "blog/Požar v naravi.html", img: "images/PozarVNaravi/Posnetek zaslona 2023-01-06 000356.jpg", teaser: 'Ob 15.32 je ob Limbuški cesti v Limbušu, gorela trava. Gasilci ..' },
  { date: "2022-01-09", title: 'Požar v kurilnici, Pekre', href: "blog/Požar v kurilnici, Pekre.html", img: "images/PožarVKurilnici/271251544_1826013030915865_3141044477881180762_n.jpg", teaser: 'Ob 7.14 je v ulici K žagi, zagorelo v kurilnici stanovanjske ..' },
  { date: "2022-01-02", title: 'Požar elektro droga, Vrhov dol', href: "blog/Požar elektro droga, Vrhov dol.html", img: "images/PozarEletkroDroga/IMG_20220102_190820.jpg", teaser: 'Ob 18.12 je v naselju Vrhov Dol, občina Maribor, gorel drog ..' },
  { date: "2021-12-21", title: 'Požar apartmaji Bolfenk', href: "blog/PozarBolfenkApartmaji.html", img: "images/PozarBolfenkApartmaji/PozarBolfenk (8).jpg", teaser: 'Ob 20.35 je na Hočkem Pohorju v občini Hoče - Slivnica zagorelo..' },
  { date: "2021-09-25", title: 'Požar na objektu, Hrastje', href: "blog/PozarHrastje.html", img: "images/PozarHrastje/PozarHrastje (1).jpg", teaser: 'Ob 17.28 je v naselju Hrastje v občini Maribor zagorel leseni objekt..' },
  { date: "2021-04-04", title: 'Požar Garaže', href: "blog/PozarGaraza.html", img: "images/PozarGaraza/PozarGaraza (3).jpg", teaser: 'Ob 14.02 je v naselju Limbuš,  občina Maribor, zagorela lesena lopa..' },
  { date: "2020-12-28", title: 'Razlitje Pekrskega Potoka', href: "blog/PekrskiPotok.html", img: "images/RazlitjePekrskegaPotoka/PekrskiPotok (1).jpg", teaser: 'Ob 20.10 je v ulici Na Gorco v Pekrah, Pekrski potok poplavil cestišče..' },
  { date: "2020-11-17", title: 'Požar v objektu Bezjakova c.', href: "blog/PozarBezjakova.html", img: "images/PozarBezjakova/PozarBezjakova.jpg", teaser: 'Ob 12.26 je v Bezjakovi ulici v naselju Pekre v kuhinji stanovanja zagorela kuhinjska napa..' },
  { date: "2020-07-11", title: 'Pomoč pri razsvetljavi', href: "blog/PomocRazsvetljava.html", img: "images/PomocRazsvetljava/PomocRazsvetljava (2).jpeg", teaser: 'Ob 0.43 so na Lackovi cesti v Pekrah, občina Maribor, gasilci PGD Pekre nudili pomoč..' },
  { date: "2020-03-19", title: 'Požar v objektu Pohorska c.', href: "blog/PozarObjektPohorska.html", img: "images/PozarObjektPohorska/PozarPohorska (6).jpeg", teaser: 'Ob 13.43 je na Pohorski cesti v Mariboru zagorelo na terasi ene od vrstnih hiš..' },
  { date: "2020-03-02", title: 'Požar Surovina', href: "blog/Surovina.html", img: "images/Surovina/Surovina (1).jpeg", teaser: 'Ob 12.38 je zagorelo v podjetju Surovina v Mariboru..' },
  { date: "2020-01-03", title: 'Požar Lisička na Pohorju', href: "blog/PozarLisicka.html", img: "images/PozarLisicka/PozarLisicka (2).jpg", teaser: 'Ob 2.02 je na Hočkem Pohorju, občina Hoče Slivnica, v bližini vzpenjače zagorelo..' },
];
