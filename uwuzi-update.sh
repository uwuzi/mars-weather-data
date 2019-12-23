#!/bin/bash
baseLocation="/path/to/base"
backupLocation="/path/to/backup/directory"
logLocation="/path/to/log"

# Backup old json, replace with new json
backupName="data$(date +%Y-%m-%d-%H:%M:%S).json"

cd "$baseLocation"
$baseLocation/updatejson > $baseLocation/new.json
printf "New JSON generated\n\n"

cp -v $backupLocation/data.json $backupLocation/"$backupName"
printf "Backup of old JSON stored at $backupLocation/$backupName\n\n"

mv -v $baseLocation/new.json $backupLocation/data.json
printf "New JSON moved into data directory\n\n"

# Log the event
echo "$(date +%Y-%m-%d-%H:%M:%S) -- $backupName" >> $logLocation/uwuzi-backup.log
printf "Log written to $logLocation/uwuzi-backup.log\n\n"
