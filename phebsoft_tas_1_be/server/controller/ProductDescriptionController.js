const Productdb = require("../model/ProductModel");
const { Configuration, OpenAIApi } = require("openai");

exports.addProduct = async (req, res) => {

  if(!req.body.formData.productDetail){
    res.status(400).json({ message: "fail", data: "Please Fill Required Fields" });
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.formData.productDetail,
      max_tokens: 10,
      temperature: 0,
    });
    
    const aiResp = response.data.choices.map((choice) => choice.text.trim()).toString();

    const product = new Productdb({
      userInput: req.body.formData.productDetail,
      aiResponse: aiResp,
    });
    await product.save();

    res.status(200).json({ message: "Success", data: "Added Successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "fail", data: "e.message" });
  }
};
