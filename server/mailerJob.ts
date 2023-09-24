const nodemailer = require('nodemailer')
const cron = require('node-cron')

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'nzgillham.max@gmail.com',
		pass: 't94zSUVvRVRD9Us',
	},
})
const sendCsvEmail = () => {
	const mailOptions = {
		from: 'nzgillham.max@gmail.com',
		to: 'nikogham@pm.me',
		subject: 'Hourly CSV Report',
		text: 'Find attached the hourly CSV report.',
		attachments: [
			{
				path: '../responses.csv',
			},
		],
	}
	//@ts-ignore
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(`Failed to send email: ${error}`)
		} else {
			console.log(`Email sent: ${info.response}`)
		}
	})
}

module.exports = function startCronJob() {
	cron.schedule('0 * * * *', () => {
		// This will run every hour at the start of the hour
		sendCsvEmail()
	})
}
