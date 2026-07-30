/*
 * Single source of truth for the vehicle gallery on Oprema.html. Add or
 * remove a vehicle here and the grid on the page follows automatically -
 * no separate placeholder tile needed to keep the layout looking right.
 *
 * To add a vehicle:
 *   1. Create its page (copy an existing one like FordRanger.html as a
 *      starting point) with its own photo carousel.
 *   2. Add one entry below with its title, that page's filename, and a
 *      representative thumbnail image.
 */
window.VOZILA = [
  { title: 'Čoln', href: 'Coln.html', img: 'images/IMG_20210828_173242.jpg', imgWidth: 4608, imgHeight: 2592 },
  { title: 'Ford Ranger VGV', href: 'FordRanger.html', img: 'images/IMG_20210828_171054.jpg', imgWidth: 1600, imgHeight: 900 },
  { title: 'Man GVC 16/25', href: 'ManGVC.html', img: 'images/IMG_20210828_172045.jpg', imgWidth: 1600, imgHeight: 900 },
  { title: 'Mitsubishi L200 GVGP-1', href: 'Mitsubishi.html', img: 'images/P1010546.JPG', imgWidth: 1600, imgHeight: 900 },
  { title: 'Ford Transit GVM-1', href: 'FordTransit.html', img: 'images/IMG_20210828_173042.jpg', imgWidth: 1600, imgHeight: 900 },
];
