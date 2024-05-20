#!/bin/bash

source "$(dirname "$0")/env_vars.sh"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"

BACKUP_FILE="$1"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 path/to/backup_file"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Backup file not found: $BACKUP_FILE"
  exit 1
fi

START_TIME=$(date +%s)

docker cp "$BACKUP_FILE" ${CONTAINER_NAME}:/tmp/restore.sql

docker exec -e PGPASSWORD="${DB_PASSWORD}" -t ${CONTAINER_NAME} pg_restore -U ${DB_USER} -d ${DB_NAME} -F c /tmp/restore.sql

if [ $? -eq 0 ]; then
  echo "Restore successfully completed."
  docker exec -t ${CONTAINER_NAME} rm -f /tmp/restore.sql
else
  echo "Error during restore."
fi

END_TIME=$(date +%s)
ELAPSED_TIME=$(($END_TIME - $START_TIME))

echo "Restore completed in $ELAPSED_TIME seconds."
