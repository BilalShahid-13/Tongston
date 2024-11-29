import emailjs from "emailjs-com"; // Import the emailjs library

async function sendEmail(name, email, referral) {
  try {
    const referralUrl = `${window.origin}/signup?referredBy=${referral}`;
    const response = await emailjs.send(
      "service_7ymbc4a",
      "template_h62rw8s",
      {
        to_name: name,
        subject:
          "Welcome to T-World! Your Sign-Up is Complete & You’ve Earned 100 TOIN",
        email_id: email,
        referral_code: referralUrl,
        message: `Congratulations! 🎉

Your initial sign-up has been successfully completed on T-World, and you are now officially part of a global community focused on empowering your journey to becoming Valuable, Influential & Profitable.
Boost Your TOINS Now

You’ve already earned 100 TOINS just for signing up!

Login to your T-World account and earn another 100 TOINS by completing your profile today.

Click here to get started:https://tongston.vercel.app/

Welcome to the world of possibilities! We are excited to support you in becoming a VIP on T-World.

If you have any questions or need assistance, feel free to contact us at t-world@tongston.com
Share your Referral Link: ${referralUrl}

Best wishes,
The T-World Team`,
        reply_to: "t-world@tongston.com",
      },
      "uNbdDy5vJyK-ScLts" // Your EmailJS User ID
    );

    // Log the response for debugging
    console.log("referal code", referral);
    console.log("Email sent successfully:", response);
  } catch (error) {
    // Log the error details for debugging
    console.error("Error sending email:", error);
    alert(`Error: ${error.status} - ${error.text}`);
  }
}

export default sendEmail;
