var nodemailer = require("nodemailer");
module.exports = {
  sendMail: (title, contenido, fecha_creacion) => {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com ",
      port: 465,
      service: "gmail",
      auth: {
        user: "nachomacielabadiegaleano@gmail.com",
        pass: "lkg3b_orbp68G2V-Ecw2",
      },
    });

    var mailOptions = {
      from: "nachomacielabadiegaleano@gmail.com",
      to: "macielgaleano.jh@gmail.com, nachomacielabadiegaleano@gmail.com",
      subject: `Articulo creado '${title}'`,
      text: `Un nuevo articulo fue creado:
            fechaCreado:'${fecha_creacion}',
            titulo: '${title}',
            contenido: '${contenido}',`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        //console.log(error);
      } else {
        //console.log("Email sent: " + info.response);
      }
    });
  },
};
