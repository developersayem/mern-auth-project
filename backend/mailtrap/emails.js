import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail =async(email,verificationToken)=>{
const recipient = [{email}]
try {
    const response = await mailtrapClient.send({
        from:sender,
        to: recipient,
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
        category:"Email Verification"
    })
    console.log("Email send successfully")
} catch (error) {
    console.log("`Error sending verification email:",error)
    throw new Error (`Error sending verification email: ${error}`)
}
}

export const sendWelcomeEmail=async(email,name)=>{
    const recipient = [{email}] 
    try {
      const response=  await mailtrapClient.send({
            from: sender,
            to:recipient,
            template_uuid: "6dffa186-7eca-48d3-a74a-8bfa1d9e098a",
            template_variables: {
                "name": name,
                "company_info_name": "MERN Auth Company"
              }
        })
        console.log("Email send successfully",response)
    } catch (error) {
        console.log("`Error sending verification email:",error)
        throw new Error (`Error sending verification email: ${error}`)
    }
}