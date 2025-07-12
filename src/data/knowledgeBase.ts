
import { KnowledgeBase } from '../types/aiEngine';

export const knowledgeBase: KnowledgeBase = {
  missions: {
    'INSAT': {
      description: 'Indian National Satellite System for meteorological and communication services',
      products: ['Weather Data', 'Cloud Imagery', 'Temperature Profiles', 'Precipitation Data'],
      resolution: '1km - 4km',
      coverage: 'Indian subcontinent and surrounding regions',
      sensors: ['VHRR', 'CCD', 'Data Relay Transponder'],
      launch_years: ['1988', '1992', '1995', '1999', '2003', '2013'],
      applications: ['Weather Forecasting', 'Disaster Management', 'Agriculture', 'Communications']
    },
    'RESOURCESAT': {
      description: 'Earth observation satellite for natural resource monitoring',
      products: ['Land Cover Maps', 'Vegetation Index', 'Agricultural Monitoring', 'Forest Assessment'],
      resolution: '5.8m - 188m',
      coverage: 'Global coverage with focus on India',
      sensors: ['LISS-III', 'LISS-IV', 'AWiFS'],
      launch_years: ['2003', '2011', '2016'],
      applications: ['Agriculture', 'Forestry', 'Water Resources', 'Urban Planning']
    },
    'CARTOSAT': {
      description: 'High-resolution Earth imaging for cartographic applications',
      products: ['Stereo Imagery', 'Digital Elevation Models', 'Ortho-rectified Images', 'Topographic Maps'],
      resolution: '0.25m - 2.5m',
      coverage: 'On-demand imaging capability',
      sensors: ['PAN', 'MX'],
      launch_years: ['2005', '2007', '2016', '2017', '2018'],
      applications: ['Mapping', 'Urban Planning', 'Infrastructure', 'Defense']
    },
    'OCEANSAT': {
      description: 'Ocean monitoring and atmospheric studies',
      products: ['Sea Surface Temperature', 'Ocean Color', 'Wind Speed', 'Wave Height'],
      resolution: '360m - 8km',
      coverage: 'Global ocean coverage',
      sensors: ['OCM', 'SCAT', 'ROSA'],
      launch_years: ['1999', '2009', '2016'],
      applications: ['Ocean Studies', 'Fisheries', 'Climate Research', 'Weather Prediction']
    }
  },
  locations: {
    'Mumbai': { lat: 19.0760, lon: 72.8777, region: 'Western India', coverage: 'Urban coastal area' },
    'Delhi': { lat: 28.7041, lon: 77.1025, region: 'Northern India', coverage: 'National Capital Region' },
    'Chennai': { lat: 13.0827, lon: 80.2707, region: 'Southern India', coverage: 'Coastal metropolitan' },
    'Kolkata': { lat: 22.5726, lon: 88.3639, region: 'Eastern India', coverage: 'River delta region' },
    'Bangalore': { lat: 12.9716, lon: 77.5946, region: 'Southern India', coverage: 'Deccan plateau' }
  },
  dataFormats: {
    'GeoTIFF': { description: 'Georeferenced TIFF format', use_case: 'Spatial imagery', size: 'Variable' },
    'HDF5': { description: 'Hierarchical Data Format', use_case: 'Scientific datasets', size: 'Large files' },
    'NetCDF': { description: 'Network Common Data Form', use_case: 'Climate data', size: 'Time series' },
    'KML': { description: 'Keyhole Markup Language', use_case: 'Visualization', size: 'Small files' }
  }
};
