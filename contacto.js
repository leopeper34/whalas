// Inicializar Supabase usando CDN
const supabaseUrl = 'https://nbmlydcgylwpwgajfiet.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ibWx5ZGNneWx3cHdnYWpmaWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4ODA5MjQsImV4cCI6MjA3NjQ1NjkyNH0.mj07GI4e7yqQumes1hcM17DBV5-dzT3Bid1__ZBQIHc' // reemplaza con tu anon key
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

const form = document.getElementById('contact-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('Formulario enviado') // depuración

  // Obtener datos del formulario
  const first_name = document.getElementById('first-name').value.trim()
  const last_name = document.getElementById('last-name').value.trim()
  const email = document.getElementById('email').value.trim()
  const order_number = document.getElementById('order-number').value.trim()
  const subject = document.getElementById('subject').value
  const message = document.getElementById('message').value.trim()
  const fileInput = document.getElementById('file-upload')
  let file_url = null

  try {
    // Subir archivo al bucket si hay
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0]
      
      // Sanear el nombre del archivo (sin espacios ni acentos)
      const safeFileName = file.name
        .replace(/\s/g, "_")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
      const fileName = `${Date.now()}_${safeFileName}`

      const { data: uploadData, error: uploadError } = await supabaseClient
        .storage
        .from('contact-files')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Obtener URL pública
      const { data: publicData } = supabaseClient
        .storage
        .from('contact-files')
        .getPublicUrl(fileName)
      file_url = publicData.publicUrl
    }

    // Insertar datos en la tabla solo si la subida fue exitosa
    const { data, error } = await supabaseClient
      .from('contact_messages')
      .insert([{
        first_name,
        last_name,
        email,
        order_number,
        subject,
        message,
        file_url
      }])

    if (error) throw error

    alert('✅ Mensaje enviado correctamente!')
    form.reset()

  } catch (err) {
    console.error('Error al enviar mensaje:', err)
    alert('❌ Ocurrió un error. Intente nuevamente.')
  }
})
