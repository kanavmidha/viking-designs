document.addEventListener('DOMContentLoaded', () => {

    // navigation hide/open on mobile

    const toggleButton = document.querySelector('#toggle-btn')

    const nav = document.querySelector('#primary-nav')

    toggleButton.addEventListener('click', () => {

        nav.classList.toggle('!h-full')
        
    })

    // POST request

    const contactForm = document.querySelector('.contact-form')

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault()

        // collecting form data 
        const formData = new FormData(contactForm)

        // converting the formData to JSON
        const formObject = Object.fromEntries(formData.entries())

        const {name, email, service} = formObject

        // regex for validation
        const nameRegex = /^[a-zA-Z\s.]+$/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const serviceRegex = /^[a-zA-Z\s,]+$/

        if ( !name || !email || !service ) {
            alert("Name, Email and service fields are required.")

            return

        } else {
            if (!nameRegex.test(name)) {
                alert("Name can only contain alphabets, spaces and '.'.")

                return
            }

            if (!emailRegex.test(email)) {
                alert("The email provided is not valid.")

                return
            }
            
            if (!serviceRegex.test(service)) {
                alert("Please enter the services required by separating them with a ','.")

                return
            }

            // api request

            // const hostname = window.location.hostname

            // const baseUrl = new URL(`https://${hostname}`)

            fetch(`/api/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('failed to send message')
                }
                return response.json()
            }).then((data) => {
                // console.log(data)
                alert('Message sent successfully! We will get back to you very soon.')
            }).catch((error) => {
                // console.log(error)
            })
        }
    })
})