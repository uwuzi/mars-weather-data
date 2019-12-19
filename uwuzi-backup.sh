#!/bin/bash

connection="$(ping -q -w 1 -c 1 www.uwuzi.com > /dev/null && echo ok || echo error)"
location=~/Programming/"data-$(date --iso-8601).json";

if [ -f "$location" ]; then
    notify-send "FILE EXISTS" uwuzi-backup;
elif [ $connection = "ok" ]; then
	curl http://www.uwuzi.com/data/data.json > "$location";
    notify-send SUCCESS uwuzi-backup;
	firefox -new-window "$location";
else
    notify-send FAILURE uwuzi-backup;
fi

