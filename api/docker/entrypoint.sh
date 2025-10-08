#!/bin/sh
set -e

# Ensure PID dir exists and remove stale server PID
mkdir -p /app/tmp/pids
rm -f /app/tmp/pids/server.pid

# Exec the container command
exec "$@"
