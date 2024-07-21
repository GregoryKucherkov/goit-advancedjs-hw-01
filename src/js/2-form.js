const formData = {
  email: '',
  message: '',
};

const textInput = document.querySelector('.feedback-form');

// Check if needed page exists to prevent errors
if (textInput) {
  // Load function to fill up the form
  const load = form => {
    const valueFromLs = JSON.parse(localStorage.getItem('feedback-form-state'));

    if (valueFromLs === null) {
      return;
    }

    // Iterating the local storage
    for (const key of Object.keys(valueFromLs)) {
      form.elements[key].value = valueFromLs[key];
      // Update global object with data, in case we reload the page, and need to re-type only 1 filed
      formData[key] = valueFromLs[key];
    }
  };

  // Call the function right away
  load(textInput);

  // Callback function for input-form
  const formHandler = event => {
    // Get data from the form
    formData[event.target.name] = event.target.value;

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  };

  textInput.addEventListener('input', formHandler);

  // Callback function for submit button
  const formSubmit = event => {
    event.preventDefault();

    const emailValue = event.target.elements.email.value.trim();
    const messageValue = event.target.elements.message.value.trim();

    // Check if all fields filled up
    if (!emailValue || !messageValue) {
      alert('Fill please all fields');
    } else {
      console.log(formData);

      event.target.reset();
      localStorage.removeItem('feedback-form-state');

      formData.email = '';
      formData.message = '';
    }
  };

  textInput.addEventListener('submit', formSubmit);
}
