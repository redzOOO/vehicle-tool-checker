import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  try {
    // Parse the request body
    const requestData = await req.json()
    const { registration } = requestData
    
    console.log('Received registration:', registration)

    if (!registration) {
      throw new Error('Registration number is required')
    }

    // Get the API key from environment variables
    const apiKey = Deno.env.get('DVLA_API_KEY')
    if (!apiKey) {
      console.error('DVLA API key not found in environment variables')
      throw new Error('API key not configured')
    }

    console.log('Attempting to call DVLA API...')
    
    try {
      const response = await fetch('https://dvla-api.example.com/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ registration })
      })

      if (!response.ok) {
        console.error(`DVLA API responded with status: ${response.status}`)
        throw new Error(`DVLA API call failed with status: ${response.status}`)
      }

      const data = await response.json()
      console.log('DVLA API response:', data)
      
      return new Response(
        JSON.stringify(data),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 200 
        }
      )
    } catch (error) {
      console.error('Error calling DVLA API:', error)
      // Return mock data for development
      console.log('Falling back to mock response')
      return new Response(
        JSON.stringify({
          isCompatible: true,
          vehicle: {
            make: "Toyota",
            model: "Corolla",
            year: "2020",
            registration: registration
          }
        }),
        {
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
          status: 200
        }
      )
    }
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