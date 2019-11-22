#include <iostream>
#include <fstream>
#include <string>
#include <curl/curl.h>
#include <nlohmann/json.hpp>
#include "sol.h"

using namespace nlohmann;

std::string readApiKey()
{
    std::ifstream fs;
    fs.open("../nasa-api-key");
    if (!fs.is_open()) {
        std::cerr << "Failure opening file. Exiting" << std::endl;
        exit(EXIT_FAILURE);
    }
    std::string key;
    fs >> key;
    return key;
}


size_t curlCallbackFuncToString(void *contents, size_t size, size_t nmemb, std::string *s)
{
    size_t newLength = size*nmemb;
    try
    {
        s->append((char*)contents, newLength);
    }
    catch(std::bad_alloc &e)
    {
        //handle memory problem
        return 0;
    }
    return newLength;
}

std::string makeRequest(std::string& httpsUrl)
{
  CURL *curl;
  CURLcode res;
  std::string s;
 
  curl_global_init(CURL_GLOBAL_DEFAULT);
 
  curl = curl_easy_init();
  if(curl) {
    curl_easy_setopt(curl, CURLOPT_URL, httpsUrl.c_str());

#define SKIP_PEER_VERIFICATION 0
#define SKIP_HOSTNAME_VERIFICATION 0
 
#ifdef SKIP_PEER_VERIFICATION
    /*
     * If you want to connect to a site who isn't using a certificate that is
     * signed by one of the certs in the CA bundle you have, you can skip the
     * verification of the server's certificate. This makes the connection
     * A LOT LESS SECURE.
     *
     * If you have a CA cert for the server stored someplace else than in the
     * default bundle, then the CURLOPT_CAPATH option might come handy for
     * you.
     */ 
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 0L);
#else
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
#endif
 
#ifdef SKIP_HOSTNAME_VERIFICATION
    /*
     * If the site you're connecting to uses a different host name that what
     * they have mentioned in their server certificate's commonName (or
     * subjectAltName) fields, libcurl will refuse to connect. You can skip
     * this check, but this will make the connection less secure.
     */ 
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYHOST, 0L);
#else
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYHOST, 1L);
#endif
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, curlCallbackFuncToString);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &s);
    //curl_easy_setopt (curl, CURLOPT_VERBOSE, 1L); // verbose output
 
    /* Perform the request, res will get the return code */ 
    res = curl_easy_perform(curl);
    /* Check for errors */ 
    if(res != CURLE_OK)
      fprintf(stderr, "curl_easy_perform() failed: %s\n",
              curl_easy_strerror(res));
 
    /* always cleanup */ 
    curl_easy_cleanup(curl);
  }
 
  curl_global_cleanup();

  return s;
}

int main (int argc, char* argv[]) 
{
    std::vector<Sol*> solVec;

    unsigned short requestCount;
    std::string apiKey = readApiKey();
    std::string httpRequestURL = "https://api.nasa.gov/insight_weather/?api_key=" + apiKey + "&feedtype=json&ver=1.0";
    std::string jsonString;

    jsonString = makeRequest(httpRequestURL);

    json JSO = json::parse(jsonString);

    auto sol = JSO["sol_keys"];
    for (int i = 0; i < sol.size(); i++) {
        Sol *tmp = new Sol();
        std::string key = sol.at(i);
        tmp->setSolKey(key);
        tmp->setTemperatureData(
            JSO[key]["AT"]["av"],
            JSO[key]["AT"]["ct"],
            JSO[key]["AT"]["mn"],
            JSO[key]["AT"]["mx"]
        );
        tmp->setWindData(
            JSO[key]["HWS"]["av"],
            JSO[key]["HWS"]["ct"],
            JSO[key]["HWS"]["mn"],
            JSO[key]["HWS"]["mx"]
        );
        tmp->setWindDirectionData(
            JSO[key]["WD"]["most_common"]["compass_degrees"],
            JSO[key]["WD"]["most_common"]["compass_point"],
            JSO[key]["WD"]["most_common"]["compass_right"],
            JSO[key]["WD"]["most_common"]["compass_up"],
            JSO[key]["WD"]["most_common"]["ct"]
        );
        tmp->setPressureData(
            JSO[key]["PRE"]["av"],
            JSO[key]["PRE"]["ct"],
            JSO[key]["PRE"]["mn"],
            JSO[key]["PRE"]["mx"]
        );
        tmp->setTimeData(
            JSO[key]["First_UTC"],
            JSO[key]["Last_UTC"],
            JSO[key]["Season"]
        );

        std::cout << std::endl;
        tmp->print(i+1);
        solVec.push_back(tmp);
    }

    return 0;
}