import { NextResponse } from 'next/server';

const GEOAPIFY_API_KEY = 'e62e6e9258d344059f2fdff5dddcc698';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        query
      )}&apiKey=${GEOAPIFY_API_KEY}`,
      { method: 'GET' }
    );

    const data = await response.json();
    
    // Format the response to remove postal codes and clean up the location format
    const formattedFeatures = data.features?.map((feature: any) => ({
      ...feature,
      properties: {
        ...feature.properties,
        formatted: formatLocation(feature.properties)
      }
    }));

    return NextResponse.json({ features: formattedFeatures });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch location suggestions' },
      { status: 500 }
    );
  }
}

function formatLocation(properties: any): string {
  const parts = [];
  
  if (properties.street) {
    parts.push(properties.street);
  }
  
  if (properties.city) {
    parts.push(properties.city);
  }
  
  if (properties.state) {
    parts.push(properties.state);
  }
  
  if (properties.country) {
    parts.push(properties.country);
  }
  
  return parts.filter(Boolean).join(', ');
}
