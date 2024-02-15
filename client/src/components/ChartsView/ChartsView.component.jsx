import React, { useState } from "react"; // Importing React and useState hook
import Charts from "./Charts/Charts.component"; // Importing Charts component
import LineGraph from "./Charts/LineGraph.component"; // Importing LineGraph component
import { MONTH } from "../../constants/constant"; // Importing MONTH constant
import { capFirst } from "../../utils/generateExpense.utils";


const ChartsView = (props) => {
  // State to manage selected view
  const [view, setView] = useState("Yearly");

  // Destructuring props
  const { expenses } = props;

  /**
   * Function to check if the selected view matches the provided graph.
   * @param {string} graph - Graph name to be checked against the selected view.
   * @returns {boolean} - True if the graph matches the selected view, otherwise false.
   */
  const viewCheck = (graph) => view.toUpperCase() === graph.toUpperCase();

  return (
    <div>
      {/* Dropdown to select view */}
      <select
        name="view"
        value={view}
        id="dropdown"
        onChange={(e) => setView(e.target.value)}
      >
        {/* Option for Yearly view */}
        <option id="dropdown-items" value="Yearly">Yearly</option>
        {/* Mapping through MONTH constant to render options for Monthly views */}
        {Object.values(MONTH).map((mon) => (
          <option id="dropdown-items" value={mon}>{capFirst(mon)}</option>
        ))}
      </select>

      <div>
        {/* Rendering Charts component based on selected view */}
        {Object.values(MONTH).map((mon) => {
          // Rendering Charts component if the selected view matches the current month
          // This loop iterates over each month in the MONTH constant to determine whether to render the Charts component.
          // For each month, it checks if the selected view matches the current month.
          // If the view matches the current month, the Charts component is rendered with the corresponding data.
          return (viewCheck(mon) && (
            <Charts
              key={mon}
              view={view}
              expenses={expenses}
            />
          ));
        })}
        {/* Rendering LineGraph component for Yearly view */}
        {viewCheck("Yearly") && (
          <LineGraph key="Yearly" expenses={expenses}  />
        )}
      </div>
    </div>
  );
};

export default ChartsView; // Exporting ChartsView component
