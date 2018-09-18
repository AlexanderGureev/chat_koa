const { isAuthenticated } = require("../middleware/isAuth");
const { addAvatar, delAvatar, setStatus } = require("../app/services/profile");

module.exports = router => {
  router.post("/profile/add/avatar", isAuthenticated, addAvatar);
  router.delete("/profile/delete/avatar", isAuthenticated, delAvatar);
  router.put("/profile/status/change", isAuthenticated, setStatus);
};
