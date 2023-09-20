export interface Country {
  country: string
  code: string
  coords: number[]
}

export interface GlobeModelProps {
  countryData: GeoJSONFeature[] | null
  centerCoordinates: number[] | null
  selectedCountry: string
}

export interface GlobeProps {
  selectedCountry: string
}

export interface GeoJSONResponse {
  features: Array<{
    properties: {
      ISO_A2: string
    }
  }>
}

export interface GeoJSONFeature {
  type: string
  properties: {
    ISO_A2: string
    [key: string]: any
  }
  geometry?: {
    type: string
    coordinates: number[][][]
  }
}
