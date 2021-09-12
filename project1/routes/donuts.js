const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const path = require("path");
const multer = require("multer");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
const Donut = require("../models/Donut");
const uploadPath = path.join("public", Donut.imagePath);

//ini untuk upload file di server. yang disimpen ke db cuma nama file doang. tapi nama filenya juga udah berubah dari aslinya
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

//untuk ngakses filenya. karna setiap mau nyimpen ke db pasti upload file dulu, dapetin nama baru simpen ke db. nah jika simpen ke db nya gagal maka file yang tadi udah diupload tetep kesimpen duluan. jadi harus akses pake fs ini dan apus filenya
const fs = require("fs");

// Home Page
router.get("/home", ensureAuthenticated, (req, res) => {
  Donut.find()
    .then((donuts) => {
      res.render("donuts/home", {
        donuts,
      });
    })
    .catch((err) => {
      req.flash("error_msg", "Something went wrong, cannot open My Shop");
      res.redirect("/dashboard");
      console.error(err);
    });
});

// Adding Page
router.get("/add", ensureAuthenticated, (req, res) => res.render("donuts/add"));

// Adding Submition
router.post("/add", upload.single("cover"), (req, res) => {
  //req.file ini bawaan dari multer setelah upload.single() di eksekusi
  const fileName = req.file != null ? req.file.filename : null;

  let errorsDonut = [];
  const { name, stock } = req.body;

  if (fileName === null) {
    errorsDonut.push({ msg: "Image is not valid" });
    res.render("donuts/add", {
      errorsDonut,
      name,
      stock,
    });
  } else {
    const newDonut = new Donut({
      name,
      stock,
      imageName: fileName,
      createdBy: req.user._id,
      modifiedBy: req.user._id,
    });

    newDonut
      .save()
      .then((donut) => {
        req.flash("success_msg", "File has been saved successfully");
        res.redirect("/donuts/home");
        console.log("new donut: ", donut);
      })
      .catch((err) => {
        req.flash("error_msg", "Something went wrong, cannot add new product");
        res.redirect("/donuts/home");
        console.error(err);
      });
  }
});

//edit page
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Donut.findById(req.params.id)
    .then((donut) => {
      console.log(donut);
      res.render("donuts/edit", {
        donut,
      });
    })
    .catch((err) => {
      req.flash("error_msg", "Something went wrong, cannot edit the product");
      res.redirect("/donuts/home");
      console.error(err);
    });
});

//edit submition
router.put("/edit/:id", upload.single("cover"), async (req, res) => {
  //req.file ini bawaan dari multer setelah upload.single() di eksekusi
  const fileName = req.file != null ? req.file.filename : null;
  const donut = await Donut.findById(req.params.id).exec();
  let errorsDonut = [];

  if (fileName === null) {
    //if image is empty or wrong format
    errorsDonut.push({ msg: "Image is not valid" });
    res.render("donuts/edit", {
      errorsDonut,
      donut,
    });
  } else {
    //deleting old image file in the system
    if (donut.imageName != null) {
      fs.unlink(path.join(uploadPath, donut.imageName), (err) => {
        if (err) {
          res.render("error/500");
          console.error(err);
        } else {
          // if no error, file has been deleted successfully
          console.log("File deleted!");

          //saving edited donut to db
          console.log("old donut: ", donut);
          const update = {
            name: req.body.name,
            stock: req.body.stock,
            imageName: fileName,
            modifiedBy: req.user._id,
          };
          Donut.findOneAndUpdate({ _id: req.params.id }, update, {
            new: true,
          })
            .then((editedDonut) => {
              req.flash("success_msg", "The product has been edited");
              res.redirect("/donuts/home");
              console.log("edited donut: ", editedDonut);
            })
            .catch((err) => {
              req.flash(
                "error_msg",
                "Something went wrong, cannot edit the product"
              );
              res.redirect("/donuts/home");
              console.error(err);
            });
        }
      });
    }
  }
});

module.exports = router;
