#!/bin/bash
source "$(dirname "$0")/env_vars.sh"

BACKUP_PATH="./backups"
BACKUP_FILE="${BACKUP_PATH}/backup_$(date +%Y%m%d%H%M%S).sql"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"

BACKUP_PATH="${SCRIPT_DIR}/backups"
BACKUP_FILE="${BACKUP_PATH}/backup_$(date +%Y%m%d%H%M%S).sql"

START_TIME=$(date +%s)

mkdir -p ${BACKUP_PATH}

docker exec -e PGPASSWORD="${DB_PASSWORD}" -t ${CONTAINER_NAME} pg_dump -U ${DB_USER} -d ${DB_NAME} -F c -f /tmp/backup.sql

docker cp ${CONTAINER_NAME}:/tmp/backup.sql ${BACKUP_FILE}

if [ $? -eq 0 ]; then
  echo "Backup successfully created: ${BACKUP_FILE}"
  docker exec -t ${CONTAINER_NAME} rm /tmp/backup.sql
else
  echo "Error creating backup."
fi

END_TIME=$(date +%s)
ELAPSED_TIME=$(($END_TIME - $START_TIME))

echo "Backup completed in $ELAPSED_TIME seconds."
