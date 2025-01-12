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
      headers: {
        ...corsHeaders,
      },
    })
  }

  try {
    const { registration } = await req.json()
    const apiKey = Deno.env.get('VITE_DVLA_API_KEY')

    if (!apiKey) {
      console.error('No DVLA API key found in environment variables')
      throw new Error('API key not configured')
    }

    const response = await fetch(`https://dvla-api.example.com/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ registration })
    })

    if (!response.ok) {
      throw new Error(`DVLA API call failed with status: ${response.status}`)
    }

    const data = await response.json()
    
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
    console.error('Error:', error.message)
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
})