const express = require('express');
const mongoose  = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
// const flash = require('connect-flash');
// const session = require('express-session');

const PayTracker = require("./server/Model/payTracker")



const app = express();
const PORT = 4500 || process.env.PORT;

// app.use(indexRoutes)

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.get("/admin/set", async(req, res)=>{
  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const paytrackers = await PayTracker.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await PayTracker.countDocuments({});

    res.render("index", {
      paytrackers,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
})
 


/**
 * GET /
 * New Pactracker Form
 */
app.get("/Create", (req, res)=>{
  res.render("create")
})

app.post("/Create", async(req, res)=>{
  const newPaytracker = new PayTracker({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    Bankname: req.body.Bankname,
    sentMess: req.body.sentMess,
    amount: req.body.amount,
    progress: req.body.progress,
    senMess: req.body.senMess,
    Fees: req.body.Fees,
    FStatus: req.body.FStatus,
    Mmessage: req.body.Mmessage,
    mstatus: req.body.mstatus,
  });
  await PayTracker.create(newPaytracker);
  res.redirect("/admin/set");
})


/**
 * GET /
 * View Paytracker
 */

app.get("/transId/progress/PayPulse/:id", async (req, res)=>{
  try {

    const paytracker = await PayTracker.findOne({_id: req.params.id });


    res.render("viewPay", {
      paytracker
    });
  } catch (error) {
    console.log(error);
  }
})


/**
 * GET /
 * Edit payTracker Data
 */

app.get("/edit/:id",async(req, res)=>{

  try {
    const paytracker = await PayTracker.findOne({ _id: req.params.id });

    res.render("editPay", {
      paytracker
    });
  } catch (error) {
    console.log(error);
  }
})

/**
 * GET /
 * Update PayTracker Data
 */

app.put("/edit/:id", async(req, res)=>{

  try {
  await PayTracker.findByIdAndUpdate(req.params.id,{
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    Bankname: req.body.Bankname,
    sentMess: req.body.sentMess,
    amount: req.body.amount,
    progress: req.body.progress,
    senMess: req.body.senMess,
    Fees: req.body.Fees,
    FStatus: req.body.FStatus,
    Mmessage: req.body.Mmessage,
    mstatus: req.body.mstatus,
      updatedAt: Date.now(),
  });

    await res.redirect(`/edit/${req.params.id}`);
    
    console.log('redirected');
} catch (error) {
  console.log(error);
}

})


/**
 * Delete /
 * Delete Customer Data
 */
app.delete("/delete/:id", async(req, res)=>{
  try {
    await PayTracker.deleteOne({ _id: req.params.id });
    res.redirect("/admin/set");
  } catch (error) {
    console.log(error);
  }
})

//   const locals = {
//     title: "Search Customer Data",
//     description: "Free NodeJs User Management System",
//   };

//   try {
//     let searchTerm = req.body.searchTerm;
//     const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

//     const customers = await Customer.find({
//       $or: [
//         { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
//         { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
//       ],
//     });

//     res.render("search", {
//       customers,
//       locals,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// set view engine
app.set('view engine', 'ejs');

//DB config
const db ='mongodb+srv://pius1:pius123@webdevelopment.xav1dsx.mongodb.net/PayPulse';
// connect to mongodb
mongoose.connect(db)
.then(()=>{
    console.log('MongoDB Connected')
})
.catch(err =>{console.log(err)})

// Express session
// app.use(
//     session({
//       secret: 'secret',
//       resave: true,
//       saveUninitialized: true
//     })
//   );


// Connect flash
// app.use(flash());




app.listen(PORT, console.log(`Server running on  ${PORT}`));