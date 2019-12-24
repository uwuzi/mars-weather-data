#include <iostream>
#include <fstream>
#include <string>
#include <curl/curl.h>
#include "json.hpp"
#include "sol.hpp"

using namespace nlohmann;

bool parseCmdArgs(int _argc, char* _argv[])
{
    return true;
}

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

std::string makeRequest(std::string httpsUrl)
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

void readDetailedWindData(json& JSO, std::vector<std::string>& sol){
    std::cout <<"\n\n";
    for (int i = 0; i < 7; i++) {
        std::string key1 = sol.at(i);
        std::cout << "\n----------------------------------" << std::endl;
        std::cout << "SOL #" << sol.at(i) << std::endl;
        for (int j = 0; j < 15; j++) {
            json js = JSO[key1]["WD"][std::to_string(j)];
            if (!js.is_null()) {
                std::cout << "compass_no: " << j << std::endl;
                std::cout << "compass_degrees: " << JSO[key1]["WD"][std::to_string(j)]["compass_degrees"] << std::endl;
                std::cout << "compass_point: " << JSO[key1]["WD"][std::to_string(j)]["compass_point"] << std::endl;
                std::cout << "compass_right: " << JSO[key1]["WD"][std::to_string(j)]["compass_right"] << std::endl;
                std::cout << "compass_up: " << JSO[key1]["WD"][std::to_string(j)]["compass_up"] << std::endl;
                std::cout << "\n\n";
            }
        }
    }
}

void outputInitialJsonToFile(json& JSO, std::vector<std::string>& sol, const char* outFile){
    std::ofstream outStream (outFile, std::ios::out | std::ios::app);
	if (outStream.is_open()) {
    	for (int i = 0; i < sol.size(); i++) {
            json js = JSO[sol.at(i)];
            outStream << js << std::endl;
        }
    }
    outStream.close();
}

void outputJsonToFile(json& JSO, std::vector<std::string>& sol, const char* outFile){
    std::ofstream outStream (outFile, std::ios::out | std::ios::app);
    if (outStream.is_open()) {
        json js = JSO[sol.back()];
        outStream << js << std::endl;
    }
    outStream.close();
}

int jsonRead(nlohmann::json& JSO, const char* fileName) {
    std::ifstream inStream(fileName, std::ios::in | std::ios::ate);
    if (inStream.is_open()) {
        std::ifstream::pos_type fileSize = inStream.tellg();
        inStream.seekg(0, std::ios::beg);
        std::vector<char> bytes(fileSize);
        inStream.read(bytes.data(), fileSize);
        inStream.close();
        JSO = json::parse(std::string(bytes.data(), fileSize));
        return 0;
    }
    return -1;
}

int jsonCat(nlohmann::json& dest, const nlohmann::json& src, const std::string& key) {
    if (!src.is_null()){
        dest[key] = src[key];
        return 0;
    }
    return -1;
}



std::string resolveRequestURL() {
    return "https://api.nasa.gov/insight_weather/?api_key=" + readApiKey() + "&feedtype=json&ver=1.0";
}

bool isValidData(json& JSO, std::vector<std::string>& solVec)
{
	std::string solNum = solVec.back();
	if (JSO[solNum]["AT"].is_null() || JSO[solNum]["HWS"].is_null()||
		JSO[solNum]["PRE"].is_null() || JSO[solNum]["WD"].is_null()) {
			return false;
	}
	return true;
}

nlohmann::json updateJson(const char* oldJsonFile, nlohmann::json& requestJSO, std::vector<std::string>& sol) {

    nlohmann::json readJSO;
    jsonRead(readJSO, oldJsonFile);

	if (isValidData(requestJSO, sol)) {
    	json newJson;
    	newJson[sol.back()] = requestJSO[sol.back()];
    	jsonCat(readJSO,newJson,sol.back());
	}

    return readJSO;
}

int main (int argc, char* argv[]) 
{
    const char* jsonFilePath = "../data/data.json";
    json requestJSO = json::parse(makeRequest(resolveRequestURL()));
    std::vector<std::string> sol = requestJSO["sol_keys"];
    std::cout << updateJson(jsonFilePath, requestJSO, sol);
    return 0;
}
