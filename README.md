# Multi-Step Registration Form

A simple multi-step registration form with a progress indicator, built with plain HTML, CSS, and JavaScript. It has a dark theme and checks each step before letting the user move on.

## Features

- 4 steps: Personal Information, Contact Details, Account Setup, and Review & Submit
- Progress bar with numbered step indicators (finished steps show a ✓)
- Validation on every step before you can click **Next**
- Error messages under the fields that are wrong
- Summary page that shows what you entered (the password is hidden)
- Dark color scheme
- Responsive layout

## Project Structure

```
.
├── index.html    # Page structure and form steps
├── style.css     # Dark theme styling
├── script.js     # Step navigation, validation, and summary
└── README.md
```

## Getting Started

No installation is needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Open the project folder.
3. Open `index.html` in your browser.

## How It Works

### Steps

Each step is a `div` with the class `form-step`. Only the one with the class `active` is shown. The `currentStep` variable in `script.js` keeps track of which step you are on, and the `updateUI()` function shows the right step, updates the progress bar, and shows or hides the buttons.

### Validation

Clicking **Next** calls `validateStep()`, which checks the fields on the current step. If a field is wrong, it gets the `invalid` class and its error message appears.

| Field | Rule |
| --- | --- |
| First Name | Cannot be empty |
| Last Name | Cannot be empty |
| Email | Must look like a valid email address |
| Phone | 7 to 15 digits, with an optional `+` at the start |
| Username | At least 4 characters |
| Password | At least 6 characters |

### Summary and Submit

On the last step, `generateSummary()` builds the review list from the values you entered. When you click **Submit**, an alert appears and the form data is printed to the browser console.

## Customizing

- **Colors:** Edit the color values in `style.css`. The main ones are the page background (`#121212`), the form box (`#1e1e1e`), and the blue accent (`#2196F3`).
- **Validation rules:** Edit the checks inside `validateStep()` in `script.js`.
- **Number of steps:** Add a new `form-step` and a new `step-indicator` in `index.html`, then update `totalSteps` in `script.js`.

## Technologies Used

- HTML5
- CSS3 (Flexbox, transitions, animations)
- JavaScript (DOM manipulation, regular expressions)

## Future Improvements

- Send the form data to a backend instead of logging it
- Save progress so a page refresh does not lose it
- Add a show/hide password button
- Add a password confirmation field

## License

This project is open source and available under the [MIT License](LICENSE).
