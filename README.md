## Mars Weather Tracking  

This project obtains Mars weather data from Nasa's Insight Mission API, records it, and plots it on my website.  

Website: [www.uwuzi.com](http://www.uwuzi.com). If the website is down, I either had a power/internet outage or tripped over the power cord.  
Latest JSON data (to the hour) at [data.uwuzi.com](http://data.uwuzi.com), or you can run:  

    $curl -L data.uwuzi.com  
    
The data provided by NASA is limited to the past week. However, I wanted to record the history of the weather data, so a few times per day I append the old data with the updated data. I started on December 9th, 2019, and hope to continue as long as their API is functional!

I wrote a C++ program that uses libcurl and [nlohmann's JSON library](https://github.com/nlohmann/json) to make an http request for the JSON data, read the data that is currently stored on my site, and append it with any changes.  
It is then plotted with the Plotly Javascript library.  

I make the http requests and parse from C++ because it is much faster and also avoids the unnecessary requests that would occur any time you refresh the page (if it were done in JS). It also has allowed me to completely automate the backing up and updating of the data on my server with cron jobs and bash scripts.
