import React from 'react'
import {RootState} from "../../../redux/reducer";
import {connect} from "react-redux";
import { level } from "./Constants";

const SelectLevel = ({ setErrors, lang }) => {

  function handleChange(e) {
    setErrors(parseFloat(e.target.value));
    e.target.blur();
  }

  return (
    <div className="select_box">
      <select
        onChange={handleChange}
        name="errors"
        className="select_input">
        <option value="">{level[lang].select}</option>
        <option value="6">{level[lang].level6}</option>
        <option value="10">{level[lang].level10}</option>
        <option value="13">{level[lang].level13}</option>
      </select>
    </div>
  )
};

const mapStateToProps = (state: RootState) => ({
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps, null)(SelectLevel);