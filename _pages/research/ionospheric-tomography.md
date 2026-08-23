---
layout: single
title: "Ionospheric Tomography"
permalink: /research/ionospheric-tomography/
author_profile: true
---

## Overview

The ionosphere is the electrically charged part of the upper atmosphere, and its electron density controls the propagation of radio signals used for communication, navigation, and remote sensing. Ionospheric tomography addresses the inverse problem of reconstructing a three-dimensional electron-density field from path-integrated and remotely sensed observations, with direct relevance to ionospheric science, navigation, and radio communication.

Ground GPS/GNSS receivers measure total electron content (TEC), the number of free electrons integrated along each satellite-to-ground ray. Spaceborne PolSAR/PALSAR provides complementary information over wide areas, including regions where ground measurements are sparse. Geomagnetic-field and empirical ionospheric models provide background constraints for the reconstruction.

<figure class="research-figure">
  <img src="/images/ionosphere-observation-geometry.png" alt="Observation geometry of the ionosphere with GNSS, ionosonde, ISR, and SAR or PolSAR paths" loading="lazy">
  <figcaption>Observation paths for ionospheric tomography. Different instruments measure effects accumulated along propagation paths through the ionosphere.</figcaption>
</figure>

Reconstructing the three-dimensional map from these indirect measurements is difficult because the available rays are sparse, unevenly distributed, and often insufficient to resolve small structures. Satellite and ground data have different resolutions and errors, and an inaccurate initial model can bias the result. The challenge is to combine the measurements and models without creating artificial features, especially in data-sparse regions and during small-scale anomalies.

Reconstruction methods therefore combine measurements with different resolutions, error characteristics, and sampling geometries without introducing artificial structures. Regularization, model-based constraints, and multisource data fusion determine the balance between fitting observations and preserving physically plausible structure. GPS/GNSS TEC, PolSAR/PALSAR observations, geomagnetic models, and empirical models such as E-CHAIM can add missing constraints and improve the electron-density field, particularly in data-sparse regions and during localized anomalies. Independent observations and sensitivity to the chosen prior provide essential tests of resolution, bias, and theoretical validity.

<figure class="research-figure">
  <img src="/images/ionospheric-tomography-reconstruction.png" alt="Three-dimensional reconstruction of ionospheric electron density across latitude, longitude, and altitude" loading="lazy">
  <figcaption>Example three-dimensional reconstruction of ionospheric electron density.</figcaption>
</figure>

## Related Publications

[J4](/research/#J4), [J5](/research/#J5), [J6](/research/#J6), [J11](/research/#J11)
