---
layout: single
title: "Atmospheric wind-field sensing"
permalink: /research/middle-upper-atmosphere/
author_profile: true
---

## Overview

The middle and upper atmosphere, spanning the stratosphere, mesosphere, and lower thermosphere, is a dynamically coupled transition region between weather near the surface and near-Earth space. As density decreases with altitude, planetary waves and gravity waves grow in amplitude and eventually deposit energy and momentum when they dissipate. This wave-driven forcing shapes the polar vortex, controls the circulation and thermal structure of the mesosphere, and can transmit lower-atmosphere disturbances into the thermosphere and ionosphere. Resolving these processes is therefore important for understanding stratosphere--troposphere coupling, subseasonal weather variability, and the atmospheric disturbances that affect radio propagation and space-weather conditions.

The scientific difficulty is a persistent observational gap. The region around 50--120 km is too high for routine balloon soundings, too low for most satellite observations to resolve directly, and only briefly sampled by sounding rockets. Ground-based remote sensors provide valuable long-term records, but their coverage is sparse and their measurements can be one-dimensional, indirect, or sensitive to noise and interference. Better knowledge of the dynamics requires two complementary routes: developing new instruments and observing techniques to expand coverage, and improving existing instruments so that they operate more robustly and retrieve higher-quality atmospheric parameters. This research focuses on the second route, using improved signal processing, calibration, and estimation methods to extract more reliable wind information from existing MF- and meteor-radar observations.

<figure class="research-figure research-figure--polar-vortex">
  <img src="/images/stratospheric-polar-vortex.gif" alt="Daily evolution of stratospheric potential vorticity in the polar vortex during February 2025" loading="lazy">
  <figcaption>Daily evolution of stratospheric potential vorticity during February 2025. Potential vorticity summarizes the rotational state of an air parcel; the dark blue region marks cold, isolated polar-vortex air, which stretches toward North America as the vortex evolves. The animation illustrates why continuous observations are needed to follow wave-driven transport and its links to lower-atmosphere weather. Source: <a href="https://www.climate.gov/media/16808">NOAA Climate.gov, Potential Vorticity in February 2025</a>, based on ERA5 reanalysis data. Credit: NOAA Climate.gov animation by Breanna Zavadoff.</figcaption>
</figure>

Medium-frequency (MF) radar measures atmospheric echoes, while meteor radar uses scattering from short-lived meteor trails. For MF radar, full-correlation analysis compares signals received by multiple antennas at different time delays to estimate horizontal wind speed and direction. Meteor-radar echoes provide complementary observations of atmospheric motion at higher altitudes and different temporal scales.

The echoes can be weak and are easily affected by environmental interference, system noise, hardware instability, and short-lived distortions. These effects can change the shape of correlation curves and lead to unstable or inaccurate wind estimates. The central retrieval problem is to remove unwanted effects without suppressing genuine atmospheric variability.

Signal-processing methods address this problem through median filtering, antenna-contribution analysis, denoising, and wind retrieval. These methods improve the stability of delay-correlation parameters and reduce short-term discontinuities when the useful signal is weak. Comparisons with observed wind distributions, geomagnetic conditions, and seasonal variability also expose the limits of idealized signal and error models, providing concrete cases for improving estimator robustness and uncertainty analysis.

## Related Publications

[J7](/research/#J7), [J8](/research/#J8), [J9](/research/#J9), [J10](/research/#J10)
