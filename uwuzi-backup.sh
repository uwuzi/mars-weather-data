#!/bin/bash

connection="$(ping -q -w 1 -c 1 www.uwuzi.com > /dev/null && echo ok || echo error)"
location=~/Code/uwuzi-data-backup/"data$(date +%Y-%m-%d-%H:%M:%S).json";

if [ $connection = "error" ]; then
    notify-send FAILURE uwuzi-backup;
#elif [ -f "$location" ]; then
#	notify-send "FILE EXISTS" uwuzi-backup;
else
	curl http://www.uwuzi.com/data/data.json > "$location";
    notify-send SUCCESS uwuzi-backup;
	waterfox-classic -new-window "$location";
fi

