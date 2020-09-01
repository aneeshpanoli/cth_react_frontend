import React from "react";
import { Helmet } from "react-helmet";
import { cthImage } from "../../Assets/img/cth_icon_dark.svg";

export default function Head(props) {
  const [values, setValues] = React.useState({
    title: "CivicTechHub: Together we can survive this crisis",
    description:
      "CivicTechHub offers the largest database of projects dedicated to fighting the current crises. Join now to browse projects, find support and help humanity defeat COVID-19.",
    image: cthImage,
    type:"website"
  });

  React.useEffect(() => {
    let newValue = {};
    Object.keys(values).forEach(function (key, index) {
      // console.log(key);
      if (props[key]) {
        newValue[key] = props[key];
      }
      if (newValue) {
        setValues({ ...values, ...newValue });
      }
      // key: the name of the object key
      // index: the ordinal position of the key within the object
    });
  }, [props]);

  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{values.title}</title> 
        <meta property="og:title" content={values.title} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content={values.type} />
        <meta property="og:site_name" content="CivicTechHub"></meta>
        <meta property="twitter:title" content={values.title} />
        <meta property="twitter:image" content={values.image} />
        <meta name="twitter:card" content="summary" />
        <meta property="og:description" content={values.description} />
        <meta property="og:image" content={values.image} />
      </Helmet>
    </div>
  );
}
