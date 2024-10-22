const User = require('../model/UserModel');
const PdfFile = require ('../model/PdfModel')
const Razorpay = require('razorpay');
const shortid = require('shortid');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,    
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.CreateOrder = async (req, res) => {
    console.log("razor pay controller ---");
    let { amount } = req.body;
    console.log("amount ", amount);
    
    try {
      // Convert amount to number if it's a string
      amount = Number(amount);
  
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).send("Invalid amount");
      }
  
      const payment_capture = 1;
      const currency = "INR";
      const options = {
        amount: amount * 100, // Amount in paisa
        currency,
        receipt: shortid.generate(),
        payment_capture,
      };
      
      console.log("options++++++++++++++++++++++++++", options);
      const response = await razorpay.orders.create(options);
      console.log("res--------------------------------", response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating order");
    }
  };
  


// exports.CreateOrder=async(req,res)=>{
//     console.log("razor pay controller ---")
//     const { amount } = req.body;
//     console.log("amount ",amount);
    
//     try {
//         const payment_capture = 1;
//         const currency = "INR";
//         const options = {
//             amount: amount * 100, // Amount in paisa
//             currency,
//             receipt: shortid.generate(),
//             payment_capture,
//         };
//         console.log("options++++++++++++++++++++++++++",options)
//         const response = await razorpay.orders.create(options);
//         console.log("res--------------------------------",response)
//         res.json({
//             id: response.id,
//             currency: response.currency,
//             amount: response.amount,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error creating order");
//     }
// }

exports.createUser = async (req, res) => {
    const data = {
        name: "irshad",
        email: "irshadalike10@gmail.com",
        password: "irshad123"
    };

    try {
        const newUser = new User(data);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};


exports.AddPdf=async (req, res) => {
  const { pdfUrl, name, price } = req.body;
  console.log("pdfUrl, name, price----------",pdfUrl, name, price );
  
  try {
    const newPdf = new PdfFile({
      name,
      price,
      url: pdfUrl,
    });

    await newPdf.save();
    console.log("saved");
    
    res.status(200).json({ message: 'PDF stored successfully', pdf: newPdf });
  } catch (error) {
    res.status(500).json({ message: 'Error storing PDF', error });
  }
};


// API to fetch PDF details by ID
exports.getPdfUrlById = async (req, res) => {
  try {
    const pdfId = req.params.id; // Get PDF ID from request parameters
    const pdf= await PdfFile.findById(pdfId);  // Find PDF by ID

    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    res.status(200).json({ pdfUrl: pdf.url, pdfName: pdf.name });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching PDF', error });
  }
};
