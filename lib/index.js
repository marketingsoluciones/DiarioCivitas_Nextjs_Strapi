"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const instancia = _axios.default.create({
  baseURL: "https://diariocivitas.com/wp-json/wp/v2"
});

const extraerPost = () => {
  const porPagina = 1;
  const pagina = 1;
  const params = "?".concat(porPagina, "&").concat(pagina);
  const {
    data
  } = instancia.get("/posts".concat(params));
  console.log(data);
};

extraerPost;