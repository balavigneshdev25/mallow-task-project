import React from "react";
import { Toaster, ToasterProps } from "react-hot-toast";

const ReactHotToast: React.FC<ToasterProps> = (props) => {
  return <Toaster position="top-right" {...props} />;
};

export default ReactHotToast;
