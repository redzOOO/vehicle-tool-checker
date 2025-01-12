import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  try {
    const requestData = await req.json()
    const { registration } = requestData
    
    console.log('Received registration:', registration)

    if (!registration) {
      throw new Error('Registration number is required')
    }

    const apiKey = Deno.env.get('DVLA_API_KEY')
    if (!apiKey) {
      console.error('DVLA API key not found in environment variables')
      throw new Error('API key not configured')
    }

    console.log('Attempting to call DVLA API...')
    
    const response = await fetch('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({ registrationNumber: registration })
    })

    if (!response.ok) {
      console.error(`DVLA API responded with status: ${response.status}`)
      throw new Error(`DVLA API call failed with status: ${response.status}`)
    }

    const dvlaData = await response.json()
    console.log('DVLA API response:', dvlaData)
    
    // Transform DVLA API response to match our application's format
    const vehicleData = {
      isCompatible: true, // You might want to add logic to determine compatibility
      vehicle: {
        make: dvlaData.make,
        colour: dvlaData.colour,
        year: dvlaData.yearOfManufacture,
        registration: dvlaData.registrationNumber
      }
    }
    
    return new Response(
      JSON.stringify(vehicleData),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in edge function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    )
  }
})