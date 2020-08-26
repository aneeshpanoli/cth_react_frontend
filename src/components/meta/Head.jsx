import React from "react";
import { Helmet } from "react-helmet";
import { appIcon } from "../../Assets/img/app-icon.png";
import { cthImage } from "../../Assets/img/cth_icon_dark.svg";

export default function Head(props) {
  const [values, setValues] = React.useState({
    title: "CivicTechHub:Together we can survive this crisis",
    description:
      "CivicTechHub offers the largest database of projects dedicated to fighting the current crises. Join now to browse projects, find support and help humanity defeat COVID-19.",
    image: cthImage
    });

  React.useEffect(() => {
    let newValue = {}
    Object.keys(values).forEach(function (key, index) {
      console.log(key);
      if (props[key]) {
       newValue[key] = props[key]
      }
      if(newValue){
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
        <link rel="shortcut icon" href={appIcon} />
        <title>{values.title}</title>
        <meta property="og:title" content={values.title} />
        <meta
          property="og:description"
          content={values.description}
        />
        <meta
          property="og:image"
          content={values.image}
        />
      </Helmet>
    </div>
  );
}
