---
layout: single
title: "Ionospheric Tomography"
permalink: /research/ionospheric-tomography/
author_profile: true
---

## Overview

The ionosphere is the electrically charged part of the upper atmosphere. Solar extreme-ultraviolet and X-ray radiation create the free electrons, while solar-wind and geomagnetic disturbances drive changes from above. Winds, tides, gravity waves, and other forms of terrestrial weather propagate upward from below and also reshape the ionosphere. It is therefore a variable interface between the Sun, near-Earth space, and the neutral atmosphere rather than a static shell around Earth.

This variability matters because electron density changes the way radio waves travel. It produces propagation delay, refraction, scintillation, and Faraday rotation, affecting satellite navigation, communication links, radar, and remote sensing. Navigation receivers therefore need an ionospheric correction, estimated from models or measurements, to turn a signal travel time into an accurate position. A three-dimensional electron-density field helps separate vertical layering from horizontal structures, quantify these corrections, and test models of space-weather disturbances. The aim of ionospheric tomography is to recover that field from indirect observations.

<figure class="research-figure research-figure--gold">
  <img src="/images/nasa-gold-ionosphere-scanning.jpg" alt="Bird's-eye view of the ionosphere with NASA GOLD and ICON satellite observing geometries" loading="lazy">
  <figcaption>Bird's-eye model view of the ionosphere and satellite observing geometry. GOLD views a broad hemisphere from geostationary orbit, while ICON samples from low Earth orbit; the colors represent modeled singly ionized oxygen density. Source: NASA Goddard Space Flight Center, <a href="https://svs.gsfc.nasa.gov/gallery/gold/">GOLD mission gallery</a>.</figcaption>
</figure>

<figure class="research-figure research-figure--space-weather">
  <img src="/images/nasa-space-weather-illustration.png" alt="NASA illustration of space weather effects on the ionosphere, satellites, GPS, and radio systems" loading="lazy">
  <figcaption>Space-weather pathways linking solar activity, the ionosphere, satellites, and radio/GNSS systems. Source: NASA Goddard Space Flight Center, Scientific Visualization Studio, <a href="https://svs.gsfc.nasa.gov/vis/a000000/a004900/a004923/SpaceWeatherIllustration.pdf">Space Weather Illustration</a>.</figcaption>
</figure>

## Observing the ionosphere

No single instrument provides a complete three-dimensional view. Each technique samples a different observable, location, and scale, so tomography combines their complementary information.

<figure class="research-figure">
  <img src="/images/ionosphere-observation-geometry.png" alt="Observation geometry of the ionosphere with GNSS, ionosonde, ISR, and SAR or PolSAR paths" loading="lazy">
  <figcaption>Observation geometry for ionospheric tomography. GNSS, ionosonde, ISR, and SAR/PolSAR measurements probe different parts of the same spatially varying electron-density field.</figcaption>
</figure>

### GNSS

Ground GNSS receivers use dual-frequency satellite signals to estimate slant total electron content (TEC), the electron density integrated along each satellite-to-receiver path. GNSS observations are continuous and available over large regions, which makes them the main source of global and regional ionospheric monitoring. TEC is a path integral, however: it does not reveal where along the ray the electrons are located. Receiver distribution and satellite geometry also leave gaps, and instrumental biases and mapping assumptions must be handled carefully.

### Ionosonde

An ionosonde transmits a swept-frequency pulse and measures the reflected signal to estimate local electron-density profiles, critical frequencies, and layer heights. It provides a useful vertical reference at a fixed site, but its spatial coverage is local and its interpretation can become difficult during absorption, spread-F, or irregular propagation. A network of ionosondes still cannot by itself resolve a continuously varying three-dimensional field.

### Incoherent scatter radar (ISR)

ISR measures the spectrum of incoherently scattered radio waves to retrieve altitude-resolved electron density and additional plasma parameters such as temperature, drift velocity, and composition-related information. The measurements are physically rich and valuable for validating models, but ISR facilities are expensive, geographically sparse, and usually provide detailed coverage only over a limited volume and observing schedule.

### SAR, PolSAR, and PALSAR

Side-looking spaceborne SAR provides broad swaths and oblique propagation paths that complement the mostly vertical profiles and ground-to-satellite GNSS rays. Polarimetric SAR (PolSAR), including PALSAR-type observations, can add sensitivity through polarization and Faraday-rotation effects. These measurements are not a direct replacement for GNSS, ionosondes, or ISR: the inversion depends on calibration, geometry, propagation models, and the available signal-to-noise ratio. Their principal value is complementary spatial coverage and additional viewing directions, especially where ground instruments are sparse.

## Tomographic reconstruction

The inverse problem is underdetermined because the available rays are sparse, unevenly distributed, and often limited in angle. Measurements also have different resolutions, error statistics, and temporal sampling. Reconstruction therefore combines path-integrated data, local profiles, physical models, and regularization. The resulting balance between data fit and physically plausible structure determines which features can be resolved and which remain prior-dependent.

Independent observations are essential for checking resolution and bias. Sensitivity to the background model, the regularization strength, and the selected data sources reveals where a reconstructed feature is supported by measurements and where it reflects an assumption. This connection between estimation theory and concrete atmospheric observations is central to making ionospheric tomography scientifically useful.

<figure class="research-figure research-figure--tomography">
  <img src="/images/ionospheric-tomography-reconstruction.png" alt="Three-dimensional reconstruction of ionospheric electron density across latitude, longitude, and altitude" loading="lazy">
  <figcaption>Example three-dimensional reconstruction of ionospheric electron density.</figcaption>
</figure>

## Related Publications

[J4](/research/#J4), [J5](/research/#J5), [J6](/research/#J6), [J11](/research/#J11)
