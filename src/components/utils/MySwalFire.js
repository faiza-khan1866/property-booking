import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function MySwalFire(item, Iscustom) {
  if (Iscustom) {
    return MySwal.fire(item).then((result) => {
      return result;
    });
  } else {
    MySwal.fire(<>{item.map((item) => item)}</>);
  }
}

export default MySwalFire;
