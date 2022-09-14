const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const { google } = require('googleapis');

router.post("/project-request", async (req, res) => {

  try {
    const OAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI,
    );

    OAuth2Client.setCredentials({ refresh_token: process.env.CLIENT_REFRESH_TOKEN });

    const accessToken = await OAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.CLIENT_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.CLIENT_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailList = [req.body.customerEmail, 'markcalendario@gmail.com']

    const mailOptions = {
      from: `Mark Kenneth Calendario <${process.env.CLIENT_EMAIL}>`,
      to: mailList,
      subject: 'Project Request Status',
      html: getEmailContent(req.body),
    };

    transport.sendMail(mailOptions, (error, result) => {
      if (!error) return res.send({ isEmailSent: true, message: "Email sent" })
    });
  } catch {
    return res.send({ isEmailSent: false, message: "Email not sent" })
  }

})

const getEmailContent = (data) => {
  const { customerName, requestedProjectTitle, requestedProjectDescription, requestedStack, requestedProjectDeadline } = data

  return `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
	<!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="x-apple-disable-message-reformatting">
	<!--[if !mso]><!-->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!--<![endif]-->
	<title></title>
	<style type="text/css">
	table,
	td {
		color: #000000;
	}
	
	a {
		color: #0000ee;
		text-decoration: underline;
	}
	
	@media only screen and (min-width: 620px) {
		.u-row {
			width: 600px !important;
		}
		.u-row .u-col {
			vertical-align: top;
		}
		.u-row .u-col-100 {
			width: 600px !important;
		}
	}
	
	@media (max-width: 620px) {
		.u-row-container {
			max-width: 100% !important;
			padding-left: 0px !important;
			padding-right: 0px !important;
		}
		.u-row .u-col {
			min-width: 320px !important;
			max-width: 100% !important;
			display: block !important;
		}
		.u-row {
			width: calc(100% - 40px) !important;
		}
		.u-col {
			width: 100% !important;
		}
		.u-col > div {
			margin: 0 auto;
		}
	}
	
	body {
		margin: 0;
		padding: 0;
	}
	
	table,
	tr,
	td {
		vertical-align: top;
		border-collapse: collapse;
	}
	
	p {
		margin: 0;
	}
	
	.ie-container table,
	.mso-container table {
		table-layout: fixed;
	}
	
	* {
		line-height: inherit;
	}
	
	a[x-apple-data-detectors='true'] {
		color: inherit !important;
		text-decoration: none !important;
	}
	</style>
	<!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css">
	<!--<![endif]-->
</head>

<body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
	<!--[if IE]><div class="ie-container"><![endif]-->
	<!--[if mso]><div class="mso-container"><![endif]-->
	<table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
		<tbody>
			<tr style="vertical-align: top">
				<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
					<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
					<div class="u-row-container" style="padding: 0px;background-color: transparent">
						<div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #242424;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #242424;"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
								<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
									<div style="width: 100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
											<!--<![endif]-->
											<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
												<tbody>
													<tr>
														<td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 25px;font-family:'Raleway',sans-serif;" align="left">
															<table width="100%" cellpadding="0" cellspacing="0" border="0">
																<tr>
																	<td style="padding-right: 0px;padding-left: 0px;" align="center">
																		<a href="${process.env.CLIENT_URL}" target="_blank"> <img align="center" border="0" src="https://i.imgur.com/3oLHqVg.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 23%;max-width: 133.4px;" width="133.4" /> </a>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if (!mso)&(!IE)]><!-->
										</div>
										<!--<![endif]-->
									</div>
								</div>
								<!--[if (mso)|(IE)]></td><![endif]-->
								<!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
							</div>
						</div>
					</div>
					<div class="u-row-container" style="padding: 0px;background-color: transparent">
						<div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-image: url('https://i.imgur.com/RNcC42S.png');background-repeat: repeat;background-position: center top;background-color: transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('https://i.imgur.com/RNcC42S.png');background-repeat: repeat;background-position: center top;background-color: transparent;"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 6px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
								<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
									<div style="width: 100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="padding: 6px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
											<!--<![endif]-->
											<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
												<tbody>
													<tr>
														<td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
															<div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
																<p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 30px; line-height: 1.3em; font-family: Raleway, sans-serif;">Hello! ${customerName}</span></strong></p>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
											<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
												<tbody>
													<tr>
														<td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
															<div style="color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
																<p style="line-height: 180%; font-size: 14px;"><span style="font-size: 18px; line-height: 32.4px;">I have received your request about your project called ${requestedProjectTitle} using ${requestedStack} with a development duration of ${requestedProjectDeadline}. I will review it soon. <br/><br/> <span style="color: #fff">For now, wait for the confirmation about this. Thank you!</span></span>
																</p>
																<hr/>
																<h3 style="text-align: left">Project Description</h3>
																<p style="margin-top: 20px; line-height: 180%; font-size: 14px; text-align: left !important;"> ${requestedProjectDescription} </p>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
											<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
												<tbody>
													<tr>
														<td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px;font-family:'Raleway',sans-serif;" align="left">
															<table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="32%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
																<tbody>
																	<tr style="vertical-align: top">
																		<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <span>&#160;</span> </td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
												<tbody>
													<tr>
														<td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
															<div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
																<p style="line-height: 140%; font-size: 14px;"><span style="font-family: Raleway, sans-serif; font-size: 22px; line-height: 30.8px;"><span style="line-height: 30.8px; font-size: 22px;"><span style="line-height: 30.8px; font-size: 22px;"><strong><span style="line-height: 30.8px; font-size: 22px;"><span style="line-height: 30.8px; font-size: 22px;">Your status:</span> <span style="color: #f1c40f; font-size: 22px; line-height: 30.8px;">Waitin</span></span><span style="color: #f1c40f; font-size: 22px; line-height: 30.8px;">g</span></strong>
																	</span>
																	</span>
																	</span>
																</p>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
											<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
												<tbody>
													<tr>
														<td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
															<div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
																<p style="font-size: 14px; line-height: 140%;"><strong><span style="font-size: 18px; line-height: 25.2px;">Regularly check your email.</span></strong></p>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
											<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
												<tbody>
													<tr>
														<td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 40px;font-family:'Raleway',sans-serif;" align="left">
															<div align="center">
																<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Raleway',sans-serif;"><tr><td style="font-family:'Raleway',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.CLIENT_URL}" style="height:46px; v-text-anchor:middle; width:184px;" arcsize="0%" stroke="f" fillcolor="#fdfcf8"><w:anchorlock/><center style="color:#242424;font-family:'Raleway',sans-serif;"><![endif]-->
																<a href="${process.env.CLIENT_URL}" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Raleway',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #242424; background-color: #fdfcf8; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;"> <span style="display:block;padding:15px 35px;line-height:120%;"><span style="font-size: 14px; line-height: 16.8px;">View my projects.</span></span>
																</a>
																<!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
															</div>
														</td>
													</tr>
												</tbody>
											</table>
											<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
												<tbody>
													<tr>
														<td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px;font-family:'Raleway',sans-serif;" align="left">
															<div style="color: #ced4d9; line-height: 140%; text-align: center; word-wrap: break-word;">
																<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 10px; line-height: 14px;">This is an automatic email. Please do not reply.</span></p>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if (!mso)&(!IE)]><!-->
										</div>
										<!--<![endif]-->
									</div>
								</div>
								<!--[if (mso)|(IE)]></td><![endif]-->
								<!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
							</div>
						</div>
					</div>
					<div class="u-row-container" style="padding: 0px;background-color: transparent">
						<div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
								<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
									<div style="width: 100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
											<!--<![endif]-->
											<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
												<tbody>
													<tr>
														<td style="overflow-wrap:break-word;word-break:break-word;padding:22px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
															<div style="color: #4a4a4a; line-height: 140%; text-align: center; word-wrap: break-word;">
																<p style="line-height: 140%; font-size: 14px;"><span style="font-family: Lato, sans-serif; font-size: 14px; line-height: 19.6px;"><span style="font-size: 12px; line-height: 16.8px;">${process.env.CLIENT_URL}</span></span>
																</p>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if (!mso)&(!IE)]><!-->
										</div>
										<!--<![endif]-->
									</div>
								</div>
								<!--[if (mso)|(IE)]></td><![endif]-->
								<!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
							</div>
						</div>
					</div>
					<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
				</td>
			</tr>
		</tbody>
	</table>
	<!--[if mso]></div><![endif]-->
	<!--[if IE]></div><![endif]-->
</body>

</html>
    `;
}

module.exports = router