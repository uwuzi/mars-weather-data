## Mars Weather Tracking  
Website: [www.uwuzi.com](http://www.uwuzi.com)  
JSON data: [data.uwuzi.com](http://data.uwuzi.com)  

This project obtains Mars weather data from Nasa's Insight Mission API, records it, and plots it on my website.  

The data provided by NASA is limited to the past week. However, I wanted to record the history of the weather data, so a few times per day I append the old data with the updated data. I started on December 16th, 2019, and hope to continue as long as they continue to provided the data!  

I wrote a C++ program that uses libcurl and nlohmann's JSON library to make an http request for the JSON data, read the data that is currently stored on my site, and append it with any changes.  
My updated data is then plotted with the Plotly Javascript library.  

I make the http requests and parse from C++ because it is much faster and also avoids the unnecessary requests that would occur any time you refresh the page (if it were done in JS). It also has allowed me to completely automate the backing up and updating of the data with cron jobs on my server. 