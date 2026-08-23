---
layout: single
title: "Ionospheric Tomography"
permalink: /research/ionospheric-tomography/
author_profile: true
---

## A brief introduction

The ionosphere is the electrically charged part of the upper atmosphere. Extreme-ultraviolet and X-ray radiation from the Sun create free electrons, while solar-wind forcing, geomagnetic activity, and lower-atmosphere dynamics continually modify their density. Sudden stratospheric warming (SSW) is an especially clear example of vertical coupling: planetary-scale waves generated in the troposphere propagate into the stratosphere, rapidly raise polar-stratospheric temperatures, and alter the circulation that reaches the ionosphere. A study led by MIT Haystack Observatory found that a major SSW was followed by a strong nighttime electron-density depletion, forming a large ionospheric hole that extended from about 55 degrees S to 45 degrees N. The result is a dynamic interface between the Sun, near-Earth space, and the lower atmosphere rather than a static shell around Earth.

<figure class="research-figure research-figure--ionosphere-hole">
  <img src="/images/mit-ionosphere-hole.jpeg" alt="Green aurora over Earth observed from space" loading="lazy">
  <figcaption>Green aurora viewed from space over the nighttime atmosphere. The associated MIT study showed that sudden stratospheric warming can reduce nighttime ionospheric electron density for several days, producing a depletion that spans both hemispheres. Source: <a href="https://news.mit.edu/2018/ionosphere-hole-caused-sudden-stratospheric-warming-0806">MIT News study summary</a>. Credit: NASA/JPL.</figcaption>
</figure>

These changes matter because electron density alters the propagation of radio waves. It introduces delay, refraction, scintillation, and Faraday rotation in satellite-navigation, communication, radar, and remote-sensing signals. Navigation receivers therefore need an ionospheric correction, obtained from models or measurements, to convert signal travel time into an accurate position. A three-dimensional electron-density field is important because it distinguishes vertical layering from horizontal structures, supports propagation corrections, and reveals how disturbances evolve through the coupled Sun-Earth system.

<figure class="research-figure research-figure--space-weather">
  <img src="/images/nasa-space-weather-illustration.png" alt="NASA illustration of space weather effects on the ionosphere, satellites, GPS, and radio systems" loading="lazy">
  <figcaption>Examples of space-weather pathways affecting the ionosphere, satellites, GPS, and radio systems. Source: <a href="https://svs.gsfc.nasa.gov/vis/a000000/a004900/a004923/SpaceWeatherIllustration.pdf">NASA Space Weather Illustration</a>. Credit: NASA Goddard Space Flight Center, Scientific Visualization Studio.</figcaption>
</figure>

Ionospheric tomography reconstructs this three-dimensional field from indirect observations. GNSS receivers provide continuous, wide-area measurements of slant total electron content, but TEC is a path integral: it does not identify where along a ray the electrons are located, and receiver geometry, gaps, and instrumental biases limit the reconstruction. An ionosonde supplies a valuable local vertical profile and layer heights, yet its coverage is confined to a site and it cannot resolve a changing three-dimensional structure on its own. Incoherent scatter radar (ISR) gives altitude-resolved density and rich plasma diagnostics, but ISR facilities are costly, geographically sparse, and limited in observing volume and time. Spaceborne SAR and polarimetric SAR (PolSAR/PALSAR) add broad swaths and oblique viewing paths, which improve spatial sampling where ground instruments are sparse; their measurements remain sensitive to calibration, geometry, signal-to-noise ratio, and propagation models. The advantage of SAR is therefore complementarity: it supplies additional directions and regional coverage rather than replacing the other observations.

The inverse problem remains underdetermined because the available rays are sparse, unevenly distributed, and often limited in angle. Tomographic methods combine these measurements with physical or empirical models and regularization, balancing data fit against a physically plausible electron-density field. Independent observations and sensitivity tests are needed to distinguish features supported by measurements from structures introduced by the prior model. This is where estimation theory becomes practically meaningful: bounds and estimators must reflect the sampling limitations and physical variability of atmospheric observations.

<figure class="research-figure research-figure--tomography">
  <img src="/images/ionospheric-tomography-reconstruction.png" alt="Three-dimensional reconstruction of ionospheric electron density across latitude, longitude, and altitude" loading="lazy">
  <figcaption>Example three-dimensional reconstruction of ionospheric electron density. Credit: Liming Wang, reproduced from the supplied <code>fig2c.pdf</code> source figure.</figcaption>
</figure>

## Related publications

[J4](/research/#J4), [J5](/research/#J5), [J6](/research/#J6), [J11](/research/#J11)
