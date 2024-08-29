import React from 'react';
import Navbar from '../common/Navbar';
import PageHeader from "../common/PageHeader";
import PageSubheading from "../common/PageSubheading";
import Help from "../common/Help";

// アイコンのインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";

const Log = () => {
    return (
      <div>
        <PageHeader title="きろく" />
        <Help />
        <div>
          <FontAwesomeIcon icon={faFilePen} color={"#FFD4BC"} />
          おふろレベル Lv.17
        </div>
        <div>
          <FontAwesomeIcon icon={faFilePen} color={"#FFD4BC"} />
          おふろポイント 167pt
        </div>
        <PageSubheading title="れんぞくおふろきろく" />
        <div>現在　最長</div>
        <div>4回　17回</div>
        <Navbar currentPage="log" />
      </div>
    );
}

export default Log;
