function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formValue = {city: "",country: "",date: ""}
    let cityText = document.getElementById('city').value
    let countryText = document.getElementById('country').value
    let dateText = document.getElementById('depdate').value
    formValue = {city: cityText, country: countryText, date: dateText}
    console.log("::: Form Submitted :::")
    console.log(formValue)
    Client.dateCompare()
    Client.detection(formValue)


}
export { handleSubmit }
