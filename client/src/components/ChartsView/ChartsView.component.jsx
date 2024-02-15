import React, { useState } from "react";
import Charts from "./Charts/Charts.component";
import LineGraph from "./Charts/LineGraph.component";
import { MONTH } from "../../constants/constant";

const ChartsView = (props) => {
  const [view, setView] = useState("Yearly");
  const { expenses } = props;
  const viewCheck = (graph) => view.toUpperCase() === graph.toUpperCase();

  return (
    <div>
      <select
        name="view"
        value={view}
        id="dropdown"
        onChange={(e) => setView(e.target.value)}
      >
        <option id="dropdown-items" value="Yearly">Yearly</option>
        {Object.values(MONTH).map((mon) => (
          <option id="dropdown-items" value={mon}>{mon}</option>
        ))}
      </select>

      <div>
        {Object.values(MONTH).map((mon) => {
           return (viewCheck(mon) && (
            <Charts
              view={view}
              expenses={expenses}
            />
          ));
        })}
        {viewCheck("Yearly") && (
          <LineGraph expenses={expenses}  />
        )}
      </div>
    </div>
  );
};

export default ChartsView;
