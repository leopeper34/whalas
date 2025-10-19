import { createClient } from 'https://esm.sh/@supabase/supabase-js'

// 🔧 Reemplaza con tus datos reales:
const SUPABASE_URL = 'https://fuuaqkmrwzzakucgyvjk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1dWFxa21yd3p6YWt1Y2d5dmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NjkwNDcsImV4cCI6MjA3NjQ0NTA0N30.8fwa2khn4-TjTJzC0ZqH-Hvox4X-nrM_Nu9veYEH09c'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Obtener los datos del formulario
    const firstName = document.querySelector('#first-name').value
    const lastName = document.querySelector('#last-name').value
    const email = document.querySelector('#email').value
    const orderNumber = document.querySelector('#order-number').value
    const subject = document.querySelector('#subject').value
    const message = document.querySelector('#message').value
    const fileInput = document.querySelector('#file-upload')
    let fileUrl = null

    // Subir archivo (si hay)
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0]
      const filePath = `${Date.now()}_${file.name}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('contacto-archivos') // Nombre del bucket
        .upload(filePath, file)

      if (uploadError) {
        alert('Error al subir archivo: ' + uploadError.message)
        return
      }

      // Obtener URL pública
      const { data } = supabase.storage.from('contacto-archivos').getPublicUrl(filePath)
      fileUrl = data.publicUrl
    }

    // Insertar datos en la tabla
    const { error: insertError } = await supabase
      .from('contactos')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          order_number: orderNumber || null,
          subject: subject,
          message: message,
          file_url: fileUrl
        }
      ])

    if (insertError) {
      console.error(insertError)
      alert('Hubo un error al enviar el formulario.')
    } else {
      alert('Formulario enviado correctamente ✅')
      form.reset()
    }
  })
})
