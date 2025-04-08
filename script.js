function processFile() {
    let file = document.getElementById("fileUpload").files[0];
    if (!file) {
        alert("Please select a file.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(event) {
        let image = new Image();
        image.src = event.target.result;
        
        image.onload = function() {
            Tesseract.recognize(image, 'eng').then(({ data }) => {
                document.getElementById("ocrResult").innerText = "Extracted Text: " + data.text;
            });
        };
    };
    reader.readAsDataURL(file);
}

function generatePDF() {
    let content = `
        Health Summary:
        - Allergies: None
        - Recent Appointments: Dr. Smith, Cardiology
        - Vaccinations: COVID-19, Flu
    `;

    let blob = new Blob([content], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Health_Summary.txt";
    link.click();
}
