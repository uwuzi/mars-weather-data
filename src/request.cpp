#include <iostream>
#include <fstream>
#include <string>
#include <curl/curl.h>
#include "json.hpp"
#include "sol.hpp"

using namespace nlohmann;

// Read api from ../nasa-api-key -> needed for http request url
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

// The callback function for the http response
size_t curlCallbackFuncToString(void *contents, size_t size, size_t nmemb, std::string *s)
{
    size_t newLength = size*nmemb;
    try
    {
        s->append((char*)contents, newLength);
    }
    catch(std::bad_alloc &e)
    {
        // Handle memory problem (unlikely)
        return 0;
    }
    return newLength;
}

// Return response to request in string form
std::string makeRequest(std::string httpsUrl)
{
  CURL *curl;
  CURLcode res;
  std::string s;
 
  curl_global_init(CURL_GLOBAL_DEFAULT);
 
  curl = curl_easy_init();
  if(curl) {
    curl_easy_setopt(curl, CURLOPT_URL, httpsUrl.c_str());
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 1L);
 
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYHOST, 1L);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, curlCallbackFuncToString);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &s);
 
    /* Perform the request, res will get the return code */ 
    res = curl_easy_perform(curl);
    /* Check for errors */ 
    if(res != CURLE_OK)
      fprintf(stderr, "curl_easy_perform() failed: %s\n",
              curl_easy_strerror(res));
 
    curl_easy_cleanup(curl);
  }
  curl_global_cleanup();
  return s;
}

// This was for the initial setup of the json file. No longer needed but keeping it here.
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

// Append the last key of JSON object (the newest data) at the end of the 'outFile'
void outputJsonToFile(json& JSO, std::vector<std::string>& sol, const char* outFile){
    std::ofstream outStream (outFile, std::ios::out | std::ios::app);
    if (outStream.is_open()) {
        json js = JSO[sol.back()];
        outStream << js << std::endl;
    }
    outStream.close();
}

// Read JSON from file
// Pass in a JSON object reference, give it the data from given file
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

// Concatenate dest with src (specifically the object stored at the index 'key')
int jsonCat(nlohmann::json& dest, const nlohmann::json& src, const std::string& key) {
    if (!src.is_null()){
        dest[key] = src[key];
        return 0;
    }
    return -1;
}



// Create full path with api key
std::string resolveRequestURL() {
    return "https://api.nasa.gov/insight_weather/?api_key=" + readApiKey() + "&feedtype=json&ver=1.0";
}

// Validate the JSON object (if any of the readings are NULL, do not update anything)
bool isValidData(json& JSO, std::vector<std::string>& solVec)
{
	std::string solNum = solVec.back();
	if (JSO[solNum]["AT"].is_null() || JSO[solNum]["HWS"].is_null()||
		JSO[solNum]["PRE"].is_null() || JSO[solNum]["WD"].is_null()) {
			return false;
	}
	return true;
}

// Couts a json object that is the old data appended with the newest data.
// Use a bash script to redirect into a file. Then backup the old one and replace it with the new one.
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
