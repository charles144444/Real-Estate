import { useParams } from 'react-router-dom';

// Add new properties with full details
const properties = [
  {
    id: '1',
    title: "Ocean Breeze Villa",
    price: 910000,
    location: "Malibu, CA",
    type: "Villa",
    beds: 4,
    baths: 3,
    sqft: 3200,
    image: "bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]",
    description: "A luxurious villa with stunning ocean views, private pool, and modern amenities. Perfect for relaxing and entertaining.",
    amenities: ['Private Pool', 'Ocean View', 'Smart Home', 'Outdoor Kitchen'],
    yearBuilt: 2016,
    parking: '2-car garage',
    contact: 'malibuagent@email.com',
    lotSize: '0.5 acres',
    hoaFees: '$0',
    flooring: 'Marble, Hardwood',
    appliances: ['Refrigerator', 'Dishwasher', 'Oven', 'Wine Cooler'],
    heatingCooling: 'Central Air, Zoned',
    schoolDistrict: 'Malibu Unified',
    propertyTax: '$11,000/year',
    energyRating: 'A',
    walkScore: 70,
    lastRenovated: 2020,
    internet: 'Fiber, 1Gbps',
    securitySystem: 'Yes',
    petPolicy: 'Allowed',
    furnished: 'Yes',
    publicTransport: 'Bus stop 0.4mi',
  },
  {
    id: '2',
    title: "Jakson House",
    price: 750000,
    location: "Austin, TX",
    type: "House",
    beds: 3,
    baths: 2,
    sqft: 2400,
    image: "bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]",
    description: "A modern family house in a quiet Austin neighborhood, featuring a spacious backyard and updated kitchen.",
    amenities: ['Backyard', 'Fireplace', 'Garage', 'Smart Thermostat'],
    yearBuilt: 2012,
    parking: '2-car garage',
    contact: 'austinagent@email.com',
    lotSize: '0.3 acres',
    hoaFees: '$50/month',
    flooring: 'Hardwood, Tile',
    appliances: ['Refrigerator', 'Dishwasher', 'Oven', 'Microwave'],
    heatingCooling: 'Central Air, Forced Air',
    schoolDistrict: 'Austin ISD',
    propertyTax: '$8,200/year',
    energyRating: 'B+',
    walkScore: 65,
    lastRenovated: 2018,
    internet: 'Cable, 500Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'No',
    publicTransport: 'Bus stop 0.3mi',
  },
  {
    id: '3',
    title: "Lakeside Cottage",
    price: 540000,
    location: "Lake Tahoe, CA",
    type: "Cottage",
    beds: 2,
    baths: 1,
    sqft: 1800,
    image: "bg-[url('https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]",
    description: "A cozy lakeside cottage with direct lake access, private dock, and beautiful mountain views.",
    amenities: ['Lake Access', 'Private Dock', 'Fire Pit', 'Deck'],
    yearBuilt: 2005,
    parking: 'Driveway',
    contact: 'tahoeagent@email.com',
    lotSize: '0.4 acres',
    hoaFees: '$0',
    flooring: 'Wood, Carpet',
    appliances: ['Refrigerator', 'Oven'],
    heatingCooling: 'Fireplace, Electric',
    schoolDistrict: 'Tahoe Unified',
    propertyTax: '$5,600/year',
    energyRating: 'B',
    walkScore: 40,
    lastRenovated: 2015,
    internet: 'DSL, 50Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'Partial',
    publicTransport: 'None',
  },
  {
    id: '4',
    title: 'Modern Family Home',
    location: '123 Main St, Springfield',
    price: 450000,
    type: 'House',
    beds: 4,
    baths: 3,
    sqft: 2500,
    image: 'bg-[url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")]',
    description: 'A beautiful modern family home with spacious rooms and a large backyard.',
    amenities: ['Garage', 'Backyard', 'Fireplace', 'Central Air'],
    yearBuilt: 2015,
    parking: '2-car garage',
    contact: 'realtor1@email.com',
    lotSize: '0.35 acres',
    hoaFees: '$0',
    flooring: 'Hardwood, Tile',
    appliances: ['Refrigerator', 'Dishwasher', 'Oven', 'Microwave'],
    heatingCooling: 'Central Air, Forced Air',
    schoolDistrict: 'Springfield Unified',
    propertyTax: '$5,200/year',
    energyRating: 'A+',
    walkScore: 72,
    lastRenovated: 2021,
    internet: 'Fiber, 1Gbps',
    securitySystem: 'Yes',
    petPolicy: 'Allowed',
    furnished: 'No',
    publicTransport: 'Bus stop 0.2mi',
  },
  {
    id: '5',
    title: 'Downtown Apartment',
    location: '456 Elm St, Metropolis',
    price: 320000,
    type: 'Apartment',
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: 'bg-[url("https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
    description: 'A stylish downtown apartment close to shopping, dining, and entertainment. Features modern finishes and city views.',
    amenities: ['Gym', 'Rooftop Access', 'Concierge', 'Pet Friendly'],
    yearBuilt: 2020,
    parking: 'Underground parking',
    contact: 'agent2@email.com',
    lotSize: 'N/A',
    hoaFees: '$350/month',
    flooring: 'Laminate, Tile',
    appliances: ['Refrigerator', 'Dishwasher', 'Washer/Dryer'],
    heatingCooling: 'Central Air',
    schoolDistrict: 'Metropolis District 5',
    propertyTax: '$3,800/year',
    energyRating: 'B',
    walkScore: 94,
    lastRenovated: 2020,
    internet: 'Cable, 500Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed with restrictions',
    furnished: 'Yes',
    publicTransport: 'Metro station 0.1mi',
  },
  {
    id: '6',
    title: 'Cozy Country Cottage',
    location: '789 Oak Lane, Smallville',
    price: 275000,
    type: 'Cottage',
    beds: 3,
    baths: 2,
    sqft: 1600,
    image: 'bg-[url("https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y290dGFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60")]',
    description: 'A charming cottage in the countryside with a large garden and peaceful surroundings. Perfect for a quiet retreat.',
    amenities: ['Large Garden', 'Wood Stove', 'Workshop', 'Porch'],
    yearBuilt: 1998,
    parking: 'Driveway',
    contact: 'owner3@email.com',
    lotSize: '0.5 acres',
    hoaFees: '$0',
    flooring: 'Wood, Carpet',
    appliances: ['Refrigerator', 'Oven', 'Washer'],
    heatingCooling: 'Wood Stove, Electric',
    schoolDistrict: 'Smallville Schools',
    propertyTax: '$2,900/year',
    energyRating: 'B-',
    walkScore: 55,
    lastRenovated: 2010,
    internet: 'DSL, 50Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'Partial',
    publicTransport: 'None',
  },
  {
    id: '7',
    title: 'Luxury Villa',
    location: '321 Palm Drive, Beverly Hills',
    price: 2500000,
    type: 'Villa',
    beds: 6,
    baths: 7,
    sqft: 7000,
    image: 'bg-[url("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")]',
    description: 'A stunning luxury villa with a pool, home theater, and breathtaking views.',
    amenities: ['Pool', 'Home Theater', 'Wine Cellar', 'Smart Home'],
    yearBuilt: 2018,
    parking: '4-car garage',
    contact: 'luxuryagent@email.com',
    lotSize: '1.2 acres',
    hoaFees: '$1,200/year',
    flooring: 'Marble, Hardwood',
    appliances: ['Refrigerator', 'Wine Cooler', 'Dishwasher', 'Double Oven'],
    heatingCooling: 'Central Air, Zoned',
    schoolDistrict: 'Beverly Hills Unified',
    propertyTax: '$22,000/year',
    energyRating: 'A',
    walkScore: 80,
    lastRenovated: 2019,
    internet: 'Fiber, 2Gbps',
    securitySystem: 'Yes (Smart)',
    petPolicy: 'Allowed',
    furnished: 'Yes',
    publicTransport: 'Bus stop 0.3mi',
  },
  {
    id: '8',
    title: 'Urban Loft',
    location: '101 City Center, Downtown',
    price: 600000,
    type: 'Loft',
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: 'bg-[url("https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXJiYW4lMjBsb2Z0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
    description: 'A trendy urban loft with open floor plan and city skyline views.',
    amenities: ['Open Floor Plan', 'City View', 'Gym Access', 'Pet Friendly'],
    yearBuilt: 2017,
    parking: '1 reserved spot',
    contact: 'urbanlofts@email.com',
    lotSize: 'N/A',
    hoaFees: '$500/month',
    flooring: 'Concrete, Hardwood',
    appliances: ['Refrigerator', 'Dishwasher', 'Microwave'],
    heatingCooling: 'Central Air',
    schoolDistrict: 'Downtown City Schools',
    propertyTax: '$7,100/year',
    energyRating: 'B+',
    walkScore: 98,
    lastRenovated: 2017,
    internet: 'Fiber, 1Gbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'No',
    publicTransport: 'Metro station 0.2mi',
  },
  {
    id: '9',
    title: 'Suburban Townhouse',
    location: '55 Maple Ave, Suburbia',
    price: 350000,
    type: 'Townhouse',
    beds: 3,
    baths: 2,
    sqft: 2000,
    image: 'bg-[url("https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG93bmhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
    description: 'A comfortable townhouse in a quiet neighborhood, close to schools and parks.',
    amenities: ['Garage', 'Community Pool', 'Playground', 'Backyard'],
    yearBuilt: 2012,
    parking: '2-car garage',
    contact: 'townhouseagent@email.com',
    lotSize: '0.12 acres',
    hoaFees: '$150/month',
    flooring: 'Carpet, Tile',
    appliances: ['Refrigerator', 'Oven', 'Dishwasher'],
    heatingCooling: 'Central Air',
    schoolDistrict: 'Suburbia School District',
    propertyTax: '$4,200/year',
    energyRating: 'B',
    walkScore: 68,
    lastRenovated: 2015,
    internet: 'Cable, 200Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'No',
    publicTransport: 'Bus stop 0.5mi',
  },
  {
    id: '10',
    title: 'Lakeview Cabin',
    location: '12 Lake Rd, Lakeview',
    price: 420000,
    type: 'Cabin',
    beds: 4,
    baths: 3,
    sqft: 2300,
    image: 'bg-[url("https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMGNhYmlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
    description: 'A rustic cabin with beautiful lake views and private dock.',
    amenities: ['Lake Access', 'Fireplace', 'Deck', 'Private Dock'],
    yearBuilt: 2005,
    parking: 'Driveway',
    contact: 'lakecabins@email.com',
    lotSize: '0.8 acres',
    hoaFees: '$0',
    flooring: 'Wood',
    appliances: ['Refrigerator', 'Oven'],
    heatingCooling: 'Fireplace, Electric',
    schoolDistrict: 'Lakeview District',
    propertyTax: '$3,700/year',
    energyRating: 'C+',
    walkScore: 40,
    lastRenovated: 2012,
    internet: 'Satellite, 25Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'Partial',
    publicTransport: 'None',
  },
  {
    id: '11',
    title: 'Penthouse Suite',
    location: '999 Skyline Blvd, Metropolis',
    price: 1200000,
    type: 'Penthouse',
    beds: 3,
    baths: 4,
    sqft: 3500,
    image: 'bg-[url("https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVudGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
    description: 'A luxurious penthouse suite with panoramic city views and private elevator.',
    amenities: ['Private Elevator', 'Rooftop Terrace', 'Concierge', 'Gym'],
    yearBuilt: 2021,
    parking: '2 reserved spots',
    contact: 'penthouse@email.com',
    lotSize: 'N/A',
    hoaFees: '$1,000/month',
    flooring: 'Hardwood, Tile',
    appliances: ['Refrigerator', 'Dishwasher', 'Wine Cooler'],
    heatingCooling: 'Central Air',
    schoolDistrict: 'Metropolis District 1',
    propertyTax: '$13,000/year',
    energyRating: 'A',
    walkScore: 97,
    lastRenovated: 2021,
    internet: 'Fiber, 2Gbps',
    securitySystem: 'Yes',
    petPolicy: 'Allowed',
    furnished: 'Yes',
    publicTransport: 'Metro station 0.1mi',
  },
  {
    id: '12',
    title: 'Historic Mansion',
    location: '1 Heritage Way, Oldtown',
    price: 1800000,
    type: 'Mansion',
    beds: 8,
    baths: 6,
    sqft: 9000,
    image: 'bg-[url("https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuc2lvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60")]',
    description: 'A grand historic mansion with original features and expansive grounds.',
    amenities: ['Ballroom', 'Library', 'Garden', 'Guest House'],
    yearBuilt: 1890,
    parking: 'Carriage House',
    contact: 'historic@email.com',
    lotSize: '3 acres',
    hoaFees: '$0',
    flooring: 'Hardwood, Marble',
    appliances: ['Refrigerator', 'Oven'],
    heatingCooling: 'Radiator, Central Air',
    schoolDistrict: 'Oldtown Heritage Schools',
    propertyTax: '$16,500/year',
    energyRating: 'C',
    walkScore: 60,
    lastRenovated: 2005,
    internet: 'DSL, 20Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'Yes',
    publicTransport: 'Bus stop 0.4mi',
  },
  {
    id: '13',
    title: 'Eco-Friendly Home',
    location: '77 Green St, Eco City',
    price: 500000,
    type: 'House',
    beds: 4,
    baths: 3,
    sqft: 2600,
    image: 'bg-[url("https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60")]',
    description: 'A modern eco-friendly home with solar panels and smart features.',
    amenities: ['Solar Panels', 'Rainwater Harvesting', 'Smart Thermostat', 'EV Charger'],
    yearBuilt: 2019,
    parking: '2-car garage',
    contact: 'ecoagent@email.com',
    lotSize: '0.4 acres',
    hoaFees: '$0',
    flooring: 'Bamboo, Tile',
    appliances: ['Refrigerator', 'Dishwasher', 'Oven'],
    heatingCooling: 'Central Air, Solar',
    schoolDistrict: 'Eco City Schools',
    propertyTax: '$5,800/year',
    energyRating: 'A+',
    walkScore: 85,
    lastRenovated: 2020,
    internet: 'Fiber, 1Gbps',
    securitySystem: 'Yes',
    petPolicy: 'Allowed',
    furnished: 'No',
    publicTransport: 'Bus stop 0.2mi',
  },
  {
    id: '14',
    title: 'Mountain Retreat',
    location: '888 Summit Rd, Highlands',
    price: 800000,
    type: 'Retreat',
    beds: 5,
    baths: 4,
    sqft: 4000,
    image: 'bg-[url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60")]',
    description: 'A peaceful mountain retreat with hiking trails and stunning views.',
    amenities: ['Hiking Trails', 'Hot Tub', 'Sauna', 'Deck'],
    yearBuilt: 2010,
    parking: 'Garage',
    contact: 'mountainretreat@email.com',
    lotSize: '2 acres',
    hoaFees: '$0',
    flooring: 'Wood, Carpet',
    appliances: ['Refrigerator', 'Oven', 'Washer/Dryer'],
    heatingCooling: 'Fireplace, Central Air',
    schoolDistrict: 'Highlands Unified',
    propertyTax: '$8,400/year',
    energyRating: 'B',
    walkScore: 35,
    lastRenovated: 2018,
    internet: 'Satellite, 30Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'Partial',
    publicTransport: 'None',
  },
  {
    id: '15',
    title: 'Studio Apartment',
    location: '202 Central Ave, Midtown',
    price: 220000,
    type: 'Apartment',
    beds: 1,
    baths: 1,
    sqft: 600,
    image: 'bg-[url("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZGlvJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
    description: 'A compact and efficient studio apartment in the heart of the city.',
    amenities: ['Laundry', 'Gym', 'Concierge', 'Pet Friendly'],
    yearBuilt: 2015,
    parking: 'Street parking',
    contact: 'studio@email.com',
    lotSize: 'N/A',
    hoaFees: '$200/month',
    flooring: 'Laminate',
    appliances: ['Refrigerator', 'Microwave'],
    heatingCooling: 'Central Air',
    schoolDistrict: 'Midtown Schools',
    propertyTax: '$2,200/year',
    energyRating: 'B',
    walkScore: 92,
    lastRenovated: 2015,
    internet: 'Cable, 100Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'Yes',
    publicTransport: 'Metro station 0.2mi',
  },
  {
    id: '16',
    title: 'Beachfront Bungalow',
    location: '3 Ocean View, Seaside',
    price: 950000,
    type: 'Bungalow',
    beds: 3,
    baths: 2,
    sqft: 1700,
    image: 'bg-[url("https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBidW5nYWxvd3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60")]',
    description: 'A charming bungalow with direct beach access and ocean views.',
    amenities: ['Beach Access', 'Deck', 'Outdoor Shower', 'Fire Pit'],
    yearBuilt: 2008,
    parking: 'Driveway',
    contact: 'beachbungalow@email.com',
    lotSize: '0.25 acres',
    hoaFees: '$0',
    flooring: 'Tile, Wood',
    appliances: ['Refrigerator', 'Oven'],
    heatingCooling: 'Central Air',
    schoolDistrict: 'Seaside District',
    propertyTax: '$9,000/year',
    energyRating: 'B+',
    walkScore: 88,
    lastRenovated: 2016,
    internet: 'DSL, 40Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'Partial',
    publicTransport: 'Bus stop 0.3mi',
  },
  {
    id: '17',
    title: 'Country Farmhouse',
    location: '456 Country Rd, Farmland',
    price: 400000,
    type: 'Farmhouse',
    beds: 5,
    baths: 3,
    sqft: 3200,
    image: 'bg-[url("https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
    description: 'A spacious farmhouse with barn and acres of land.',
    amenities: ['Barn', 'Garden', 'Wraparound Porch', 'Workshop'],
    yearBuilt: 1995,
    parking: 'Barn',
    contact: 'farmhouse@email.com',
    lotSize: '5 acres',
    hoaFees: '$0',
    flooring: 'Hardwood, Tile',
    appliances: ['Refrigerator', 'Oven', 'Dishwasher'],
    heatingCooling: 'Central Air, Wood Stove',
    schoolDistrict: 'Farmland Schools',
    propertyTax: '$3,600/year',
    energyRating: 'C+',
    walkScore: 30,
    lastRenovated: 2011,
    internet: 'DSL, 10Mbps',
    securitySystem: 'No',
    petPolicy: 'Allowed',
    furnished: 'No',
    publicTransport: 'None',
  },
  {
    id: '18',
    title: 'Modern Duplex',
    location: '789 Twin St, Urbania',
    price: 550000,
    type: 'Duplex',
    beds: 4,
    baths: 4,
    sqft: 2800,
    image: 'bg-[url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHVwbGV4fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")]',
    description: 'A modern duplex with separate entrances and private yards.',
    amenities: ['Private Yard', 'Garage', 'Balcony', 'Smart Home'],
    yearBuilt: 2016,
    parking: '2-car garage',
    contact: 'duplex@email.com',
    lotSize: '0.18 acres',
    hoaFees: '$100/month',
    flooring: 'Laminate, Carpet',
    appliances: ['Refrigerator', 'Dishwasher', 'Oven'],
    heatingCooling: 'Central Air',
    schoolDistrict: 'Urbania District',
    propertyTax: '$6,200/year',
    energyRating: 'A-',
    walkScore: 75,
    lastRenovated: 2018,
    internet: 'Fiber, 1Gbps',
    securitySystem: 'Yes',
    petPolicy: 'Allowed',
    furnished: 'No',
    publicTransport: 'Bus stop 0.2mi',
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="text-gray-700">No property found with ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-300 transition">
      <div className={`h-64 w-full rounded-lg mb-6 relative overflow-hidden ${property.image} bg-cover bg-center`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-lg" />
      </div>
      <h1 className="text-3xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-400 to-blue-600 font-serif drop-shadow">
        {property.title}
      </h1>
      <p className="text-gray-500 mb-3">{property.location}</p>
      <div className="flex gap-4 mb-6 items-center">
        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">{property.type}</span>
        <span className="bg-blue-600 text-white text-lg px-4 py-1 rounded-full font-bold shadow">
          {property.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-gray-700 mb-6">
        <div>
          <svg className="mx-auto w-6 h-6 text-blue-400 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>
          <div className="font-semibold text-lg">{property.beds}</div>
          <div className="text-xs">Beds</div>
        </div>
        <div>
          <svg className="mx-auto w-6 h-6 text-blue-400 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 10V6a5 5 0 0110 0v4M5 20h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
          <div className="font-semibold text-lg">{property.baths}</div>
          <div className="text-xs">Baths</div>
        </div>
        <div>
          <svg className="mx-auto w-6 h-6 text-blue-400 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          <div className="font-semibold text-lg">{property.sqft.toLocaleString()}</div>
          <div className="text-xs">Sq. Ft.</div>
        </div>
      </div>
      <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-400 via-blue-200 to-blue-600 rounded-full mb-6" />
      <p className="text-gray-700 mb-6">{property.description}</p>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-blue-700">Amenities</h2>
        <div className="flex flex-wrap gap-2">
          {property.amenities.map((amenity, idx) => (
            <span
              key={idx}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>
      {/* Additional Details */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-blue-700">Additional Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <strong>Lot Size:</strong> {property.lotSize}
          </div>
          <div>
            <strong>HOA Fees:</strong> {property.hoaFees}
          </div>
          <div>
            <strong>Flooring:</strong> {property.flooring}
          </div>
          <div>
            <strong>Heating/Cooling:</strong> {property.heatingCooling}
          </div>
          <div className="col-span-2">
            <strong>Appliances:</strong> {property.appliances.join(', ')}
          </div>
          {/* New details */}
          {property.schoolDistrict && (
            <div>
              <strong>School District:</strong> {property.schoolDistrict}
            </div>
          )}
          {property.propertyTax && (
            <div>
              <strong>Property Tax:</strong> {property.propertyTax}
            </div>
          )}
          {property.energyRating && (
            <div>
              <strong>Energy Rating:</strong> {property.energyRating}
            </div>
          )}
          {property.walkScore !== undefined && (
            <div>
              <strong>Walk Score:</strong> {property.walkScore}
            </div>
          )}
          {property.lastRenovated && (
            <div>
              <strong>Last Renovated:</strong> {property.lastRenovated}
            </div>
          )}
          {/* More details */}
          {property.parking && property.parking.toLowerCase().includes('garage') && (
            <div>
              <strong>Garage Spaces:</strong> {
                (() => {
                  const match = property.parking.match(/(\d+)[-\s]?car/);
                  return match ? match[1] : 'Yes';
                })()
              }
            </div>
          )}
          {property.amenities && property.amenities.some(a => a.toLowerCase().includes('fireplace')) && (
            <div>
              <strong>Fireplace:</strong> Yes
            </div>
          )}
          {property.amenities && property.amenities.some(a => a.toLowerCase().includes('pool')) && (
            <div>
              <strong>Pool:</strong> Yes
            </div>
          )}
          {property.amenities && property.amenities.some(a => a.toLowerCase().includes('smart home')) && (
            <div>
              <strong>Smart Home Features:</strong> Yes
            </div>
          )}
          {property.description && (
            (() => {
              const viewMatch = property.description.match(/view[s]?/i);
              if (viewMatch) {
                return (
                  <div>
                    <strong>View:</strong> Yes
                  </div>
                );
              }
              return null;
            })()
          )}
          {/* New details */}
          {property.internet && (
            <div>
              <strong>Internet:</strong> {property.internet}
            </div>
          )}
          {property.securitySystem && (
            <div>
              <strong>Security System:</strong> {property.securitySystem}
            </div>
          )}
          {property.petPolicy && (
            <div>
              <strong>Pet Policy:</strong> {property.petPolicy}
            </div>
          )}
          {property.furnished && (
            <div>
              <strong>Furnished:</strong> {property.furnished}
            </div>
          )}
          {property.publicTransport && (
            <div>
              <strong>Public Transport:</strong> {property.publicTransport}
            </div>
          )}
        </div>
      </div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <span className="block text-gray-700 font-medium">
          <strong>Year Built:</strong> {property.yearBuilt}
        </span>
        <span className="block text-gray-700 font-medium">
          <strong>Parking:</strong> {property.parking}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4"></path>
        </svg>
        <span className="text-gray-700 font-medium"><strong>Contact:</strong> {property.contact}</span>
      </div>
    </div>
  );
};

export default PropertyDetails;