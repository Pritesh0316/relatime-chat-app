console.log("JS Load");
async function sendOTP() {
    console.log("Button clicked");
    const email = document.getElementById("email").value;

    if (!email) {
        alert("Enter email first");
        return;
    }

    const res = await fetch("/otp/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });

    const data = await res.text();

    alert(data);

    // show OTP field
    document.getElementById("otpDiv").style.display = "block";

    document.getElementById("otpSent").value = "true";
}