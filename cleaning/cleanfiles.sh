# Remove files older than a week
find ../public/uploads/* -mtime +0 -type f -delete
