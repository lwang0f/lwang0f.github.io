---
layout: single
title: "Target parameter estimation"
permalink: /research/radar-signal-processing/
author_profile: true
---

## Overview

Target parameter estimation concerns the recovery of target position, velocity, and other motion parameters from radar echoes. The central problem is to determine how accurately these quantities can be inferred when illuminators and receivers are limited, signals overlap, and noise, clutter, or model mismatch are present.

Passive radar uses existing communication or broadcast transmitters as illuminators rather than transmitting its own signal. Coherent processing, illuminator selection, and receiver deployment therefore determine the information available for estimation. Multiple transmitters and receivers provide additional geometric diversity, but also introduce coupling among sensing configuration, signal association, and computational cost.

Real radar echoes can contain overlapping signals, clutter, noise, multiple targets, and model mismatch. These effects make estimation sensitive to both sensing geometry and computational constraints. Maximum-likelihood estimators and accuracy bounds, including the Cramer-Rao and Ziv-Zakai bounds, provide a framework for quantifying attainable performance and guiding algorithm design.

For cooperative radar-communications, the key design question is how transmitter selection and receiver placement can preserve estimation quality under complexity and deployment constraints. Lower-complexity joint-design methods connect estimator performance, sensing geometry, and resource allocation.

## Related Publications

[J1](/research/#J1), [J2](/research/#J2), [J3](/research/#J3), [C1](/research/#C1), [C2](/research/#C2), [C3](/research/#C3)
