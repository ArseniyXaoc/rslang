import React from 'react';
import {useParams, useRouteMatch} from 'react-router';
import {Link} from "react-router-dom";
import sectionStyles from "./SectionComponentStyles";
import setColor from "../../utils";

export default function SectionComponent() {
  const useStyles = sectionStyles();
  const { sectionId } = useParams();

  const { url } = useRouteMatch();

  return (
    <div className={useStyles.sectionContainer}>
      <div className={useStyles.sectionWrapper}>
        <div className={useStyles.sectionTitle}>
          <h1 className={useStyles.sectionTitleText} style={{backgroundColor: setColor(sectionId)}}>Раздел {sectionId}</h1>
        </div>
        <div className={useStyles.sectionContent}>
          {Array(30).fill(1).map((_, pageId) => (
              <Link className={useStyles.sectionLink} key={`k${pageId}`} to={`${url}/${pageId + 1}`}>Урок {`${pageId + 1}`}</Link>
            )
          )}
        </div>
      </div>
    </div>
)};
