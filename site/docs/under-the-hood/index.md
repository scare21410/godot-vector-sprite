---
slug: /under-the-hood
sidebar_position: 1
---
# Under the hood

Drawing a vector graphics on modern computers is a complex process.
The Godot Engine uses the OpenGL / Vulcan API to render graphics on the screen.
There is no easy transition from a vector graphic to OpenGL / Vulcan.

We could convert the vector graphic to a raster graphic and then render it on the screen.
But when we scale the raster graphic, we lose quality. Pixelated artefacts appear to haunt
you in your dreams.

The Godot Vector Sprite plugin takes a different approach. It converts the vector graphic
into polygons that can be rendered by your GPU. Paired with special shaders, the plugin
can render the vector graphic on the screen without losing quality.

This document will take you step by the challenges we need to overcome to render a vector
graphic on the screen.

## Step 1: Drawing curves
