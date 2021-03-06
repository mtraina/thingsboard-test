#!/bin/sh

# Set ThingsBoard host to "demo.thingsboard.io" or "localhost"
# export THINGSBOARD_HOST=demo.thingsboard.io
export THINGSBOARD_HOST=localhost

# Replace YOUR_ACCESS_TOKEN with one from Device credentials window.
# export ACCESS_TOKEN=$( cat access-token )
export ACCESS_TOKEN=$( cat access-token.local )

# Read serial number and firmware version attributes
ATTRIBUTES=$( cat attributes-data.json )
export ATTRIBUTES

# Read timeseries data as an object without timestamp (server-side timestamp will be used)
TELEMETRY=$( cat telemetry-data.json )
export TELEMETRY

# publish attributes and telemetry data via mqtt client
node publish.js
