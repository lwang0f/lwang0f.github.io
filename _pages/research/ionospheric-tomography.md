---
layout: single
title: "Ionospheric Tomography"
permalink: /research/ionospheric-tomography/
author_profile: true
---

## A brief introduction

The ionosphere is the electrically charged part of the upper atmosphere. Extreme-ultraviolet and X-ray radiation from the Sun create free electrons, while the solar wind and geomagnetic activity continually modify their density. During a solar storm, a stronger and denser solar wind compresses Earth's magnetosphere and transfers energy through magnetic reconnection and field-aligned currents. Charged particles and electromagnetic energy are guided toward both polar regions, where they heat and redistribute the upper atmosphere and produce auroral disturbances. Winds, tides, and gravity waves from the neutral atmosphere below also reshape the ionosphere. The result is a dynamic interface between the Sun, near-Earth space, and the atmosphere rather than a static shell around Earth.

<figure class="research-figure research-figure--solar-storm">
  <img src="/images/nasa-solar-storm-polar-injection.jpg" alt="Solar wind interacting with Earth's magnetosphere and field-aligned currents entering the polar ionosphere" loading="lazy">
  <figcaption>Solar-wind interaction with Earth's magnetosphere (left) and field-aligned currents coupling the magnetosphere to the polar ionosphere (right). Credit: composite by Liming Wang from ESA/NASA SOHO, <a href="https://soho.nascom.nasa.gov/bestofsoho/Particle/solwind.html">Solar Wind and the Earth's Protective Magnetic Shield</a>, and NASA Goddard Space Flight Center, <a href="https://svs.gsfc.nasa.gov/12457/">AGU Ionosphere Press Conference</a>.</figcaption>
</figure>

These changes matter because electron density alters the propagation of radio waves. It introduces delay, refraction, scintillation, and Faraday rotation in satellite-navigation, communication, radar, and remote-sensing signals. Navigation receivers therefore need an ionospheric correction, obtained from models or measurements, to convert signal travel time into an accurate position. A three-dimensional electron-density field is important because it distinguishes vertical layering from horizontal structures, supports propagation corrections, and reveals how disturbances evolve through the coupled Sun-Earth system.

<figure class="research-figure research-figure--space-weather">
  <img src="/images/nasa-space-weather-illustration.png" alt="NASA illustration of space weather effects on the ionosphere, satellites, GPS, and radio systems" loading="lazy">
  <figcaption>Examples of space-weather pathways affecting the ionosphere, satellites, GPS, and radio systems. Credit: NASA Goddard Space Flight Center, Scientific Visualization Studio, <a href="https://svs.gsfc.nasa.gov/vis/a000000/a004900/a004923/SpaceWeatherIllustration.pdf">Space Weather Illustration</a>.</figcaption>
</figure>

Ionospheric tomography reconstructs this three-dimensional field from indirect observations. GNSS receivers provide continuous, wide-area measurements of slant total electron content, but TEC is a path integral: it does not identify where along a ray the electrons are located, and receiver geometry, gaps, and instrumental biases limit the reconstruction. An ionosonde supplies a valuable local vertical profile and layer heights, yet its coverage is confined to a site and it cannot resolve a changing three-dimensional structure on its own. Incoherent scatter radar (ISR) gives altitude-resolved density and rich plasma diagnostics, but ISR facilities are costly, geographically sparse, and limited in observing volume and time. Spaceborne SAR and polarimetric SAR (PolSAR/PALSAR) add broad swaths and oblique viewing paths, which improve spatial sampling where ground instruments are sparse; their measurements remain sensitive to calibration, geometry, signal-to-noise ratio, and propagation models. The advantage of SAR is therefore complementarity: it supplies additional directions and regional coverage rather than replacing the other observations.

The inverse problem remains underdetermined because the available rays are sparse, unevenly distributed, and often limited in angle. Tomographic methods combine these measurements with physical or empirical models and regularization, balancing data fit against a physically plausible electron-density field. Independent observations and sensitivity tests are needed to distinguish features supported by measurements from structures introduced by the prior model. This is where estimation theory becomes practically meaningful: bounds and estimators must reflect the sampling limitations and physical variability of atmospheric observations.

<figure class="research-figure research-figure--tomography">
  <img src="/images/ionospheric-tomography-reconstruction.png" alt="Three-dimensional reconstruction of ionospheric electron density across latitude, longitude, and altitude" loading="lazy">
  <figcaption>Example three-dimensional reconstruction of ionospheric electron density. Credit: Liming Wang, reproduced from the supplied <code>fig2c.pdf</code> source figure.</figcaption>
</figure>

## Related publications

[J4](/research/#J4), [J5](/research/#J5), [J6](/research/#J6), [J11](/research/#J11)
