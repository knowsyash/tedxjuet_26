import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, enrollmentNumber, year } = body

    console.log('Received registration:', { name, email, enrollmentNumber, year })

    // Validate required fields
    if (!name || !email || !enrollmentNumber || !year) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Setup Google Sheets API
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID

    console.log('Environment check:', {
      hasClientEmail: !!clientEmail,
      hasPrivateKey: !!privateKey,
      hasSpreadsheetId: !!spreadsheetId,
      spreadsheetId
    })

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error('Missing environment variables')
      return NextResponse.json(
        { error: 'Server configuration error. Please check environment variables.' },
        { status: 500 }
      )
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Append data to sheet
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium'
    })

    console.log('Attempting to write to sheet...')

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E', // Adjust sheet name if needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name, email, enrollmentNumber, year]],
      },
    })

    console.log('Successfully wrote to sheet:', response.data)

    return NextResponse.json(
      { message: 'Registration successful', success: true },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errors: error.errors
    })
    return NextResponse.json(
      { error: `Failed to register: ${error.message || 'Unknown error'}` },
      { status: 500 }
    )
  }
}
