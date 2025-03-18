const express = require('express');

const bodyParser = require('body-parser');

const { createClient } = require('@supabase/supabase-js');



const app = express();

const port = 3000;



app.use(bodyParser.json());



// Initialize Supabase client

const supabaseUrl = 'https://lbzbtpuyraylncaqgyoe.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiemJ0cHV5cmF5bG5jYXFneW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMTgxNTcsImV4cCI6MjA1NzY5NDE1N30.1WtKYhYAc1da-oSV2Va3zRFGA6J7xrM9AIcaX5WWk5I';

const supabase = createClient(supabaseUrl, supabaseKey);



// Endpoint to handle email submissions

app.post('/api/send-email', async (req, res) => {

  const { subject, message, recipient } = req.body;



  // Basic validation

  if (!subject || !message || !recipient) {

    return res.status(400).json({ message: 'All fields are required.' });

  }



  try {

    // Store the data in Supabase

    const { data, error } = await supabase

      .from('emails')

      .insert([{ subject, message, recipient }]);



    if (error) {

      throw error;

    }



    res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});



app.listen(port, () => {

  console.log(`Server running on http://localhost:${port}`);

});