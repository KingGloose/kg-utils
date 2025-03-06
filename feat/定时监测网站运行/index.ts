const axios = require("axios");
const nodemailer = require("nodemailer");

const TIME = 1000 * 60 * 60 * 24; // 1天
const REQUEST_URL = "xxx"; // 网站地址
const MAIL_OPTIONS_SERVICE = "xxx"; // 邮箱服务
const MAIL_OPTIONS_AUTH_USER = "xxx"; // 邮箱
const MAIL_OPTIONS_AUTH_PASS = "xxx"; // 授权码

const initMailer = () => {
  const transporter = nodemailer.createTransport({
    service: MAIL_OPTIONS_SERVICE,
    auth: {
      user: MAIL_OPTIONS_AUTH_USER,
      pass: MAIL_OPTIONS_AUTH_PASS,
    },
  });

  return transporter;
};

const transporter = initMailer();
const request = async (cb: any) => {
  const res = await axios.get(REQUEST_URL);
  const title = res.data.match(/<title>(.*?)<\/title>/i)[1];

  if (title !== "抱歉，站点已暂停") {
    const sendOptions = {
      from: `"xxx" xxx`, // 发送者
      subject: "xxx", // 标题
      to: "xxx", // 接收者
      text: "xxx", // 文本
    };

    transporter.sendMail(sendOptions, (error: any, info: any) => {
      if (error) return console.log("发送失败:", error);

      clearInterval(timer);
      transporter.close();
    });
  } else {
    console.log("网站维护");
  }
};

const timer = setInterval(request, TIME / 4); // 每天请求4次
