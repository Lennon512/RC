# RC: Roses Cleaning Service website

A simple website for Roses Cleaning Service where customers can see the services and request a booking.

## Before going live

Open `script.js` and fill in the `CONFIG` section at the top:

- `phone` and `phoneDigits`: the business phone number
- `email`: the inbox that should receive booking requests
- `area`: the towns/neighborhoods served

The service list (names, descriptions, what's included) is in `SERVICES` right below it.

## How booking works

The booking form opens the customer's email app with their request filled in, addressed to the email in `CONFIG`. No server or account is needed. Later this can be swapped for a form service (Formspree, Google Forms) or a scheduling tool (Calendly, Square Appointments) so requests arrive even if the customer doesn't send the email.

## Publishing with GitHub Pages

In the repo on GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**. The site will be live at `https://<username>.github.io/RC/` in a minute or two.

## Files

- `index.html`: page content
- `styles.css`: design
- `script.js`: business details, services list, booking form
