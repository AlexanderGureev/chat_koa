import validator from "./validate/validate.js";
import sum from "./validate/sum";
//import "../common/socket.io";
// import _ from "../common/lodash";
import "lodash";
import "bootstrap";
// import jquery from "jquery";
// console.log(_.partition([1, 3, 3, 4], n => n % 2));
console.dir(_);
console.log(_.take([1, 2, 3]));
// console.log($('.title'));
// if (module.hot) {
//     module.hot.accept('./validate/sum', function () {
//         console.log('Accepting the updated sum module!');
//         console.log(`SUM = ${sum(1,2,3,4,5,6)}`);
//     })
// }

//alert(validator());



console.log(`SUM = ${sum(1,2,3,4,5,6,7)}`);

import "../../less/home/main.less";

import "root/bootstrap/dist/css/bootstrap.min.css" //root - алиас для импорта
