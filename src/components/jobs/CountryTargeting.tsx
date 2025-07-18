import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { COUNTRIES } from '@/types'
import { Globe, MapPin, Users, TrendingUp } from 'lucide-react'

interface CountryTargetingProps {
  selectedCountries: string[]
  onCountriesChange: (countries: string[]) => void
}

export function CountryTargeting({ selectedCountries, onCountriesChange }: CountryTargetingProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  const regions = {
    all: 'All Countries',
    'north-america': 'North America',
    'europe': 'Europe',
    'asia': 'Asia',
    'south-america': 'South America',
    'africa': 'Africa',
    'oceania': 'Oceania'
  }

  const countryRegions: Record<string, string[]> = {
    'north-america': ['United States', 'Canada', 'Mexico'],
    'europe': ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Sweden', 'Spain', 'Italy', 'Poland'],
    'asia': ['India', 'Singapore', 'Japan', 'Philippines', 'Pakistan', 'Bangladesh'],
    'south-america': ['Brazil', 'Argentina', 'Chile'],
    'africa': ['South Africa', 'Nigeria', 'Kenya'],
    'oceania': ['Australia']
  }

  const getFilteredCountries = () => {
    if (selectedRegion === 'all') return COUNTRIES
    return countryRegions[selectedRegion] || []
  }

  const addCountry = (country: string) => {
    if (!selectedCountries.includes(country)) {
      onCountriesChange([...selectedCountries, country])
    }
  }

  const removeCountry = (country: string) => {
    onCountriesChange(selectedCountries.filter(c => c !== country))
  }

  const addRegion = (region: string) => {
    const regionCountries = countryRegions[region] || []
    const newCountries = [...new Set([...selectedCountries, ...regionCountries])]
    onCountriesChange(newCountries)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-primary" />
          <span>Target Demographics</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Select countries to target specific talent pools and demographics
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Region Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Filter by Region</label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(regions).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quick Region Actions */}
        {selectedRegion !== 'all' && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addRegion(selectedRegion)}
              className="text-xs"
            >
              <MapPin className="h-3 w-3 mr-1" />
              Add All {regions[selectedRegion as keyof typeof regions]}
            </Button>
          </div>
        )}

        {/* Country Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Available Countries</label>
          <div className="max-h-40 overflow-y-auto border rounded-md p-2">
            <div className="grid grid-cols-1 gap-1">
              {getFilteredCountries().map((country) => (
                <Button
                  key={country}
                  variant="ghost"
                  size="sm"
                  onClick={() => addCountry(country)}
                  disabled={selectedCountries.includes(country)}
                  className="justify-start text-xs h-8"
                >
                  <MapPin className="h-3 w-3 mr-2" />
                  {country}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Countries */}
        {selectedCountries.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Selected Countries</label>
              <Badge variant="secondary" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                {selectedCountries.length} countries
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map((country) => (
                <Badge
                  key={country}
                  variant="default"
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => removeCountry(country)}
                >
                  {country}
                  <span className="ml-1 text-xs">×</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Demographics Insights */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Targeting Insights</span>
          </div>
          <div className="text-xs text-blue-700 space-y-1">
            {selectedCountries.length === 0 && (
              <p>Select countries to see demographic insights and talent availability.</p>
            )}
            {selectedCountries.length > 0 && (
              <>
                <p>• Targeting {selectedCountries.length} countries for broader talent pool</p>
                <p>• Consider time zone differences for remote collaboration</p>
                {selectedCountries.includes('United States') && (
                  <p>• US market: High competition, premium rates expected</p>
                )}
                {selectedCountries.includes('India') && (
                  <p>• India market: Large talent pool, competitive rates</p>
                )}
                {selectedCountries.includes('United Kingdom') && (
                  <p>• UK market: Strong English proficiency, EU timezone</p>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}