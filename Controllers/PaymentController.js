//razorpay payment controller
const Razorpay = require("razorpay");
const crypto = require("crypto");

module.exports.getOrderId = (request, response) => {
  let { amount } = request.body; // amount send from the server
  var instance = new Razorpay({
    key_id: "rzp_test_crv4qLGhZL1RPh",
    key_secret: "cFrZjigfwaqrdGGU12gD3B9s",
  });
  var options = {
    amount: Number(amount) * 100, // amount in the smallest currency unit(amount in paisa so i have to convert in rupee by multiply 100)
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    // console.log(order);
    if (err) {
      response.status(500).send({ status: false });
    } else {
      response.status(200).send({ status: true, order });
    }
  });
};

module.exports.verifyPayment = (request, response) => {
  // verify ordered
  let { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    request.body;
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", "cFrZjigfwaqrdGGU12gD3B9s")
    .update(body.toString())
    .digest("hex");

  console.log("sig received ", razorpay_signature);
  console.log("sig generated ", expectedSignature);

  var message = { status: false };
  if (expectedSignature === razorpay_signature) message = { status: true };
  response.send(message);
};
