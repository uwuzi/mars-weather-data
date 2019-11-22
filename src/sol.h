#ifndef SOL_H
#define SOL_H

class Sol {
private:
    std::string m_Key;

    // Atmospheric Temp
    double m_AvgTemp;
    unsigned int m_NumSamplesTemp;
    double m_MinTemp;
    double m_MaxTemp;

    // Horizontal Wind
    double m_AvgWind;
    unsigned int m_NumSamplesWind;
    double m_MinWind;
    double m_MaxWind;

    // Atmospheric Pressure
    double m_AvgPressure;
    unsigned int m_NumSamplesPressure;
    double m_MinPressure;
    double m_MaxPressure;

    // Wind Direction
    double m_Degrees;
    std::string m_Point;
    double m_DirectionX;
    double m_DirectionY;
    double m_NumSamplesWindDirection;

    // Time of first data collection
    std::string m_FirstData;

    // Time of last data collection
    std::string m_LastData;

    // Season
    std::string m_Season;

public:
    //Sol();
    //~Sol();
    void setSolKey(std::string key) {
        this->m_Key = key;
    }
    void setTemperatureData(double av, unsigned int ct, double mn, double mx) {
        this->m_AvgTemp = av;
        this->m_NumSamplesTemp = ct;
        this->m_MinTemp = mn;
        this->m_MaxTemp = mx;
    }
    void setWindData(double av, unsigned int ct, double mn, double mx) {
        this->m_AvgWind = av;
        this->m_NumSamplesWind = ct;
        this->m_MinWind = mn;
        this->m_MaxWind = mx;
    }
    void setWindDirectionData(double compass_degrees, std::string compass_point, double compass_right, double compass_up, double ct) {
        this->m_Degrees = compass_degrees;
        this->m_Point = compass_point;
        this->m_DirectionX = compass_right;
        this->m_DirectionY = compass_up;
        this->m_NumSamplesWindDirection = ct;
    }
    void setPressureData(double av, unsigned int ct, double mn, double mx) {
        this->m_AvgPressure = av;
        this->m_NumSamplesPressure = ct;
        this->m_MinPressure = mn;
        this->m_MaxPressure = mx;
    }

    void setTimeData(std::string first, std::string last, std::string season) {
        this->m_FirstData = first;
        this->m_LastData = first;
        this->m_Season = season;
    }

    std::string key() {
        std::string t = m_Key;
        return t;
    }

    void print(int sensorNum) {
        std::cout << "\n=========================\n";
        std::cout << "\tSENSOR #" << sensorNum;
        std::cout << "\n=========================\n";

        std::cout << "Avg. Temp:\t" << this->m_AvgTemp << " F" << std::endl;
        std::cout << "Min. Temp:\t" << this->m_MinTemp << " F" << std::endl;
        std::cout << "Max. Temp:\t" << this->m_MaxTemp << " F" << std::endl;
        std::cout << "Num Samples:\t" << this->m_NumSamplesTemp << std::endl;

        std::cout << std::endl;

        std::cout << "Avg. Wind:\t" << this->m_AvgWind << " m/s" << std::endl;
        std::cout << "Min. Wind:\t" << this->m_MinWind << " m/s" << std::endl;
        std::cout << "Max. Wind:\t" << this->m_MaxWind << " m/s" << std::endl;
        std::cout << "Num Samples:\t" << this->m_NumSamplesWind << std::endl;

        std::cout << std::endl;

        std::cout << "Wind Degrees:\t" << this->m_Degrees << std::endl;
        std::cout << "Wind Direction:\t" << this->m_Point << std::endl;
        std::cout << "Wind X Component (unit):\t" << this->m_DirectionX << std::endl;
        std::cout << "Wind Y Component (unit):\t" << this->m_DirectionY << std::endl;
        std::cout << "Num Samples:\t" << this->m_NumSamplesWindDirection << std::endl;

        std::cout << std::endl;

        std::cout << "Avg. Pressure:\t" << this->m_AvgPressure << " Pa" << std::endl;
        std::cout << "Min. Pressure:\t" << this->m_MinPressure << " Pa" << std::endl;
        std::cout << "Max. Pressure:\t" << this->m_MaxPressure << " Pa" << std::endl;
        std::cout << "Num Samples:\t" << this->m_NumSamplesPressure<< std::endl;

        std::cout << std::endl;

        std::cout << "First data collected:\t" << this->m_FirstData << std::endl;
        std::cout << "Last data collected:\t" << this->m_LastData << std::endl;
        std::cout << "Season:\t" << this->m_Season << std::endl;
    }
};

#endif