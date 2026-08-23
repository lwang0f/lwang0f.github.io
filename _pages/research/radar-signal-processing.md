---
layout: single
title: "Estimation theory"
permalink: /research/radar-signal-processing/
author_profile: true
---

## Overview

Estimation theory provides the methodological foundation for recovering physical parameters from noisy observations. In radar and remote sensing, two questions are closely linked: what accuracy and identifiability are supported by a measurement model, and which estimator algorithm can approach that limit under practical constraints.

Performance bounds, including the Cramer-Rao, Ziv-Zakai, and Bayesian or posterior Cramer-Rao bounds, quantify the information available for estimating target position, velocity, and related parameters. Estimator algorithms, including maximum-likelihood, Bayesian, and regularized methods, determine how that information is converted into estimates when signals overlap or the model is incomplete.

In passive MIMO and cooperative radar-communications systems, illuminator selection, transmitter selection, and receiver deployment change the Fisher information and therefore the attainable accuracy. Bound-based design connects statistical theory with sensing geometry and resource allocation, while lower-complexity algorithms address the resulting mixed-integer and non-convex design problems.

Theoretical results are conditional on assumptions about propagation, noise, target dynamics, and data quality. Atmospheric wind retrieval and ionospheric tomography provide demanding test cases: systematic errors, incomplete observations, and model mismatch reveal where a bound is too optimistic or an estimator is insufficiently robust. These application-driven failures feed back into model formulation, performance analysis, and algorithm design.

## Related Publications

[J1](/research/#J1), [J3](/research/#J3), [C1](/research/#C1), [C2](/research/#C2), [C3](/research/#C3), [C4](/research/#C4)
