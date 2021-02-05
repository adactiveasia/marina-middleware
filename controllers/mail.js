const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const EMAIL = 'admin@peoplenprops.com';

exports.send = async (req, res, next) => {
    const { email } = req.body;
    let creator;

    try {
        sendMail(email);
        return res.status(201).json({
            message: 'Email sent successefully'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};

exports.sendMail = (email, win) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL, 
        // you can try with TLS, but port is then 587
        auth: {
            type: 'OAuth2',
            user: EMAIL,
            clientId: '911102631843-p59ks7iislk081e8nlghse4ed7803ccb.apps.googleusercontent.com',
            clientSecret: 'oKPo_rSkH9s7qFE2uCZZLhfk',
            refreshToken: '1//04OdU_iX9yqaGCgYIARAAGAQSNwF-L9IrZxbGVVa4_TXYQTec5vSWaMQkVPNEkfsMxWAJxm1WSdI4kTyYN5g92SQbhNrJRpElZSI',
            accessToken: 'ya29.a0AfH6SMDkt7EXAo3ytJKs7ddUVr7u1VnE6v7y7b7hLZ22B0-5psRY1o_6qO_xBleCLvDZO3F2nEUVrbQp3qdUYJBQwNG4-6BpEcd0ibVTITd73rWPn02aLbJ3uV28YO0E_ZeJ5mBxX8-gFrDdxagzSzX-dBuQQLkZQ5Vgb8plEOY'
        }
    });

    transporter.verify();
    const coupon5 =
        `
            <h2 style="text-align: center;"><span style="font-weight: 400;">CONGRATULATIONS!&nbsp;</span></h2>
            <h1 style="text-align: center;"><span style="font-weight: 400;">YOU HAVE WON</span></h1>
            <h3 style="text-align: center;"><span style="font-weight: 400;">5% OFF VOUCHER</span></h3>
            <h3 style="text-align: center;"><span style="font-weight: 400;">WITH NO MINIMUM SPEND*</span></h3>
            <p style="text-align: center;">&nbsp;</p>
            <img style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src="cid:coupon@mac"/>
            <p style="text-align: center;">&nbsp;</p>
            <h3 style="text-align: center;"><span style="font-weight: 400;">FLASH THIS EMAIL TO OUR ARTIST TO REDEEM!</span></h3>
            <p style="text-align: center;"><span style="font-weight: 400;">*The voucher is only applicable for all regular priced items excluding mini M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C, VivaGlam and Accessories. This voucher cannot be used in conjunction with other in-store promotions. Valid till 31 December 2020. One-time use only. M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C Cosmetics Singapore reserve the rights to change these terms and conditions at any time without prior notice. M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C Cosmetics Singapore reserve the right of final decision in case of any disputes.</span></p>
            `

    const coupon10 =
        `
            <h2 style="text-align: center;"><span style="font-weight: 400;">CONGRATULATIONS!&nbsp;</span></h2>
            <h1 style="text-align: center;"><span style="font-weight: 400;">YOU HAVE WON</span></h1>
            <h3 style="text-align: center;"><span style="font-weight: 400;">$10 VOUCHER</span></h3>
            <h3 style="text-align: center;"><span style="font-weight: 400;">WITH NO MINIMUM SPEND*</span></h3>
            <p style="text-align: center;">&nbsp;</p>
            <img style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src="cid:coupon@mac"/>
            <p style="text-align: center;">&nbsp;</p>
            <h3 style="text-align: center;"><span style="font-weight: 400;">FLASH THIS EMAIL TO OUR ARTIST TO REDEEM!</span></h3>
            <p style="text-align: center;"><span style="font-weight: 400;">*The voucher is only applicable for all regular priced items excluding mini M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C, VivaGlam and Accessories. This voucher cannot be used in conjunction with other in-store promotions. Valid till 31 December 2020. One-time use only. M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C Cosmetics Singapore reserve the rights to change these terms and conditions at any time without prior notice. M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C Cosmetics Singapore reserve the right of final decision in case of any disputes.</span></p>
            `

    const couponBrush =
        `
            <h2 style="text-align: center;"><span style="font-weight: 400;">CONGRATULATIONS!&nbsp;</span></h2>
            <h1 style="text-align: center;"><span style="font-weight: 400;">YOU HAVE WON</span></h1>
            <h3 style="text-align: center;"><span style="font-weight: 400;">FLUIDLINE BROW GEL CRÈME*</span></h3>
            <h3 style="text-align: center;"><span style="font-weight: 400;">FREE WITH EVERY PURCHASE</span></h3>
            <p style="text-align: center;">&nbsp;</p>
            <img style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src="cid:coupon@mac"/>
            <p style="text-align: center;">&nbsp;</p>
            <h3 style="text-align: center;"><span style="font-weight: 400;">FLASH THIS EMAIL TO OUR ARTIST TO REDEEM!</span></h3>
            <p style="text-align: center;"><span style="font-weight: 400;">*The voucher is only applicable for all regular priced items excluding mini M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C, VivaGlam and Accessories. This voucher cannot be used in conjunction with other in-store promotions. Valid till 31 December 2020. One-time use only. M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C Cosmetics Singapore reserve the rights to change these terms and conditions at any time without prior notice. M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C Cosmetics Singapore reserve the right of final decision in case of any disputes.</span></p>
            `

    const couponCream =
        `
            <h2 style="text-align: center;"><span style="font-weight: 400;">CONGRATULATIONS!&nbsp;</span></h2>
            <h1 style="text-align: center;"><span style="font-weight: 400;">YOU HAVE WON</span></h1>
            <h3 style="text-align: center;"><span style="font-weight: 400;">150S LARGE POWDER FACE BRUSH*</span></h3>
            <h3 style="text-align: center;"><span style="font-weight: 400;">FREE WITH EVERY PURCHASE</span></h3>
            <p style="text-align: center;">&nbsp;</p>
            <img style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src="cid:coupon@mac"/>
            <p style="text-align: center;">&nbsp;</p>
            <h3 style="text-align: center;"><span style="font-weight: 400;">FLASH THIS EMAIL TO OUR ARTIST TO REDEEM!</span></h3>
            <p style="text-align: center;"><span style="font-weight: 400;">*The voucher is only applicable for all regular priced items excluding mini M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C, VivaGlam and Accessories. This voucher cannot be used in conjunction with other in-store promotions. Valid till 31 December 2020. One-time use only. M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C Cosmetics Singapore reserve the rights to change these terms and conditions at any time without prior notice. M</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">A</span><span style="font-weight: 400;">∙</span><span style="font-weight: 400;">C Cosmetics Singapore reserve the right of final decision in case of any disputes.</span></p>
            `
        
    const content = (win) => {
        let data = 'test';
        switch (win) {
            case '1':
                data = coupon5
                break;
            case '2':
                data = coupon10
                break;
            case '3':
                data = couponBrush
                break;
            case '4':
                data = couponCream
                break;
        }
        return data;
    }

    const imgFilename = (win) => {
        let data = 'test';
        switch (win) {
            case '1':
                data = '5OFF.jpg'
                break;
            case '2':
                data = '10OFF.jpg'
                break;
            case '3':
                data = 'BRUSH.jpg'
                break;
            case '4':
                data = 'CREME.jpg'
                break;
        }
        return data;
    }

    const imgPath = (win) => {
        let data = 'test';
        switch (win) {
            case '1':
                data = './assets/5OFF.jpg'
                break;
            case '2':
                data = './assets/10OFF.jpg'
                break;
            case '3':
                data = './assets/BRUSH.jpg'
                break;
            case '4':
                data = './assets/CREME.jpg'
                break;
        }
        return data;
    }



    const mailOptions = win => {
        return {
            from: EMAIL,
            to: email,
            subject: 'YOU HAVE WON COUPON MAC',
            html: content(win),
            attachments: [{
                filename: imgFilename(win),
                path: imgPath(win),
                cid: 'coupon@mac' //same cid value as in the html img src
            }]
        }
    }

    let info = ''

    transporter.sendMail(mailOptions(win), (error, info) => {
        info = error ? error : info;
        if (error) {
            console.log(error)
            return false;
        } else {
            console.log('Message sent: ' + info.response);
            return true;
        };
    });
    return info;
}
