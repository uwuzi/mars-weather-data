#!/bin/bash

# Backup old json, replace with new json
backupName="data$(date +%Y-%m-%d-%H:%M:%S).json"

cd /data/uwuzi.com/src
/data/uwuzi.com/src/updatejson > /data/uwuzi.com/src/new.json
printf "New JSON generated\n\n"

cp -v /data/uwuzi.com/data/data.json /data/uwuzi.com/backup/"$backupName"
printf "Backup of old JSON stored at /data/uwuzi.com/backup/$backupName\n\n"

mv -v /data/uwuzi.com/src/new.json /data/uwuzi.com/data/data.json
printf "New JSON moved into data directory\n\n"

# Log the event
echo "$(date +%Y-%m-%d-%H:%M:%S) -- $backupName" >> /var/log/nginx/uwuzi-backup.log
printf "Log written to /var/log/nginx/uwuzi-backup.log\n\n"
