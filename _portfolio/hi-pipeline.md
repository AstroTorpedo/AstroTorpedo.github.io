---
layout: personal
nav: projects
prose: true
backgrounds: [crescent]
title: "HI-pipeline: FAST neutral hydrogen observations"
excerpt: "Developing a reproducible processing workflow for FAST drift-scan observations of extragalactic neutral hydrogen."
collection: portfolio
permalink: /portfolio/hi-pipeline/
author_profile: true
share: false
---

The goal of HI-pipeline is to process FAST neutral hydrogen observations of dwarf galaxies and support investigations of black hole feedback.

The planned workflow includes:

- Reading multi-beam, multi-channel drift-scan data and preserving observational metadata.
- Identifying invalid samples and radio frequency interference.
- Modelling and subtracting spectral baselines.
- Preserving the relationship between spectra and sky coordinates.
- Preparing outputs compatible with HiFAST intermediates and downstream source finding with SoFiA.

The project prioritises non-destructive processing, traceable outputs, and reproducibility.

[View all projects]({{ '/projects/' | relative_url }})
