const Category = require("../models/Category");
class CategoryController {
  postCreateCategory(req, res) {
    const category = new Category(req.body);
    category
      .save()
      .then(() => res.redirect(`back`))
      .catch((error) => {
        console.log(error);
      });
  }
}
module.exports = new CategoryController();
